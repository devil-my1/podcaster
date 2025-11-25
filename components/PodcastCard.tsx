"use client"
import { PodcastCardProps } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const PodcastCard = ({ podcast }: { podcast: PodcastCardProps }) => {
	const router = useRouter()

	const handleViews = () => {
		router.push(`/podcasts/${podcast.podcastId}`, { scroll: true })
	}

	return (
		<div
			onClick={handleViews}
			className='cursor-pointer hover:scale-105 transition-transform duration-300'
		>
			<figure className='flex flex-col gap-2'>
				<Image
					src={podcast.imgUrl}
					alt={podcast.title}
					width={174}
					height={174}
					className='rounded-xl aspect-square h-fit w-full 2xl:size-[200px]'
				/>
				<div className='flex flex-col'>
					<h2 className='text-16 truncate font-bold text-white-1'>
						{podcast.title}
					</h2>
					<h3 className='text-12 truncate text-white-4 capitalize'>
						{podcast.description}
					</h3>
				</div>
			</figure>
		</div>
	)
}

export default PodcastCard
