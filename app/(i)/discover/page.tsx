"use client"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import EmptyState from "@/components/EmptyState"
import LoaderSpinner from "@/components/Loader"
import PodcastCard from "@/components/PodcastCard"
import SearchBar from "@/components/SearchBar"
import { useSearchParams } from "next/navigation"

export default function Discover() {
	const search = useSearchParams().get("search")

	const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
		search: search || ""
	})
	return (
		<div className='flex flex-col gap-9'>
			<SearchBar />
			<div className='flex flex-col gap-9'>
				<h1 className='text-20 font-bold text-white-1'>
					{search ? `Searching for "${search}"` : "Discover Trending Podcasts"}
				</h1>
				{podcastData ? (
					<>
						{podcastData.length > 0 ? (
							<div className='podcast_grid'>
								{podcastData.map(podcast => (
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
							<LoaderSpinner />
						)}
					</>
				) : (
					<EmptyState title='No podcasts found...' />
				)}
			</div>
		</div>
	)
}
