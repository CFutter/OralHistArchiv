
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

export const collections = {
  'pages': pagesCollection,
};
