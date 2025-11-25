"use client"
import { GeneratePodcastProps } from "@/types"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

import { useAudioGenerate } from "@/hooks/use-audio-generate"
import { Button } from "./ui/button"
import { Loader } from "lucide-react"

const GeneratePodcast = ({
	audio,
	setAudio,
	setAudioDuration,
	setAudioStorageId,
	setVoicePrompt,
	voicePrompt,
	voiceType
}: GeneratePodcastProps) => {
	const { isGenerating, generatePodcast } = useAudioGenerate({
		audio,
		voicePrompt,
		voiceType,
		setAudio,
		setAudioDuration,
		setVoicePrompt,
		setAudioStorageId
	})

	return (
		<div>
			<div className='flex flex-col gap-2.5'>
				<Label className='text-16 font-bold text-white-1'>
					AI Prompt to generate Podcast
				</Label>
				<Textarea
					className='input-class font-light focus-visible:ring-orange-1'
					placeholder='Provide text to generate audio'
					rows={5}
					value={voicePrompt}
					maxLength={4096}
					onChange={e => setVoicePrompt(e.target.value)}
				/>
			</div>
			<div className='mt-5 w-full max-w-[200px]'>
				<Button
					variant={"ghost"}
					disabled={isGenerating}
					className='text-16 bg-orange-1 py-4 font-bold text-white-1 '
					onClick={e => {
						e.preventDefault()
						generatePodcast()
					}}
				>
					{isGenerating ? (
						<>
							<Loader
								className='ml-2 animate-spin'
								size={20}
							/>
							Generating...
						</>
					) : (
						"Generate"
					)}
				</Button>
			</div>
			{audio && (
				<audio
					src={audio}
					controls
					className='mt-5 w-full rounded-lg shadow-lg'
					onLoadedMetadata={e => setAudioDuration(e.currentTarget.duration)}
				/>
			)}
		</div>
	)
}

export default GeneratePodcast
