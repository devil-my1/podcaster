"use client"
import { VerifiedIcon } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { useAudio } from "@/providers/AudioProvider"
import { ProfileCardProps } from "@/types"

const ProfileCard = ({
	podcast,
	imageUrl,
	name,
	totalListeners
}: ProfileCardProps) => {
	const { setAudio } = useAudio()

	const handlePlay = () => {
		setAudio({
			title: podcast?.podcastTitle!,
			audioUrl: podcast?.audioUrl!,
			imageUrl: podcast?.imageUrl!,
			author: name,
			podcastId: podcast?._id!
		})
	}

	return (
		<figure className='flex max-sm:flex-col items-center max-sm:items-start gap-5'>
			<Image
				src={imageUrl!}
				alt='Profile Image'
				width={200}
				height={200}
				className='aspect-square rounded-lg'
			/>
			<div className='flex flex-col gap-3 self-start items-start pt-3'>
				<p className='text-14 text-white-3 flex items-center justify-center gap-2'>
					<VerifiedIcon
						size={16}
						className='text-blue-400'
					/>{" "}
					Verified Creator
				</p>
				<h2 className='text-24 font-bold text-white-1'>{name}</h2>
				<p className='text-16 text-white-2 md:mt-5 flex items-center gap-3 justify-center'>
					<Image
						src='/icons/headphone.svg'
						alt='headphone-icon'
						width={20}
						height={20}
					/>
					<span className='text-orange-1 font-bold'>{totalListeners}</span>{" "}
					monthly listeners
				</p>
				<Button
					disabled={!podcast}
					onClick={handlePlay}
					className='text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1'
				>
					<Image
						src='/icons/play.svg'
						alt='play'
						width={20}
						height={20}
					/>
					&nbsp; Play a random podcast
				</Button>
			</div>
		</figure>
	)
}

export default ProfileCard
