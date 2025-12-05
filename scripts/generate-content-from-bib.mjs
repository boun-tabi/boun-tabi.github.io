#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bibtexParse from 'bibtex-parse-js';

const { toJSON } = bibtexParse;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
const DATA_DIR = path.join(rootDir, 'data', 'bib');
const PAPERS_DIR = path.join(rootDir, 'src', 'content', 'papers');

/**
 * Recursively find all .bib files in a directory
 */
function findBibFiles(dir) {
  const bibFiles = [];
  
  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory ${dir} does not exist`);
    return bibFiles;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      bibFiles.push(...findBibFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.bib')) {
      bibFiles.push(fullPath);
    }
  }
  
  return bibFiles;
}

/**
 * Slugify a string for use as a filename
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Parse author names from BibTeX format to readable format
 */
function formatAuthors(authorString) {
  if (!authorString) return '';
  
  // Split by 'and' keyword
  const authors = authorString.split(/\s+and\s+/i);
  
  return authors.map(author => {
    // Remove extra whitespace
    author = author.trim();
    
    // Handle LaTeX special characters
    // We need to be careful to preserve case, so handle uppercase and lowercase separately
    
    // Turkish uppercase
    author = author.replace(/\{\\"\{U\}\}/g, 'Ü');
    author = author.replace(/\\"\{U\}/g, 'Ü');
    author = author.replace(/\\"U/g, 'Ü');
    
    author = author.replace(/\{\\"\{O\}\}/g, 'Ö');
    author = author.replace(/\\"\{O\}/g, 'Ö');
    author = author.replace(/\\"O/g, 'Ö');
    
    author = author.replace(/\{\{\\c\{S\}\}\}/g, 'Ş');
    author = author.replace(/\{\\c\{S\}\}/g, 'Ş');
    author = author.replace(/\\c\{S\}/g, 'Ş');
    
    author = author.replace(/\{\\c\{C\}\}/g, 'Ç');
    author = author.replace(/\\c\{C\}/g, 'Ç');
    
    // Turkish lowercase
    author = author.replace(/\{\\"\{u\}\}/g, 'ü');
    author = author.replace(/\\"\{u\}/g, 'ü');
    author = author.replace(/\\"u/g, 'ü');
    
    author = author.replace(/\{\\"\{o\}\}/g, 'ö');
    author = author.replace(/\\"\{o\}/g, 'ö');
    author = author.replace(/\\"o/g, 'ö');
    
    author = author.replace(/\{\{\\c\{s\}\}\}/g, 'ş');
    author = author.replace(/\{\\c\{s\}\}/g, 'ş');
    author = author.replace(/\\c\{s\}/g, 'ş');
    
    author = author.replace(/\{\\c\{c\}\}/g, 'ç');
    author = author.replace(/\\c\{c\}/g, 'ç');
    
    // Turkish dotless i and capital İ
    author = author.replace(/\{\\i\}/g, 'ı');
    author = author.replace(/\\i(?=\s|$|,)/g, 'ı');
    
    // Remove remaining braces
    author = author.replace(/\{/g, '');
    author = author.replace(/\}/g, '');
    
    // Handle "Last, First" format
    if (author.includes(',')) {
      const parts = author.split(',').map(p => p.trim());
      if (parts.length >= 2 && parts[1]) {
        return `${parts[1]} ${parts[0]}`;
      }
    }
    
    return author;
  }).join(', ');
}

/**
 * Extract and format tags from keywords field
 */
function extractTags(keywords) {
  if (!keywords) return [];
  
  return keywords
    .split(/[,;]\s*/)
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get the original BibTeX entry as a string
 */
function formatBibtex(entry, originalContent) {
  // Try to extract the original entry from the file content
  const escapedType = escapeRegex(entry.entryType);
  const escapedKey = escapeRegex(entry.citationKey);
  
  // Match the entry up to the next @ or end of string
  // This handles most common cases while avoiding issues with @ in field values
  const entryRegex = new RegExp(`@${escapedType}\\{${escapedKey}[^]*?(?=\\n@|$)`, 'i');
  const match = originalContent.match(entryRegex);
  
  if (match) {
    // Clean up and format the entry
    let bibtexEntry = match[0].trim();
    // Ensure it ends with a closing brace
    if (!bibtexEntry.endsWith('}')) {
      bibtexEntry += '\n}';
    }
    return bibtexEntry;
  }
  
  // Fallback: reconstruct the entry
  let bibtex = `@${entry.entryType}{${entry.citationKey}`;
  const tags = entry.entryTags || {};
  
  for (const [key, value] of Object.entries(tags)) {
    bibtex += `,\n  ${key}={${value}}`;
  }
  
  bibtex += '\n}';
  return bibtex;
}

/**
 * Generate frontmatter for a paper
 */
function generatePaperFrontmatter(entry, originalContent) {
  const tags = entry.entryTags || {};
  
  const frontmatter = {
    title: tags.title || '',
    authors: formatAuthors(tags.author || ''),
    year: parseInt(tags.year) || 0,
    venue: tags.journal || tags.booktitle || tags.publisher || '',
    abstract: tags.abstract || '',
    featured: tags.featured === 'true' || tags.featured === '{true}' || false,
    tags: extractTags(tags.keywords || ''),
    bibtex: formatBibtex(entry, originalContent)
  };
  
  return frontmatter;
}

/**
 * Escape a string for use in YAML
 */
function escapeYamlString(str) {
  if (!str) return '';
  
  // Escape backslashes first
  str = str.replace(/\\/g, '\\\\');
  // Escape double quotes
  str = str.replace(/"/g, '\\"');
  // Escape newlines
  str = str.replace(/\n/g, '\\n');
  // Escape carriage returns
  str = str.replace(/\r/g, '\\r');
  // Escape tabs
  str = str.replace(/\t/g, '\\t');
  
  return str;
}

/**
 * Write frontmatter and content to a Markdown file
 */
function writePaperMarkdown(filePath, frontmatter) {
  let content = '---\n';
  
  // Write string fields with quotes
  content += `title: "${escapeYamlString(frontmatter.title)}"\n`;
  content += `authors: "${escapeYamlString(frontmatter.authors)}"\n`;
  content += `venue: "${escapeYamlString(frontmatter.venue)}"\n`;
  content += `year: ${frontmatter.year}\n`;
  content += `abstract: "${escapeYamlString(frontmatter.abstract)}"\n`;
  
  // Write tags array
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    content += `tags: [${frontmatter.tags.map(t => `"${escapeYamlString(t)}"`).join(', ')}]\n`;
  }
  
  // Write featured boolean
  content += `featured: ${frontmatter.featured}\n`;
  
  // Write bibtex with pipe notation
  content += `bibtex: |\n`;
  const bibtexLines = frontmatter.bibtex.split('\n');
  bibtexLines.forEach(line => {
    content += `  ${line}\n`;
  });
  
  content += '---\n';
  
  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  
  // Write file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated: ${path.relative(rootDir, filePath)}`);
}

/**
 * Process a single BibTeX file for papers
 */
function processBibFileForPapers(bibFilePath) {
  console.log(`\nProcessing: ${path.relative(rootDir, bibFilePath)}`);
  
  const content = fs.readFileSync(bibFilePath, 'utf8');
  let entries;
  
  try {
    entries = toJSON(content);
  } catch (error) {
    console.error(`Error parsing ${bibFilePath}:`, error.message);
    return;
  }
  
  if (!entries || entries.length === 0) {
    console.log('  No entries found');
    return;
  }
  
  console.log(`  Found ${entries.length} entries`);
  
  // Publication entry types
  const publicationTypes = [
    'article', 'inproceedings', 'incollection', 'inbook', 
    'conference', 'book', 'phdthesis', 'mastersthesis',
    'techreport', 'proceedings', 'unpublished'
  ];
  
  for (const entry of entries) {
    const entryType = entry.entryType.toLowerCase();
    
    // Check if this is a publication entry
    if (publicationTypes.includes(entryType)) {
      const citationKey = entry.citationKey;
      const filename = `${slugify(citationKey)}.md`;
      const filePath = path.join(PAPERS_DIR, filename);
      
      const frontmatter = generatePaperFrontmatter(entry, content);
      writePaperMarkdown(filePath, frontmatter);
    }
  }
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('BibTeX to Markdown Content Generator');
  console.log('='.repeat(60));
  
  // Find all .bib files
  console.log(`\nScanning for .bib files in: ${DATA_DIR}`);
  const bibFiles = findBibFiles(DATA_DIR);
  
  if (bibFiles.length === 0) {
    console.log('\nNo .bib files found!');
    console.log(`Please add .bib files to the ${DATA_DIR} directory.`);
    return;
  }
  
  console.log(`Found ${bibFiles.length} .bib file(s):`);
  bibFiles.forEach(f => console.log(`  - ${path.relative(rootDir, f)}`));
  
  // Process each .bib file for papers
  console.log('\n' + '-'.repeat(60));
  console.log('Generating paper content...');
  console.log('-'.repeat(60));
  
  for (const bibFile of bibFiles) {
    processBibFileForPapers(bibFile);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✓ Content generation complete!');
  console.log('='.repeat(60));
  console.log(`\nGenerated files are in:`);
  console.log(`  - ${path.relative(rootDir, PAPERS_DIR)}`);
  console.log('');
}

// Run the script
main();
