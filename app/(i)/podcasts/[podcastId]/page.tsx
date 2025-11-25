"use client"
import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/Loader"
import PodcastCard from "@/components/PodcastCard"
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function Podcast() {
	const { user } = useUser()
	const { podcastId } = useParams<{ podcastId: Id<"podcasts"> }>()
	const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })
	const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
		podcastId
	})

	const isOwner = podcast?.authorId === user?.id

	if (!podcast || !similarPodcasts) return <LoaderSpinner />

	return (
		<section className='flex flex-col w-full'>
			<header className='mt-9 flex items-center justify-between'>
				<h1 className='text-20 font-bold text-white-1'>Currently Playing</h1>
				<figure className='flex gap-3'>
					<Image
						src='/icons/headphone.svg'
						alt='headphone'
						width={24}
						height={24}
					/>
					<h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
				</figure>
			</header>
			<PodcastDetailPlayer
				isOwner={isOwner}
				podcastId={podcast._id}
				audioUrl={podcast.audioUrl!}
				imageUrl={podcast.imageUrl!}
				imageStorageId={podcast.imageStorageId!}
				audioStorageId={podcast.audioStorageId!}
				{...podcast}
			/>
			<p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>
				{podcast?.podcastDescription}
			</p>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-col gap-4'>
					<h3 className='text-18 font-bold text-white-1'>Transciption</h3>
					<p className='text-white-2 text-16 font-medium'>
						{podcast?.voicePrompt}
					</p>
				</div>
				<div className='flex flex-col gap-4'>
					<h3 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h3>
					<p className='text-white-2 text-16 font-medium'>
						{podcast?.imagePrompt}
					</p>
				</div>
			</div>
			<section className='mt-8 flex flex-col gap-5'>
				<h2 className='text-20 font-bold text-white-1'>Similar Podcasts</h2>
				<div className='flex flex-row gap-5'>
					{similarPodcasts?.length > 0 ? (
						<div>
							{similarPodcasts?.map(podcast => (
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
						</div>
					) : (
						<EmptyState
							title='No similar podcasts found'
							buttonLink='/discover'
							buttonText='Discover more podcasts'
						/>
					)}
				</div>
			</section>
		</section>
	)
}
