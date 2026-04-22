import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
	loader: glob({
		base: "./src/generated/docs",
		pattern: "**/*.md",
	}),
	schema: z.object({
		description: z.string().optional(),
		order: z.number().default(0),
		title: z.string(),
	}),
});

export const collections = { docs };
