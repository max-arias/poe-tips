import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        tips: defineCollection({
            type: 'page',
            source: 'tips/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                tags: z.array(z.string()),
                leagues: z.array(z.string()),
                author: z.string(),
                patch_created: z.string(),
                last_verified_patch: z.string(),
                is_broken: z.boolean(),
                status: z.string().optional()
            })
        }),
        leagues: defineCollection({
            type: 'data',
            source: 'leagues.json',
            schema: z.array(z.object({
                name: z.string(),
                slug: z.string(),
                version: z.string(),
                is_active: z.boolean(),
                start_date: z.string(),
                end_date: z.string().nullable().optional()
            }))
        }),
        abbreviations: defineCollection({
            type: 'data',
            source: 'abbreviations.json',
            schema: z.array(z.object({
                acronym: z.string(),
                definition: z.string(),
                category: z.string().optional()
            }))
        }),
        tools: defineCollection({
            type: 'data',
            source: 'tools.json',
            schema: z.array(z.object({
                category: z.string(),
                section: z.string(),
                name: z.string(),
                icon: z.string().optional(),
                tooltip: z.string().optional(),
                url: z.string(),
                id: z.string(),
                style: z.string().optional()
            }))
        })
    }
})
