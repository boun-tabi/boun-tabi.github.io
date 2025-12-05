# Scripts

This directory contains utility scripts for managing the TABILAB website.

## generate-content-from-bib.mjs

Automatically generates Astro content pages for publications from BibTeX files.

### Usage

```bash
npm run generate:content
```

### What it does

1. Recursively scans the `data/` directory for `.bib` files
2. Parses BibTeX entries using the `bibtex-parse-js` library
3. Generates/updates Markdown files in `src/content/papers/` with proper frontmatter
4. Converts LaTeX special characters to Unicode (especially Turkish characters)
5. Preserves the original BibTeX format in the frontmatter

### Implementation Details

- **BibTeX Parsing**: Uses `bibtex-parse-js` library's `toJSON()` method
- **LaTeX Character Conversion**: Handles Turkish special characters (ü, ö, ş, ç, ı, etc.)
- **YAML Escaping**: Properly escapes strings for YAML frontmatter (quotes, newlines, etc.)
- **ReDoS Protection**: Escapes regex special characters when parsing BibTeX content
- **Idempotency**: Can be run multiple times without side effects

### Supported BibTeX Entry Types

- `@article` - Journal articles
- `@inproceedings` / `@conference` - Conference papers  
- `@book` / `@inbook` / `@incollection` - Books and book chapters
- `@phdthesis` / `@mastersthesis` - Theses
- `@techreport` - Technical reports
- `@unpublished` - Unpublished works

### Field Mappings

| BibTeX Field | Markdown Frontmatter | Notes |
|-------------|---------------------|-------|
| `title` | `title` | Required |
| `author` | `authors` | Formatted as "First Last, First2 Last2" |
| `year` | `year` | Defaults to 0 if missing |
| `journal` | `venue` | Primary source for venue |
| `booktitle` | `venue` | Fallback for venue |
| `publisher` | `venue` | Second fallback for venue |
| `abstract` | `abstract` | Optional |
| `keywords` | `tags` | Split by comma/semicolon |
| `featured` | `featured` | Boolean, defaults to false |
| (entire entry) | `bibtex` | Raw BibTeX preserved |

### Example

**Input** (`data/publications.bib`):
```bibtex
@article{example2024,
  title={Example Paper},
  author={Doe, John and Smith, Jane},
  journal={Journal Name},
  year={2024}
}
```

**Output** (`src/content/papers/example2024.md`):
```markdown
---
title: "Example Paper"
authors: "John Doe, Jane Smith"
venue: "Journal Name"
year: 2024
abstract: ""
featured: false
bibtex: |
  @article{example2024,
    title={Example Paper},
    author={Doe, John and Smith, Jane},
    journal={Journal Name},
    year={2024}
  }
---
```

### Error Handling

- Warns if `data/` directory doesn't exist
- Catches and reports BibTeX parsing errors
- Continues processing other files if one fails
- Creates output directories if they don't exist

### Future Enhancements

- Support for people content generation from BibTeX
- Incremental updates (only regenerate changed entries)
- Validation of generated Markdown against Astro schema
- Support for additional custom BibTeX fields
