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


def make_bibtex(pub_full: dict, idx: int, pub: dict) -> str:
    """
    Build a BibTeX entry from the 'bib' dict inside a publication.
    This avoids scholarly.bibtex() and the ENTRYTYPE error.
    """
    bib = pub_full.get("bib", {})
    year = (
        bib.get("year")
        or bib.get("pub_year")
        or pub_full.get("year")
        or pub_full.get("pub_year")
        or pub_full.get("bib", {}).get("pub_year")
        or pub.get("bib", {}).get("pub_year")
    )
    
    title = bib.get("title", f"Untitled_{idx}")
    authors = bib.get("author", "")
    journal = bib.get("journal", "") or bib.get("booktitle", "")
    volume = bib.get("volume", "")
    number = bib.get("number", "")
    pages = bib.get("pages", "")
    publisher = bib.get("publisher", "")
    doi = bib.get("doi", "")
    url = bib.get("url", "") or pub_full.get("eprint_url", "")

    # Heuristic: guess entry type
    if "book" in bib.get("pub_type", "").lower():
        entry_type = "book"
    elif "thesis" in bib.get("pub_type", "").lower():
        entry_type = "phdthesis"
    elif "proc" in bib.get("pub_type", "").lower() or bib.get("booktitle"):
        entry_type = "inproceedings"
    else:
        entry_type = "article"

    # Citation key: First author + year + slug from title
    if authors:
        first_author = authors.split(" and ")[0]
        last_name = first_author.split()[-1]
    else:
        last_name = "anon"

    base_key = f"{last_name}{year}" if year else last_name
    key = base_key + "_" + slugify(title)[:10]

    fields = {
        "author": authors,
        "title": title,
        "journal": journal,
        "booktitle": bib.get("booktitle", ""),
        "year": year,
        "volume": volume,
        "number": number,
        "pages": pages,
        "publisher": publisher,
        "doi": doi,
        "url": url,
    }

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
    return "\n".join(lines)


def export_bibtex(scholar_id: str, out_path: str) -> None:
    author = scholarly.search_author_id(scholar_id)
    author = scholarly.fill(author, sections=["publications"])

    pubs = author.get("publications", [])
    if not pubs:
        print("No publications found on this profile.")
        return

    with open(out_path, "w", encoding="utf-8") as f:
        for i, pub in enumerate(pubs, start=1):
            pub_full = scholarly.fill(pub)
            title = pub_full.get("bib", {}).get("title", "<no title>")

            try:
                bibtex_str = make_bibtex(pub_full, i, pub)
                print(f"[{i}] Built BibTeX for: {title}")
                # print(bibtex_str)
            except Exception as e:
                print(f"[{i}] Failed to build BibTeX for: {title} ({e})")
                continue

            f.write(bibtex_str)
            f.write("\n\n")
            print(f"[{i}] Exported: {title}")

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
