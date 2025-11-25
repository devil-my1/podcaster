import { query, internalMutation } from "./_generated/server"
import { ConvexError, v } from "convex/values"

export const getUserById = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter(q => q.eq(q.field("clerkId"), args.clerkId))
			.unique()

		if (!user) {
			throw new ConvexError("User not found")
		}

		return user
	}
})

export const getTopUserByPodcastCount = query({
	args: {},
	handler: async ctx => {
		const users = await ctx.db.query("users").collect()

		const userData = await Promise.all(
			users.map(async user => {
				const podcasts = await ctx.db
					.query("podcasts")
					.filter(q => q.eq(q.field("authorId"), user.clerkId))
					.collect()

				const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views)

				return {
					...user,
					totalPodcasts: podcasts.length,
					podcast: sortedPodcasts.map(p => ({
						podcastTitle: p.podcastTitle,
						podcastId: p._id
					}))
				}
			})
		)

		return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts)
	}
})

export const createUser = internalMutation({
	args: {
		clerkId: v.string(),
		email: v.string(),
		imageUrl: v.string(),
		name: v.string()
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("users", args)
	}
})

export const updateUser = internalMutation({
	args: { clerkId: v.string(), imageUrl: v.string(), email: v.string() },
	handler: async (ctx, args) => {
		const user = await getUserById(ctx, { clerkId: args.clerkId })

		await ctx.db.patch(user._id, {
			imageUrl: args.imageUrl,
			email: args.email
		})

		const user_podcasts = await ctx.db
			.query("podcasts")
			.filter(q => q.eq("authorId", user.clerkId))
			.collect()

		await Promise.all(
			user_podcasts.map(async podcast => {
				await ctx.db.patch(podcast._id, {
					authorImageUrl: args.imageUrl
				})
			})
		)
	}
})

export const deleteUser = internalMutation({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		const user = await getUserById(ctx, { clerkId: args.clerkId })

		await ctx.db.delete(user._id)
	}
})
