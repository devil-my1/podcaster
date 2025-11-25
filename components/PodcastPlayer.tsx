"use client"
import Image from "next/image"
import Link from "next/link"
import { use, useEffect, useRef, useState } from "react"

import { formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { useAudio } from "@/providers/AudioProvider"

import { Progress } from "./ui/progress"
import { X } from "lucide-react"
import { revalidatePath } from "next/cache"
import { usePathname } from "next/navigation"

const PodcastPlayer = () => {
	const pathname = usePathname()
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(0)
	const [isMuted, setIsMuted] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [hoverTime, setHoverTime] = useState<number | null>(null)

	const { audio, setAudio } = useAudio()

	const togglePlayPause = () => {
		if (audioRef.current?.paused) {
			audioRef.current?.play()
			setIsPlaying(true)
		} else {
			audioRef.current?.pause()
			setIsPlaying(false)
		}
	}

	const toggleMute = () => {
		if (audioRef.current) {
			audioRef.current.muted = !isMuted
			setIsMuted(prev => !prev)
		}
	}

	const forward = () => {
		if (
			audioRef.current &&
			audioRef.current.currentTime &&
			audioRef.current.duration &&
			audioRef.current.currentTime + 5 < audioRef.current.duration
		) {
			audioRef.current.currentTime += 5
		}
	}

	const rewind = () => {
		if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
			audioRef.current.currentTime -= 5
		} else if (audioRef.current) {
			audioRef.current.currentTime = 0
		}
	}

	useEffect(() => {
		const updateCurrentTime = () => {
			if (audioRef.current) {
				setCurrentTime(audioRef.current.currentTime)
			}
		}

		const audioElement = audioRef.current
		if (audioElement) {
			audioElement.addEventListener("timeupdate", updateCurrentTime)

			return () => {
				audioElement.removeEventListener("timeupdate", updateCurrentTime)
			}
		}
	}, [audio])

	useEffect(() => {
		const audioElement = audioRef.current
		if (audio?.audioUrl) {
			if (audioElement) {
				audioElement.play().then(() => {
					setIsPlaying(true)
				})
			}
		} else {
			audioElement?.pause()
			setIsPlaying(true)
		}
	}, [audio])

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
		}
	}

	const handleAudioEnded = () => {
		setIsPlaying(false)
	}

	const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (audioRef.current && duration) {
			const rect = event.currentTarget.getBoundingClientRect()
			const clickX = event.clientX - rect.left
			const newTime = (clickX / rect.width) * duration
			audioRef.current.currentTime = newTime
			setCurrentTime(newTime)
		}
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (duration) {
			const rect = event.currentTarget.getBoundingClientRect()
			const hoverX = event.clientX - rect.left
			const hoverTime = (hoverX / rect.width) * duration
			setHoverTime(hoverTime)
		}
	}

	const handleMouseLeave = () => {
		setHoverTime(null)
	}

	if (!audio?.audioUrl || audio?.audioUrl === "") {
		return null
	}

	return (
		<div
			className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
				hidden: !audio?.audioUrl || audio?.audioUrl === ""
			})}
		>
			{/* change the color for indicator inside the Progress component in ui folder */}
			<div
				className='relative w-full'
				onClick={handleProgressClick}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<Progress
					value={(currentTime / duration) * 100 || 0}
					className='w-full'
					max={duration || 100}
				/>
				{hoverTime !== null && (
					<div
						className='absolute bg-orange-1 text-white-1 text-xs p-1 rounded'
						style={{
							left: `${(hoverTime / duration) * 100}%`,
							transform: "translateX(-50%)",
							bottom: "100%",
							marginBottom: "5px"
						}}
					>
						{formatTime(hoverTime)}
					</div>
				)}
			</div>
			<section className='glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12'>
				<audio
					ref={audioRef}
					src={audio?.audioUrl}
					className='hidden'
					onLoadedMetadata={handleLoadedMetadata}
					onEnded={handleAudioEnded}
				/>
				<div className='flex items-center gap-4 max-md:hidden'>
					<Link href={`/podcast/${audio?.podcastId}`}>
						<Image
							src={audio?.imageUrl! || "/images/player1.png"}
							width={64}
							height={64}
							alt='player1'
							className='aspect-square rounded-xl'
						/>
					</Link>
					<div className='flex w-[160px] flex-col'>
						<h2 className='text-14 truncate font-semibold text-white-1'>
							{audio?.title}
						</h2>
						<p className='text-12 font-normal text-white-2'>{audio?.author}</p>
					</div>
				</div>
				<div className='flex-center cursor-pointer gap-3 md:gap-6'>
					<div className='flex items-center gap-1.5'>
						<Image
							src={"/icons/reverse.svg"}
							width={24}
							height={24}
							alt='rewind'
							onClick={rewind}
						/>
						<h2 className='text-12 font-bold text-white-4'>-5</h2>
					</div>
					<Image
						src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
						width={30}
						height={30}
						alt='play'
						onClick={togglePlayPause}
					/>
					<div className='flex items-center gap-1.5'>
						<h2 className='text-12 font-bold text-white-4'>+5</h2>
						<Image
							src={"/icons/forward.svg"}
							width={24}
							height={24}
							alt='forward'
							onClick={forward}
						/>
					</div>
				</div>
				<div className='flex items-center gap-6  justify-center'>
					<h2 className='text-16 font-normal text-white-2 max-md:hidden'>
						{formatTime(duration)}
					</h2>
					<div className='flex w-full gap-2'>
						<Image
							src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
							width={24}
							height={24}
							alt='mute unmute'
							onClick={toggleMute}
							className='cursor-pointer'
						/>
					</div>
					<div className='flex items-center relative self-center'>
						<X
							size={24}
							onClick={() => {
								audioRef.current?.pause()

								setAudio({
									audioUrl: "",
									imageUrl: "",
									title: "",
									author: "",
									podcastId: ""
								})
							}}
							className='absolute  -left-2 -top-3 cursor-pointer text-orange-1 hover:text-white-1 transition-all duration-300'
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PodcastPlayer
