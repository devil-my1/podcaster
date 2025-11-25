"use client"
import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/Loader"
import PodcastCard from "@/components/PodcastCard"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export default function Home() {
	const podcasts = useQuery(api.podcasts.getPodcasts)

	if (!podcasts) return <LoaderSpinner />

	return (
		<div className='mt-9 flex flex-col  gap-9'>
			<section className='flex flex-col gap-5'>
				<h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
				<div className='podcast_grid'>
					{podcasts.map(podcast => (
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
			</section>
		</div>
	)
}
