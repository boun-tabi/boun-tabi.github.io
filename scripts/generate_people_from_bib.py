#!/usr/bin/env python3
"""
Generate people JSON and Astro markdown files from BibTeX entries.

This script:
1. Parses all data/bib/*.bib files
2. Extracts unique people (authors) from publications
3. Infers advisor for each person based on co-authorship with PIs
4. Exports:
   - data/people.generated.json (machine-readable JSON)
   - src/content/people/*.md (Astro content files)
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Set, Tuple

try:
    import bibtexparser
except ImportError:
    print("Error: bibtexparser is not installed. Install it with: pip install bibtexparser")
    sys.exit(1)


def slugify(text: str) -> str:
    """
    Convert text to a slug suitable for filenames.
    Normalizes Turkish characters to ASCII equivalents.
    
    Args:
        text: The text to slugify
        
    Returns:
        Slugified text (lowercase, hyphens, ASCII only, no punctuation)
    """
    # Turkish character replacements
    replacements = {
        'ı': 'i', 'İ': 'i', 'ğ': 'g', 'Ğ': 'g',
        'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
        'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c',
        'â': 'a', 'Â': 'a', 'î': 'i', 'Î': 'i',
        'û': 'u', 'Û': 'u', 'é': 'e', 'É': 'e',
        'è': 'e', 'È': 'e', 'ê': 'e', 'Ê': 'e',
        'á': 'a', 'Á': 'a', 'à': 'a', 'À': 'a',
        'ó': 'o', 'Ó': 'o', 'ò': 'o', 'Ò': 'o',
        'ú': 'u', 'Ú': 'u', 'ù': 'u', 'Ù': 'u',
    }
    
    # Apply replacements
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Convert to lowercase
    text = text.lower()
    # Replace spaces with hyphens
    text = text.replace(' ', '-')
    # Remove all non-ASCII, non-alphanumeric, non-hyphen characters
    text = re.sub(r'[^a-z0-9-]', '', text)
    # Remove multiple hyphens
    text = re.sub(r'-+', '-', text)
    # Strip leading/trailing hyphens
    text = text.strip('-')
    return text


def normalize_author_name(author: str) -> str:
    """
    Normalize author name from BibTeX format.
    Handles various formats like "FirstName LastName", "LastName, FirstName", initials, etc.
    
    Args:
        author: Raw author string from BibTeX
        
    Returns:
        Normalized full name
    """
    # Remove extra whitespace
    author = ' '.join(author.split())
    
    # Handle "LastName, FirstName" format
    if ',' in author:
        parts = author.split(',', 1)
        if len(parts) == 2:
            last_name = parts[0].strip()
            first_name = parts[1].strip()
            author = f"{first_name} {last_name}"
    
    # Expand common initials patterns
    # E.g., "A. Özgür" -> keep as is, we'll use this format
    # The name as it appears in BibTeX is preserved
    
    return author.strip()


def parse_authors(author_string: str) -> List[str]:
    """
    Parse author field from BibTeX entry.
    Splits by 'and' keyword and normalizes each author.
    
    Args:
        author_string: The raw author field from BibTeX
        
    Returns:
        List of normalized author names
    """
    if not author_string:
        return []
    
    # Split by 'and' (case-insensitive, with word boundaries)
    authors = re.split(r'\s+and\s+', author_string, flags=re.IGNORECASE)
    
    # Normalize each author
    normalized_authors = []
    for author in authors:
        normalized = normalize_author_name(author)
        if normalized:
            normalized_authors.append(normalized)
    
    return normalized_authors


def load_pi_mapping(google_scholar_path: str) -> Dict[str, str]:
    """
    Load PI mapping from google_scholar.json file.
    
    Args:
        google_scholar_path: Path to google_scholar.json
        
    Returns:
        Dictionary mapping PI slug to full name
    """
    if not os.path.exists(google_scholar_path):
        print(f"Warning: {google_scholar_path} not found, using filename-based PI detection")
        return {}
    
    with open(google_scholar_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Convert slugs to readable names (capitalize and replace hyphens)
    pi_names = {}
    for slug in data.keys():
        # We'll match PIs by their slug, but need to find their actual names from bibtex
        pi_names[slug] = None
    
    return pi_names


def find_bib_files(bib_dir: str) -> List[Tuple[str, str]]:
    """
    Find all .bib files in the specified directory.
    
    Args:
        bib_dir: Directory containing .bib files
        
    Returns:
        List of tuples (filepath, pi_slug)
    """
    bib_files = []
    bib_path = Path(bib_dir)
    
    if not bib_path.exists():
        print(f"Error: Directory {bib_dir} does not exist")
        return []
    
    for bib_file in bib_path.glob('*.bib'):
        # Extract PI slug from filename (e.g., "arzucan-ozgur.bib" -> "arzucan-ozgur")
        pi_slug = bib_file.stem
        bib_files.append((str(bib_file), pi_slug))
    
    return bib_files


def parse_bibtex_files(bib_files: List[Tuple[str, str]]) -> Tuple[Dict[str, List[str]], Set[str]]:
    """
    Parse all BibTeX files and extract authors and their co-authors.
    
    Args:
        bib_files: List of tuples (filepath, pi_slug)
        
    Returns:
        Tuple of (author_papers dict, pi_slugs set)
    """
    author_papers = defaultdict(list)  # author_slug -> [list of paper ids with co-authors]
    pi_slugs = set()
    all_authors = {}  # slug -> full name
    
    for filepath, pi_slug in bib_files:
        pi_slugs.add(pi_slug)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                bib_database = bibtexparser.load(f)
            
            for entry in bib_database.entries:
                if 'author' not in entry:
                    continue
                
                authors = parse_authors(entry['author'])
                author_slugs = []
                
                # Process each author
                for author in authors:
                    author_slug = slugify(author)
                    author_slugs.append(author_slug)
                    
                    # Store the full name - prefer names with non-ASCII characters (more complete)
                    if author_slug not in all_authors:
                        all_authors[author_slug] = author
                    else:
                        # If current name has non-ASCII chars and stored doesn't, update it
                        current_has_special = any(ord(c) > 127 for c in author)
                        stored_has_special = any(ord(c) > 127 for c in all_authors[author_slug])
                        if current_has_special and not stored_has_special:
                            all_authors[author_slug] = author
                
                # Record co-authorship for each author
                for author_slug in author_slugs:
                    # Store all co-authors for this paper
                    author_papers[author_slug].append(author_slugs)
        
        except Exception as e:
            print(f"Error parsing {filepath}: {e}")
            continue
    
    return author_papers, pi_slugs, all_authors


def infer_advisors(author_papers: Dict[str, List[str]], pi_slugs: Set[str]) -> Dict[str, str]:
    """
    Infer advisor for each non-PI author based on co-authorship frequency.
    
    Args:
        author_papers: Dictionary mapping author slug to list of papers (with co-authors)
        pi_slugs: Set of PI slugs
        
    Returns:
        Dictionary mapping author slug to advisor slug (or empty string)
    """
    advisors = {}
    
    for author_slug, papers in author_papers.items():
        if author_slug in pi_slugs:
            # PIs don't have advisors
            advisors[author_slug] = ""
            continue
        
        # Count co-occurrences with each PI
        pi_counts = defaultdict(int)
        
        for paper_authors in papers:
            for co_author in paper_authors:
                if co_author in pi_slugs and co_author != author_slug:
                    pi_counts[co_author] += 1
        
        # Find PI with highest co-authorship count
        if pi_counts:
            advisor_slug = max(pi_counts.items(), key=lambda x: x[1])[0]
            advisors[author_slug] = advisor_slug
        else:
            advisors[author_slug] = ""
    
    return advisors


def build_people_map(
    all_authors: Dict[str, str],
    advisors: Dict[str, str],
    pi_slugs: Set[str]
) -> Dict[str, Dict]:
    """
    Build the complete people map with all metadata.
    
    Args:
        all_authors: Dictionary mapping slug to full name
        advisors: Dictionary mapping author slug to advisor slug
        pi_slugs: Set of PI slugs
        
    Returns:
        Complete people map
    """
    people = {}
    
    for author_slug, full_name in all_authors.items():
        advisor_slug = advisors.get(author_slug, "")
        advisor_name = all_authors.get(advisor_slug, "") if advisor_slug else ""
        
        # Determine category
        if author_slug in pi_slugs:
            category = "pi"
        else:
            category = "student"  # Default for non-PIs
        
        people[author_slug] = {
            "name": full_name,
            "advisor": advisor_name,
            "category": category
        }
    
    return people


def export_json(people: Dict[str, Dict], output_path: str) -> None:
    """
    Export people map to JSON file.
    
    Args:
        people: People map dictionary
        output_path: Path to output JSON file
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(people, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Generated {output_path} with {len(people)} people")


def export_markdown_files(people: Dict[str, Dict], output_dir: str) -> None:
    """
    Export Astro markdown files for each person.
    Only creates files that don't already exist.
    
    Args:
        people: People map dictionary
        output_dir: Directory to output markdown files
    """
    os.makedirs(output_dir, exist_ok=True)
    
    created_count = 0
    skipped_count = 0
    
    for slug, info in people.items():
        md_path = os.path.join(output_dir, f"{slug}.md")
        
        # Skip if file already exists
        if os.path.exists(md_path):
            skipped_count += 1
            continue
        
        # Build frontmatter
        frontmatter = [
            "---",
            f'name: "{info["name"]}"',
            'title: ""',
            'photo: ""',
            'bio: ""',
            'email: ""',
            f'category: "{info["category"]}"',
            'order: ',
            f'advisor: "{info["advisor"]}"',
            'degree: ""',
            "---",
            "",  # Empty body
        ]
        
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(frontmatter))
        
        created_count += 1
    
    print(f"✓ Created {created_count} new markdown files in {output_dir}")
    if skipped_count > 0:
        print(f"  (Skipped {skipped_count} existing files)")


def main():
    parser = argparse.ArgumentParser(
        description="Generate people JSON and Astro markdown files from BibTeX entries"
    )
    parser.add_argument(
        '--bib-dir',
        default='data/bib',
        help='Directory containing .bib files (default: data/bib)'
    )
    parser.add_argument(
        '--google-scholar-json',
        default='data/google_scholar.json',
        help='Path to google_scholar.json (default: data/google_scholar.json)'
    )
    parser.add_argument(
        '--json-output',
        default='data/people.generated.json',
        help='Output path for JSON file (default: data/people.generated.json)'
    )
    parser.add_argument(
        '--md-output-dir',
        default='src/content/people',
        help='Output directory for markdown files (default: src/content/people)'
    )
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("Generating people from BibTeX files")
    print("=" * 60)
    
    # Find all .bib files
    print(f"\n1. Finding BibTeX files in {args.bib_dir}...")
    bib_files = find_bib_files(args.bib_dir)
    if not bib_files:
        print("Error: No .bib files found")
        sys.exit(1)
    print(f"   Found {len(bib_files)} BibTeX files")
    
    # Parse BibTeX files
    print("\n2. Parsing BibTeX files and extracting authors...")
    author_papers, pi_slugs, all_authors = parse_bibtex_files(bib_files)
    print(f"   Extracted {len(all_authors)} unique authors")
    print(f"   Identified {len(pi_slugs)} PIs: {', '.join(sorted(pi_slugs))}")
    
    # Infer advisors
    print("\n3. Inferring advisors based on co-authorship...")
    advisors = infer_advisors(author_papers, pi_slugs)
    
    # Build people map
    print("\n4. Building people map...")
    people = build_people_map(all_authors, advisors, pi_slugs)
    
    # Export JSON
    print(f"\n5. Exporting JSON to {args.json_output}...")
    export_json(people, args.json_output)
    
    # Export markdown files
    print(f"\n6. Exporting markdown files to {args.md_output_dir}...")
    export_markdown_files(people, args.md_output_dir)
    
    print("\n" + "=" * 60)
    print("✓ Successfully generated people data")
    print("=" * 60)


if __name__ == '__main__':
    main()
