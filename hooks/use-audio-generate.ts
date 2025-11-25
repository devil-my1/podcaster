"use client"

import { GeneratePodcastProps } from "@/types"
import { useState } from "react"
import { useToast } from "./use-toast"
import { v4 as uuid } from "uuid"
import { useAction, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUploadFiles } from "@xixixao/uploadstuff/react"

export function useAudioGenerate(props: GeneratePodcastProps) {
	const [isGenerating, setIsGenerating] = useState(false)
	const { toast } = useToast()

	const getPodcastAudio = useAction(api.openai.getPodcastAudio)
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const getAudioUrl = useMutation(api.podcasts.getUrl)

	const { startUpload } = useUploadFiles(generateUploadUrl)

	const generatePodcast = async () => {
		setIsGenerating(true)
		props.setAudio("")

		if (!props.voiceType) {
			toast({
				title: "Error",
				description: "Please select voice type",
				className: "text-white-1 font-bold bg-[#FFA500]"
			})
			return setIsGenerating(false)
		} else if (!props.voicePrompt) {
			toast({
				title: "Error",
				description: "Please provide text to generate audio",
				className: "text-white-1 font-bold bg-[#FFA500]"
			})
			return setIsGenerating(false)
		}

		try {
			const resp = await getPodcastAudio({
				voice: props.voiceType || "alloy",
				input: props.voicePrompt
			})

			const audioBlob = new Blob([resp], { type: "audio/mpeg" })
			const fileName = `podcast-${uuid()}.mp3`
			const file = new File([audioBlob], fileName, { type: "audio/mpeg" })

			const uploaded = await startUpload([file])
			const storageId = (uploaded[0].response as any).storageId

			props.setAudioStorageId(storageId)

			const audioUrl = await getAudioUrl({ storageId })
			props.setAudio(audioUrl!)

			toast({
				title: "Success",
				description: "Podcast generated successfully",
				className: "text-white-1 font-bold bg-[#00FF00]"
			})
		} catch (error) {
			console.log("Error generating podcast: ", error)
			toast({
				title: "Error",
				variant: "destructive",
				description: "Error generating podcast",
				className: "text-white-1 font-bold"
			})
		} finally {
			setIsGenerating(false)
		}
	}

	return {
		isGenerating,
		generatePodcast
	}
}
