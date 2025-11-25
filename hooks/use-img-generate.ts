"use client"

import { GenerateThumbnailProps } from "@/types"
import { useState, useCallback } from "react"
import { useToast } from "./use-toast"
import { v4 as uuid } from "uuid"
import { useAction, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUploadFiles } from "@xixixao/uploadstuff/react"

export function useImageGenerate(props: GenerateThumbnailProps) {
	const [isGenerating, setIsGenerating] = useState(false)
	const { toast } = useToast()

	const getThumbnail = useAction(api.openai.getThumbnail)
	const getImgUrl = useMutation(api.podcasts.getUrl)
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)

	const { startUpload } = useUploadFiles(generateUploadUrl)

	const generateThumbnail = useCallback(async () => {
		setIsGenerating(true)
		props.setImage("")

		if (!props.imagePrompt) {
			toast({
				title: "Error",
				description: "Please provide text to generate thumbnail",
				className: "text-white-1 font-bold bg-[#FFA500]"
			})
			setIsGenerating(false)
			return
		}

		try {
			const resp = await getThumbnail({ prompt: props.imagePrompt })

			const imgBlob = new Blob([resp], { type: "image/png" })
			const fileName = `podcast-${uuid()}-thumbnail.png`
			const file = new File([imgBlob], fileName, { type: "image/png" })

			const uploaded = await startUpload([file])
			const storageId = (uploaded[0].response as any).storageId

			props.setImageStorageId(storageId)

			const imgUrl = await getImgUrl({ storageId })
			props.setImage(imgUrl!)

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
	}, [props, getThumbnail, startUpload, getImgUrl, toast])

	return {
		isGenerating,
		generateThumbnail
	}
}
