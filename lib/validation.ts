import { z } from "zod"

export const PodcastFormValidation = z.object({
	podcastTitle: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	podcastDescription: z.string().min(2, "Name must be at least 2 characters")
})
