/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react"

import { Id } from "@/convex/_generated/dataModel"

declare interface EmptyStateProps {
	title: string
	search?: boolean
	buttonText?: string
	buttonLink?: string
}

declare interface TopPodcastersProps {
	_id: Id<"users">
	_creationTime: number
	email: string
	imageUrl: string
	clerkId: string
	name: string
	podcast: {
		podcastTitle: string
		podcastId: Id<"podcasts">
	}[]
	totalPodcasts: number
}

declare interface PodcastProps {
	_id: Id<"podcasts">
	_creationTime: number
	audioStorageId?: Id<"_storage"> | null | undefined
	user: Id<"users">
	podcastTitle: string
	podcastDescription: string
	audioUrl?: string | null | undefined
	imageUrl?: string | null
	imageStorageId?: Id<"_storage"> | null | undefined
	author: string
	authorId: string
	authorImageUrl: string
	voicePrompt: string
	imagePrompt: string | null
	voiceType: string
	audioDuration: number
	views: number
}

declare interface GeneratePodcastProps {
	voiceType: string | null
	setAudio: Dispatch<SetStateAction<string>>
	audio: string
	setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>
	voicePrompt: string
	setVoicePrompt: Dispatch<SetStateAction<string>>
	setAudioDuration: Dispatch<SetStateAction<number>>
}

declare interface GenerateThumbnailProps {
	setImage: Dispatch<SetStateAction<string>>
	setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>
	image: string
	imagePrompt: string
	setImagePrompt: Dispatch<SetStateAction<string>>
}

declare interface LatestPodcastCardProps {
	imgUrl: string
	title: string
	duration: string
	index: number
	audioUrl: string
	author: string
	views: number
	podcastId: Id<"podcasts">
}

declare interface PodcastDetailPlayerProps {
	audioUrl: string
	podcastTitle: string
	author: string
	isOwner: boolean
	imageUrl: string
	podcastId: Id<"podcasts">
	imageStorageId: Id<"_storage">
	audioStorageId: Id<"_storage">
	authorImageUrl: string
	authorId: string
}

declare interface AudioProps {
	title: string
	audioUrl: string | null
	author: string
	imageUrl: string
	podcastId: string
}

declare interface AudioContextType {
	audio: AudioProps | undefined
	setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>
}

declare interface PodcastCardProps {
	imgUrl: string
	title: string
	description: string
	podcastId: Id<"podcasts">
}

declare interface CarouselProps {
	fansLikeDetails: TopPodcastersProps[]
}

declare interface ProfileCardProps {
	podcast: PodcastProps
	imageUrl: string
	name: string
	totalListeners: number
}

declare type UseDotButtonType = {
	selectedIndex: number
	scrollSnaps: number[]
	onDotButtonClick: (index: number) => void
}
