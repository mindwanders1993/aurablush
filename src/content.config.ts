import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_IDS } from './data/categories';

/**
 * The menu now spans permanent makeup, facials, pigment protocols, laser and a
 * minor procedure. A price-and-duration card is no longer enough to set
 * expectations, so every treatment also declares how many sessions it takes,
 * what the downtime is, how long the result holds, who it suits — and, where it
 * matters clinically, who it does not.
 */
const treatments = defineCollection({
  loader: glob({ base: './src/content/treatments', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORY_IDS),
    /** Headline price, kept short enough to sit on a card: "₹3,500", "From ₹1,200". */
    price: z.string(),
    /** Course pricing and per-area caveats, shown on the treatment page only. */
    priceNote: z.string().optional(),
    duration: z.string(),
    image: z.string().optional(),
    description: z.string(),

    /** Position within its category on /treatments. Lower sorts first. */
    order: z.number().default(50),
    /** Surfaced in the homepage grid. */
    featured: z.boolean().default(false),

    /** Course shape, e.g. "3–6 sessions, 4–6 weeks apart". */
    sessions: z.string(),
    /** Honest recovery window, e.g. "24–72 hrs of redness". */
    downtime: z.string(),
    /** When results show and how long they hold. */
    results: z.string(),

    /** Concerns this treatment actually addresses. */
    bestFor: z.array(z.string()).default([]),
    /** Contraindications, stated plainly. Empty for the low-risk facials. */
    notFor: z.array(z.string()).default([]),

    /**
     * Requires medical screening before we will book it. Renders the clinical
     * notice on the treatment page and a marker on its card.
     */
    medical: z.boolean().default(false),
    /** The screening requirement itself, shown in that notice. */
    medicalNote: z.string().optional(),

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

/**
 * `category` is either a treatment-category id (so the FAQ can be grouped
 * alongside its service family) or 'general' for studio-wide questions.
 */
const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum([...CATEGORY_IDS, 'general']).default('general'),
    order: z.number().default(50)
  })
});

export const collections = {
  treatments,
  reviews,
  team,
  faqs
};
