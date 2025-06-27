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



