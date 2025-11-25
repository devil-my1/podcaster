import { PodcastForm } from "@/components/PodcastForm"

export default function CreatePodcast() {
	return (
		<section className='mt-10 flex flex-col '>
			<h1 className='text-20 font-bold text-white-1'>Create Podcasts</h1>
			<PodcastForm />
		</section>
	)
}
