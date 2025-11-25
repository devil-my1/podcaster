import { mutation, query } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const getUrl = mutation({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, { storageId }) => {
		return await ctx.storage.getUrl(storageId)
	}
})

export const createPodcast = mutation({
	args: {
		audioDuration: v.number(),
		audioStorageId: v.id("_storage"),
		imageStorageId: v.id("_storage"),
		audioUrl: v.string(),
		imageUrl: v.string(),
		views: v.number(),
		voiceType: v.string(),
		voicePrompt: v.string(),
		imagePrompt: v.string(),
		podcastTitle: v.string(),
		podcastDescription: v.string()
	},
	handler: async (ctx, args) => {
		const authUser = await ctx.auth.getUserIdentity()
		if (!authUser) {
			throw new ConvexError("User not authenticated")
		}
		const user = await ctx.db
			.query("users")
			.filter(q => q.eq(q.field("email"), authUser.email))
			.first()

		if (!user) {
			throw new ConvexError("User not found")
		}

		return await ctx.db.insert("podcasts", {
			...args,
			user: user._id,
			author: user.name,
			authorId: user.clerkId,
			authorImageUrl: user.imageUrl
		})
	}
})

export const getPodcasts = query({
	handler: async ctx => ctx.db.query("podcasts").collect()
})

export const getPodcastById = query({
	args: { podcastId: v.id("podcasts") },
	handler: async (ctx, { podcastId }) => await ctx.db.get(podcastId)
})

export const getPodcastByUser = query({
	args: { userId: v.id("users") },
	handler: async (ctx, { userId }) =>
		await ctx.db
			.query("podcasts")
			.filter(q => q.eq(q.field("user"), userId))
			.collect()
})

export const getPodcastByVoiceType = query({
	args: { podcastId: v.id("podcasts") },
	handler: async (ctx, { podcastId }) => {
		const podcast = await ctx.db.get(podcastId)

		return await ctx.db
			.query("podcasts")
			.filter(q =>
				q.and(
					q.eq(q.field("voiceType"), podcast?.voiceType),
					q.neq(q.field("_id"), podcast?._id)
				)
			)

			.collect()
	}
})

export const deletePodcast = mutation({
	args: {
		podcastId: v.id("podcasts"),
		imgStorageId: v.id("_storage"),
		audioStorageId: v.id("_storage")
	},
	handler: async (ctx, { audioStorageId, imgStorageId, podcastId }) => {
		const podcast = await getPodcastById(ctx, { podcastId })
		if (!podcast) {
			throw new ConvexError("Podcast not found")
		}
		await ctx.storage.delete(audioStorageId)
		await ctx.storage.delete(imgStorageId)
		return await ctx.db.delete(podcastId)
	}
})

export const updatePodcastViews = mutation({
	args: {
		podcastId: v.id("podcasts")
	},
	handler: async (ctx, args) => {
		const podcast = await getPodcastById(ctx, args)

		if (!podcast) {
			throw new ConvexError("Podcast not found")
		}

		return await ctx.db.patch(args.podcastId, {
			views: podcast.views + 1
		})
	}
})

export const getPodcastBySearch = query({
	args: {
		search: v.string()
	},
	handler: async (ctx, args) => {
		if (args.search === "") {
			return await ctx.db.query("podcasts").order("desc").collect()
		}

		const authorSearch = await ctx.db
			.query("podcasts")
			.withSearchIndex("search_author", q => q.search("author", args.search))
			.take(10)

		if (authorSearch.length > 0) {
			return authorSearch
		}

		const titleSearch = await ctx.db
			.query("podcasts")
			.withSearchIndex("search_title", q =>
				q.search("podcastTitle", args.search)
			)
			.take(10)

		if (titleSearch.length > 0) {
			return titleSearch
		}

		return await ctx.db
			.query("podcasts")
			.withSearchIndex("search_body", q =>
				q.search("podcastDescription", args.search)
			)
			.take(10)
	}
})

export const getPodcastByAuthorId = query({
	args: {
		authorId: v.string()
	},
	handler: async (ctx, args) => {
		const podcasts = await ctx.db
			.query("podcasts")
			.filter(q => q.eq(q.field("authorId"), args.authorId))
			.collect()

		const totalListeners = podcasts.reduce(
			(sum, podcast) => sum + podcast.views,
			0
		)

		return { podcasts, listeners: totalListeners }
	}
})

export const getTopUserByPodcastCount = query({
	handler: async ctx => {
		const podcast = await ctx.db.query("podcasts").collect()
		return podcast.sort((a, b) => b.views - a.views).slice(0, 8)
	}
})
