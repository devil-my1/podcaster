"use client"
import React, { useRef, useState, useCallback } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Loader } from "lucide-react"
import { GenerateThumbnailProps } from "@/types"
import { useImageGenerate } from "@/hooks/use-img-generate"
import { Input } from "./ui/input"
import Image from "next/image"
import { useMutation } from "convex/react"
import { useUploadFiles } from "@xixixao/uploadstuff/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"

const GenereteThumbnail = ({
	setImage,
	setImagePrompt,
	image,
	imagePrompt,
	setImageStorageId
}: GenerateThumbnailProps) => {
	const [isAiThumbnail, setisAiThumbnail] = useState(false)
	const imgRef = useRef<HTMLInputElement>(null)
	const [isUploading, setIsUploading] = useState(false)
	const { isGenerating, generateThumbnail } = useImageGenerate({
		image,
		imagePrompt,
		setImage,
		setImageStorageId,
		setImagePrompt
	})

	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const getImgUrl = useMutation(api.podcasts.getUrl)
	const { toast } = useToast()

	const { startUpload } = useUploadFiles(generateUploadUrl)

	// Memoized function to handle image upload
	const handleImg = useCallback(
		async (imgBlob: Blob, fileName: string) => {
			setIsUploading(true)
			setImage("")

			try {
				const file = new File([imgBlob], fileName, { type: "image/png" })

				const uploaded = await startUpload([file])
				const storageId = (uploaded[0].response as any).storageId

				setImageStorageId(storageId)

				const imgUrl = await getImgUrl({ storageId })
				setImage(imgUrl!)
				toast({ title: "Thumbnail uploaded successfully" })
			} catch (error) {
				console.log("Error: ", error)
				toast({
					title: "Error uploading image",
					variant: "destructive"
				})
			} finally {
				setIsUploading(false)
			}
		},
		[setImage, setImageStorageId, startUpload, getImgUrl, toast]
	)

	// Memoized function to handle generate button click
	const handleGenerateClick = useCallback(
		(e: { preventDefault: () => void }) => {
			e.preventDefault()
			generateThumbnail()
		},
		[generateThumbnail]
	)

	// Memoized function to handle image div click
	const handleImageDivClick = useCallback(() => {
		imgRef?.current?.click()
	}, [])

	// Memoized function to handle input change
	const handleInputChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault()
			try {
				const file = e.target.files?.[0]
				if (file) {
					const blob = await file
						.arrayBuffer()
						.then((buffer: ArrayBuffer) => new Blob([buffer]))
					handleImg(blob, file.name)
				}
			} catch (error) {
				console.log("Error: ", error)
				toast({
					title: "Error uploading image",
					variant: "destructive"
				})
			}
		},
		[handleImg, toast]
	)

	return (
		<>
			<div className='generate_thumbnail'>
				<Button
					type='button'
					variant={"plain"}
					onClick={() => setisAiThumbnail(true)}
					className={cn("", { "bg-black-6": isAiThumbnail })}
				>
					Use AI to generate thumbnail
				</Button>
				<Button
					type='button'
					variant={"plain"}
					onClick={() => setisAiThumbnail(false)}
					className={cn("", { "bg-black-6": !isAiThumbnail })}
				>
					Upload custom image
				</Button>
			</div>
			{isAiThumbnail ? (
				<div className='flex flex-col gap-5'>
					<div className='mt-5 flex flex-col gap-2.5'>
						<Label className='text-16 font-bold text-white-1'>
							AI Prompt to generate Thumbnail
						</Label>
						<Textarea
							className='input-class font-light focus-visible:ring-orange-1'
							placeholder='Provide text to generate thumbnail'
							rows={5}
							value={imagePrompt}
							onChange={e => setImagePrompt(e.target.value)}
						/>
					</div>
					<div className='w-full max-w-[200px]'>
						<Button
							type='button'
							variant={"ghost"}
							disabled={isGenerating}
							className='text-16 bg-orange-1 py-4 font-bold text-white-1 '
							onClick={handleGenerateClick}
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
				</div>
			) : (
				<div
					className='image_div'
					onClick={handleImageDivClick}
				>
					<Input
						type='file'
						className='hidden'
						accept='image/*'
						ref={imgRef}
						onChange={handleInputChange}
					/>
					{!isUploading ? (
						<div className='flex flex-col items-center gap-2'>
							<Image
								src='/icons/upload-image.svg'
								alt='upload'
								width={40}
								height={40}
								className=''
							/>
							<div className='flex flex-col items-center gap-1 '>
								<h2 className='font-bold text-12 text-orange-1'>
									Click to upload
								</h2>
								<p className='text-[11px] font-normal text-gray-1'>
									SVG, PNG, JPG, JPEG or GIF (max. 1080x1080px)
								</p>
							</div>
						</div>
					) : (
						<div className='flex-center text-16 font-medium text-white-1'>
							<Loader
								className='ml-2 animate-spin'
								size={20}
							/>
							Uploading...
						</div>
					)}
				</div>
			)}
			{image && (
				<div className='flex-center w-full '>
					<Image
						src={image}
						alt='thumbnail'
						width={200}
						height={200}
						className='mt-5'
					/>
				</div>
			)}
		</>
	)
}

export default GenereteThumbnail
