"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { PodcastFormValidation } from "@/lib/validation"
import SubmitButton from "./SubmitButton"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"
import { voiceDetails } from "@/constants"
import { Textarea } from "./ui/textarea"
import GeneratePodcast from "./GeneratePodcast"
import GenereteThumbnail from "./GenereteThumbnail"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"

export const PodcastForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const [voiceType, setVoiceType] = useState<string | null>(null)
	const [voicePrompt, setVoicePrompt] = useState("")
	const [imgPrompt, setImgPrompt] = useState("")

	const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
		null
	)
	const [imgStorageId, setImgStorageId] = useState<Id<"_storage"> | null>(null)

	const [audioUrl, setAudioUrl] = useState("")
	const [imgUrl, setImgUrl] = useState("")
	const { toast } = useToast()

	const [audioDuration, setAudioDuration] = useState(0)
	const createPodcast = useMutation(api.podcasts.createPodcast)

	const form = useForm<z.infer<typeof PodcastFormValidation>>({
		resolver: zodResolver(PodcastFormValidation),
		defaultValues: {
			podcastTitle: "",
			podcastDescription: ""
		}
	})

	const onSubmit = async (data: z.infer<typeof PodcastFormValidation>) => {
		setIsLoading(true)
		try {
			if (!audioUrl || !imgUrl) {
				toast({
					title: "Please generate podcast and thumbnail",
					variant: "destructive"
				})
				setIsLoading(false)
			}

			await createPodcast({
				podcastTitle: data.podcastTitle,
				podcastDescription: data.podcastDescription,
				voiceType: voiceType || "alloy",
				imageUrl: imgUrl,
				audioUrl: audioUrl,
				audioDuration: audioDuration,
				imageStorageId: imgStorageId!,
				audioStorageId: audioStorageId!,
				voicePrompt,
				imagePrompt: imgPrompt,
				views: 0
			})
			toast({ title: "Podcast created successfully" })
			router.push("/")
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-12 w-full flex flex-col remove-scrollbar'
			>
				<div className='flex flex-col gap-[30px] border-b border-black-5 pb-10 remove-scrollbar'>
					<FormField
						control={form.control}
						name='podcastTitle'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-2.5'>
								<FormLabel className='text-16 font-bold text-white-1'>
									Podcast Title
								</FormLabel>
								<FormControl>
									<Input
										className='input-class focus-visible:ring-orange-1'
										placeholder='Enter your podcast title'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-red-500'>
									{form.formState.errors.podcastTitle?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
					<div className='flex flex-col gap-2.5'>
						<Label className='text-16 font-bold text-white-1'>
							Select AI Voice
						</Label>
						<Select onValueChange={val => setVoiceType(val)}>
							<SelectTrigger
								className={cn(
									"text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-orange-1"
								)}
							>
								<SelectValue
									placeholder='Select AI Voice'
									className='placeholder:text-gray-1'
								/>
							</SelectTrigger>
							<SelectContent className='text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1'>
								{voiceDetails.map(voice => (
									<SelectItem
										className='capitalize focus:bg-orange-1'
										key={voice.id}
										value={voice.name}
									>
										{voice.name}
									</SelectItem>
								))}
							</SelectContent>
							{voiceType && (
								<audio
									autoPlay
									className='hidden'
									src={`/${voiceType}.wav`}
								></audio>
							)}
						</Select>
					</div>
					<FormField
						control={form.control}
						name='podcastDescription'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-2.5'>
								<FormLabel className='text-16 font-bold text-white-1'>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										className='input-class focus-visible:ring-orange-1'
										placeholder='Enter podcast description'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-red-500'>
									{form.formState.errors.podcastTitle?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col pt-10'>
					<GeneratePodcast
						setAudioStorageId={setAudioStorageId}
						audio={audioUrl}
						setAudio={setAudioUrl}
						voiceType={voiceType}
						voicePrompt={voicePrompt}
						setVoicePrompt={setVoicePrompt}
						setAudioDuration={setAudioDuration}
					/>
					<GenereteThumbnail
						image={imgUrl}
						setImage={setImgUrl}
						imagePrompt={imgPrompt}
						setImagePrompt={setImgPrompt}
						setImageStorageId={setImgStorageId}
					/>
					<div className='mt-10 w-full'>
						<SubmitButton
							className='text-16 bg-orange-1 w-full py-4 duration-500 hover:bg-black-5 font-extrabold text-white-1 transition-all'
							isLoading={isLoading}
						>
							Submit & Publish Podcast
						</SubmitButton>
					</div>
				</div>
			</form>
		</Form>
	)
}
