#!/usr/bin/env python3
"""
Export all publications from a Google Scholar profile to a single .bib file.

Usage:
    python export_scholar_bibtex.py --scholar-id AbCdEfGhIjk --out my_pubs.bib
"""

import argparse
import re
from scholarly import scholarly


def slugify(text: str) -> str:
    """Create a simple citation key from title."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    text = re.sub(r"^_+|_+$", "", text)
    return text or "key"


def first_nonempty(*values) -> str:
    """Return the first non-empty string from values (ignoring None / '')."""
    for v in values:
        if v is None:
            continue
        s = str(v).strip()
        if s:
            return s
    return ""


def venue_has_trailing_year(venue: str) -> bool:
    """
    Heuristic: detect venue strings that embed the year at the end, e.g.
    'International Conference on X, 2014' or '..., 293-298, 2010'.
    """
    if not venue:
        return False
    # Look for ', 2014' or ', 1998' etc. at the end (possibly with trailing punctuation/space)
    return bool(re.search(r",\s*(19|20)\d{2}\s*$", venue))


def validate_bib_entry(entry_type: str, fields: dict) -> tuple[bool, list[str]]:
    """
    Basic validation heuristics for a BibTeX entry.

    Returns:
        (is_valid, reasons)
    """
    reasons: list[str] = []

    # Required for almost everything
    if not fields.get("author"):
        reasons.append("missing author")
    if not fields.get("title"):
        reasons.append("missing title")
    if not fields.get("year"):
        reasons.append("missing year")

    # Venue checks for typical scholarly entries
    venue = fields.get("journal") or fields.get("booktitle") or ""
    if entry_type in {"article", "inproceedings"}:
        if not venue:
            reasons.append("missing journal/booktitle for article/inproceedings")
        elif venue_has_trailing_year(venue):
            reasons.append("venue string seems to embed year; please clean up")

    # Publisher placeholder from Google Scholar
    publisher = fields.get("publisher") or ""
    if "PublicationSource.AUTHOR_PUBLICATION_ENTRY" in publisher:
        reasons.append("publisher is placeholder 'PublicationSource.AUTHOR_PUBLICATION_ENTRY'")

    return (len(reasons) == 0), reasons


def make_bibtex(pub_full: dict, idx: int, pub: dict) -> tuple[str, bool, list[str]]:
    """
    Build a BibTeX entry from the 'bib' dict inside a publication.
    This avoids scholarly.bibtex() and the ENTRYTYPE error, while
    aggressively merging fields from multiple locations.

    Returns:
        (bibtex_str, is_valid, reasons)
    """
    bib = pub_full.get("bib", {}) or {}

    # ---- Year ----
    year = first_nonempty(
        bib.get("year"),
        bib.get("pub_year"),
        pub_full.get("year"),
        pub_full.get("pub_year"),
        pub.get("bib", {}).get("pub_year") if pub.get("bib") else None,
    )

    # ---- Core fields from bib / top-level ----
    title = first_nonempty(
        bib.get("title"),
        pub_full.get("title"),
        f"Untitled_{idx}",
    )

    authors = first_nonempty(
        bib.get("author"),
        pub_full.get("author"),
        pub.get("bib", {}).get("author") if pub.get("bib") else None,
    )

    # Google Scholar often stores venue in "venue" instead of "journal"
    journal = first_nonempty(
        bib.get("journal"),
        bib.get("venue"),
        bib.get("citation"),
        pub_full.get("venue"),
    )

    # For conference papers, "booktitle" is often missing but "venue" is set
    raw_booktitle = first_nonempty(
        bib.get("booktitle"),
        bib.get("venue"),
        pub_full.get("venue"),
    )

    volume = first_nonempty(
        bib.get("volume"),
        pub_full.get("volume"),
    )

    number = first_nonempty(
        bib.get("number"),
        bib.get("issue"),
        pub_full.get("number"),
        pub_full.get("issue"),
    )

    pages = first_nonempty(
        bib.get("pages"),
        pub_full.get("pages"),
    )

    publisher = first_nonempty(
        bib.get("publisher"),
        pub_full.get("publisher"),
        pub_full.get("source"),
    )

    doi = first_nonempty(
        bib.get("doi"),
        pub_full.get("doi"),
    )

    url = first_nonempty(
        bib.get("url"),
        pub_full.get("eprint_url"),
        pub_full.get("pub_url"),
    )

    # ---- Entry type ----
    # If scholarly already gives an ENTRYTYPE, prefer it.
    entry_type = bib.get("ENTRYTYPE", "").lower().strip()

    if not entry_type:
        pub_type = (bib.get("pub_type") or "").lower()
        # crude heuristics; adapt as needed
        if "book" in pub_type:
            entry_type = "book"
        elif "thesis" in pub_type:
            entry_type = "phdthesis"
        elif "proc" in pub_type or raw_booktitle:
            entry_type = "inproceedings"
        else:
            entry_type = "article"

    # If we decided it's a conference paper, prioritize booktitle over journal
    if entry_type == "inproceedings":
        booktitle = raw_booktitle
    else:
        booktitle = first_nonempty(
            bib.get("booktitle"),
        )

    # ---- Citation key: First author + year + slug from title ----
    if authors:
        first_author = authors.split(" and ")[0]
        last_name = first_author.split()[-1]
    else:
        last_name = "anon"

    base_key = f"{last_name}{year}" if year else last_name
    key = f"{base_key}_{slugify(title)[:10]}"

    # ---- Collect fields ----
    fields = {
        "author": authors,
        "title": title,
        "journal": journal,
        "booktitle": booktitle,
        "year": year,
        "volume": volume,
        "number": number,
        "pages": pages,
        "publisher": publisher,
        "doi": doi,
        "url": url,
    }

    # ---- Validate ----
    is_valid, reasons = validate_bib_entry(entry_type, fields)

    # Build BibTeX text, skipping empty fields
    lines = [f"@{entry_type}{{{key},"]
    for k, v in fields.items():
        v = str(v).strip()
        if v:
            lines.append(f"  {k} = {{{v}}},")

    # Remove trailing comma from last field if present
    if lines[-1].endswith(","):
        lines[-1] = lines[-1][:-1]

    lines.append("}")
    bibtex_str = "\n".join(lines)

    return bibtex_str, is_valid, reasons


def export_bibtex(scholar_id: str, out_path: str) -> None:
    author = scholarly.search_author_id(scholar_id)
    # Limit fill to publications + bib for speed and completeness
    author = scholarly.fill(author, sections=["publications"])

    pubs = author.get("publications", [])
    if not pubs:
        print("No publications found on this profile.")
        return

    with open(out_path, "w", encoding="utf-8") as f:
        for i, pub in enumerate(pubs, start=1):
            # Ensure bib is fully populated for each publication
            pub_full = scholarly.fill(pub, sections=["bib"])
            title = pub_full.get("bib", {}).get("title", "<no title>")

            try:
                bibtex_str, is_valid, reasons = make_bibtex(pub_full, i, pub)
            except Exception as e:
                print(f"[{i}] Failed to build BibTeX for: {title} ({e})")
                continue

            if is_valid:
                print(f"[{i}] Built BibTeX (valid) for: {title}")
                to_write = bibtex_str
            else:
                reason_str = "; ".join(reasons) if reasons else "unknown reasons"
                print(f"[{i}] Built BibTeX (INVALID) for: {title} -> {reason_str}")

                commented_lines = []
                commented_lines.append(f"% INVALID: {reason_str}")
                for line in bibtex_str.splitlines():
                    commented_lines.append("% " + line)
                to_write = "\n".join(commented_lines)

            f.write(to_write)
            f.write("\n\n")
            status = "Exported" if is_valid else "Exported (commented out)"
            print(f"[{i}] {status}: {title}")

    print(f"\nDone. BibTeX written to: {out_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Export Google Scholar profile publications to BibTeX."
    )
    parser.add_argument(
        "--scholar-id",
        required=True,
        help="Google Scholar user ID (value after 'user=' in the profile URL)",
    )
    parser.add_argument(
        "--out",
        default="scholar_pubs.bib",
        help="Output .bib file (default: scholar_pubs.bib)",
    )
    args = parser.parse_args()
    export_bibtex(args.scholar_id, args.out)


if __name__ == "__main__":
    main()
