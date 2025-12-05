# BOUN TABILAB Website

This is the official website for TABILAB, the Natural Language Processing Research Lab at Boğaziçi University's Computer Engineering Department. The website is built using [Astro](https://astro.build/), a modern static site generator.

## Features

- **People**: Information about Principal Investigators, current students, and alumni
- **Papers**: Publications with citations, abstracts, and links to papers and code
- **Projects**: Ongoing and completed research projects
- **Theses**: PhD, Master's, and Bachelor's theses from lab members
- **Courses**: Courses taught by lab members
- **News**: Latest updates and announcements from the lab
- **Contact**: Contact information and a contact form

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX support for content

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/boun-tabi/tabilab-website.git
   cd tabilab-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To build the website for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment

### Automatic Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions. When changes are pushed to the `main` branch, the GitHub Actions workflow will build the site and deploy it to the `gh-pages` branch.

To manually trigger a deployment, you can go to the Actions tab in the GitHub repository and run the "Deploy to GitHub Pages" workflow.

### Manual Deployment

You can also deploy the website manually using the following command:

```bash
npm run deploy
```

This will build the site and push the contents of the `dist` directory to the `gh-pages` branch.

### Setting up GitHub Pages

1. In your GitHub repository, go to Settings > Pages
2. Set the source to "Deploy from a branch"
3. Select the `gh-pages` branch and the `/ (root)` folder
4. Click "Save"
5. The site will be available at `https://boun-tabi-lifelu.github.io/boun-tabi-dev/`

## Project Structure

```
/
├── .github/            # GitHub Actions workflows
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Content collections (people, papers, projects, etc.)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components and routes
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
└── package.json        # Project dependencies
```

## Content Generation from BibTeX

The website content for publications and people can be automatically generated from BibTeX (`.bib`) files.

### BibTeX Files Location

Place your `.bib` files in the `data/` directory. The generator will recursively scan all subdirectories for `.bib` files.

Example structure:
```
data/
├── publications.bib
├── 2023-papers.bib
└── archive/
    └── older-publications.bib
```

### Running the Content Generator

To generate or update Markdown content from BibTeX files:

```bash
npm run generate:content
```

This script will:

1. Scan all `.bib` files in the `data/` directory
2. Parse BibTeX entries for publications (articles, inproceedings, books, theses, etc.)
3. Generate/update Markdown files in `src/content/papers/`
4. Preserve the original BibTeX format in the frontmatter

### Generated Content Format

Each BibTeX entry is converted to a Markdown file with frontmatter. For example:

**Input** (`data/publications.bib`):
```bibtex
@article{example2024,
  title={Example Paper Title},
  author={Doe, John and Smith, Jane},
  journal={Journal Name},
  year={2024},
  abstract={This is an example abstract.},
  keywords={nlp, turkish, machine-learning}
}
```

**Output** (`src/content/papers/example2024.md`):
```markdown
---
title: "Example Paper Title"
authors: "John Doe, Jane Smith"
venue: "Journal Name"
year: 2024
abstract: "This is an example abstract."
tags: ["nlp", "turkish", "machine-learning"]
featured: false
bibtex: |
  @article{example2024,
    title={Example Paper Title},
    author={Doe, John and Smith, Jane},
    journal={Journal Name},
    year={2024},
    abstract={This is an example abstract.},
    keywords={nlp, turkish, machine-learning}
  }
---
```

### Supported BibTeX Entry Types

The generator supports standard publication types:
- `@article` - Journal articles
- `@inproceedings` / `@conference` - Conference papers
- `@book` / `@inbook` / `@incollection` - Books and book chapters
- `@phdthesis` / `@mastersthesis` - Theses
- `@techreport` - Technical reports
- `@unpublished` - Unpublished works

### Special BibTeX Fields

- **keywords**: Comma or semicolon-separated tags (converted to `tags` array in frontmatter)
- **featured**: Set to `{true}` to mark a publication as featured
- **abstract**: Publication abstract
- **author**: Author names (LaTeX special characters are automatically converted)

### Notes

- The generator is idempotent - running it multiple times produces the same output
- Existing manually created files are overwritten if they match a BibTeX entry citation key
- LaTeX special characters (e.g., `\"u`, `\c{c}`, `\i`) are automatically converted to Unicode
- File names are based on the BibTeX citation key (e.g., `doe2024example.md`)

### Future Enhancements

The current implementation focuses on generating publication content from BibTeX files. Future versions may include:

- **People content generation**: Support for generating `src/content/people/*.md` from BibTeX entries with custom fields for team member information
- **Custom field mapping**: More flexible field mapping configuration
- **Incremental updates**: Smart detection to only regenerate changed entries

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Boğaziçi University Computer Engineering Department
- TABILAB Research Team



