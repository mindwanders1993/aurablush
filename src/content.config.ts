import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const treatments = defineCollection({
  loader: glob({ base: './src/content/treatments', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    price: z.string(),
    duration: z.string(),
    image: z.string().optional(),
    description: z.string(),
    benefits: z.array(z.string()).default([]),
    preCare: z.array(z.string()).default([]),
    afterCare: z.array(z.string()).default([])
  })
});

const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    service: z.string(),
    rating: z.number().min(1).max(5),
    date: z.coerce.date(),
    text: z.string(),
    avatar: z.string().optional()
  })
});

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    specialty: z.string().optional(),
    bio: z.string(),
    image: z.string().optional()
  })
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional()
  })
});

export const collections = {
  treatments,
  reviews,
  team,
  faqs
};
