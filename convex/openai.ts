import { action, query } from "@/convex/_generated/server"
import { v } from "convex/values"
import { OpenAI } from "openai"
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const getPodcastAudio = action({
	args: { input: v.string(), voice: v.string() },
	handler: async (_, { voice, input }) => {
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: voice as SpeechCreateParams["voice"],
			input
		})

		return await mp3.arrayBuffer()
	}
})

export const getThumbnail = action({
	args: { prompt: v.string() },
	handler: async (_, { prompt }) => {
		const image = await openai.images.generate({
			model: "dall-e-3",
			prompt,
			n: 1,
			size: "1024x1024",
			quality: "hd"
		})

		const url = image.data[0].url

		if (!url) {
			throw new Error("Error generating image")
		}

		const imgResp = await fetch(url)
		return await imgResp.arrayBuffer()
	}
})
