import { defineCollection, z } from 'astro:content';

// Define the schema for the papers collection
const papersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    abstract: z.string(),
    pdf: z.string().url().optional(),
    code: z.string().url().optional(),
    bibtex: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Define the schema for the projects collection
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    status: z.enum(['active', 'completed']),
    startYear: z.number(),
    endYear: z.union([z.number(), z.string()]).optional(),
    team: z.array(z.string()).optional(),
    links: z.record(z.string()).optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

// Define the schema for the news collection
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Define the schema for the people collection
const peopleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    research: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    googleScholar: z.string().url().optional(),
    github: z.string().url().optional(),
    category: z.enum(['pi', 'student', 'alumni']),
    order: z.number().optional(),
    degree: z.string().optional(),
    graduationYear: z.number().optional(),
    currentPosition: z.string().optional(),
  }),
});

// Define the schema for the theses collection
const thesesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.enum(['phd', 'masters', 'bachelors']),
    year: z.number(),
    abstract: z.string(),
    pdf: z.string().url().optional(),
    supervisor: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Define the schema for the courses collection
const coursesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    code: z.string(),
    description: z.string(),
    semester: z.string(),
    instructor: z.string(),
    credits: z.number(),
    syllabus: z.string().url().optional(),
    materials: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Export the collections
export const collections = {
  'papers': papersCollection,
  'projects': projectsCollection,
  'news': newsCollection,
  'people': peopleCollection,
  'theses': thesesCollection,
  'courses': coursesCollection,
}; 