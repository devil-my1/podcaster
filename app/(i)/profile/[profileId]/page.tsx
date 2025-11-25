"use client"
import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/Loader"
import PodcastCard from "@/components/PodcastCard"
import ProfileCard from "@/components/ProfileCard"
import Sort from "@/components/Sort"

import { api } from "@/convex/_generated/api"
import { useAudio } from "@/providers/AudioProvider"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"

import { useParams, useSearchParams } from "next/navigation"

export default function Profile() {
	const { user } = useUser()
	const { profileId } = useParams<{ profileId: string }>()
	const sort = useSearchParams().get("sort")
	const { setAudio } = useAudio()
	const authorPodcasts = useQuery(api.podcasts.getPodcastByAuthorId, {
		authorId: profileId
	})
	const author = useQuery(api.users.getUserById, { clerkId: profileId })
	const isOwner = user?.id === profileId

	if (!authorPodcasts || !author) return <LoaderSpinner />

	const podcast =
		authorPodcasts?.podcasts[
			Math.floor(Math.random() * authorPodcasts?.podcasts.length)
		]

	return (
		<div className='mt-9 flex flex-col gap-9 h-[calc(100vh-5.75rem)]'>
			<section className='flex flex-col gap-5 h-full'>
				<h1 className='text-20 font-bold text-white-1'>
					{isOwner ? "My Profile" : "Podcaster Profile"}
				</h1>
				<ProfileCard
					imageUrl={author?.imageUrl!}
					name={author?.name!}
					totalListeners={authorPodcasts?.listeners!}
					podcast={podcast}
				/>

				<div className='flex flex-col items-center my-5 w-full  flex-1'>
					<div className='flex justify-between w-full items-center mb-5'>
						<h2 className='text-20 font-bold text-white-1'>All Podcasts</h2>
						<Sort />
					</div>

					{(authorPodcasts?.podcasts ?? []).length > 0 ? (
						<div className='podcast_grid'>
							<>
								{authorPodcasts?.podcasts.map(podcast => (
									<PodcastCard
										key={podcast._id}
										podcast={{
											podcastId: podcast._id,
											title: podcast.podcastTitle,
											description: podcast.podcastDescription,
											imgUrl: podcast.imageUrl!
										}}
									/>
								))}
							</>
						</div>
					) : (
						<EmptyState
							title='No podcasts found'
							buttonLink='/discover'
							buttonText='Discover more podcasts'
						/>
					)}
				</div>
			</section>
		</div>
	)
}
