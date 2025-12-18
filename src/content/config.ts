import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tips = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tips" }),
    schema: z.object({
        // Required fields
        title: z.string(),
        description: z.string(),
        game: z.enum(['poe1', 'poe2', 'both']),
        category: z.enum(['crafting', 'farming', 'atlas', 'currency', 'mechanics', 'league', 'leveling']),
        tags: z.array(z.string()),
        patchVersion: z.string(),
        publishedAt: z.date(),

        // Optional fields
        mayBeOutdated: z.boolean().default(false),
        updatedAt: z.date().optional(),
        videoUrl: z.string().url().optional(),
        source: z.object({
            name: z.string(),
            url: z.string().url(),
        }).optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        timeSensitivity: z.enum(['league-start', 'anytime']).optional(),
        relatedTips: z.array(z.string()).optional(),
        estimatedValue: z.string().optional(),
        prerequisites: z.array(z.string()).optional(),
    }),
});

export const collections = { tips };
