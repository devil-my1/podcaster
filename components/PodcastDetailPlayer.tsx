import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"
import { useAudio } from "@/providers/AudioProvider"
import { PodcastDetailPlayerProps } from "@/types"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useRef } from "react"
import LoaderSpinner from "./Loader"
import Image from "next/image"
import { Button } from "./ui/button"

const PodcastDetailPlayer = ({
	audioStorageId,
	audioUrl,
	author,
	authorId,
	authorImageUrl,
	imageStorageId,
	imageUrl,
	isOwner,
	podcastId,
	podcastTitle
}: PodcastDetailPlayerProps) => {
	const router = useRouter()
	const { toast } = useToast()
	const [isDeleting, setIsDeleting] = useState(false)
	const { setAudio } = useAudio()
	const deletePodcast = useMutation(api.podcasts.deletePodcast)
	const updateViews = useMutation(api.podcasts.updatePodcastViews)
	const actionMenuRef = useRef<HTMLDivElement>(null)

	const handleDelete = async () => {
		try {
			setIsDeleting(true)
			await deletePodcast({
				podcastId,
				audioStorageId,
				imgStorageId: imageStorageId
			})
			router.push("/")
		} catch (error) {
			toast({
				title: "Error deleting podcast",
				variant: "destructive"
			})
		} finally {
			setIsDeleting(false)
		}
	}

	const handlePlay = () => {
		setAudio({
			title: podcastTitle,
			audioUrl,
			imageUrl,
			author,
			podcastId
		})
		if (!isOwner) updateViews({ podcastId })
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				actionMenuRef.current &&
				!actionMenuRef.current.contains(event.target as Node)
			) {
				setIsDeleting(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [actionMenuRef])

	if (!imageUrl || !authorImageUrl) return <LoaderSpinner />

	return (
		<div className='mt-6 flex w-full justify-between max-md:justify-center'>
			<div className='flex flex-col gap-8 max-md:items-center md:flex-row'>
				<Image
					src={imageUrl}
					alt={podcastTitle}
					width={250}
					height={250}
					className='rounded-lg aspect-square'
				/>
				<div className='flex w-full flex-col gap-5 max-md:items-center md:gap-9'>
					<article className='flex flex-col max-md:items-center'>
						<h2 className='text-32 font-extrabold tracking-[-0.32px] text-white-1'>
							{podcastTitle}
						</h2>
						<figure
							className='flex cursor-pointer items-center gap-2'
							onClick={() => router.push(`/profile/${authorId}`)}
						>
							<Image
								src={authorImageUrl}
								alt={author}
								width={30}
								height={30}
								className='size-[30px] rounded-full object-cover'
							/>
							<h3 className='text-16 font-normal text-white-3'>{author}</h3>
						</figure>
					</article>
					<Button
						onClick={handlePlay}
						className='text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1'
					>
						<Image
							src='/icons/play.svg'
							alt='play'
							width={20}
							height={20}
						/>
						&nbsp; Play podcast
					</Button>
				</div>
			</div>
			{isOwner && (
				<div
					className='relative mt-2'
					ref={actionMenuRef}
				>
					<Image
						src='/icons/three-dots.svg'
						alt='delete'
						width={20}
						height={20}
						onClick={() => setIsDeleting(prev => !prev)}
						className='cursor-pointer'
					/>
					{isDeleting && (
						<div
							className='absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2'
							onClick={handleDelete}
						>
							<Image
								src='/icons/delete.svg'
								width={16}
								height={16}
								alt='Delete icon'
							/>
							<h2 className='text-16 font-normal text-white-1'>Delete</h2>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default PodcastDetailPlayer
