import React, { useCallback } from "react"
import { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { DotButton, useDotButton } from "./CarouselDotButton"
import { CarouselProps } from "@/types"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Carousel = ({ fansLikeDetails }: CarouselProps) => {
	const router = useRouter()
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay
		if (!autoplay) return

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop

		resetOrStop()
	}, [])

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick
	)

	const slides =
		fansLikeDetails && fansLikeDetails.filter(item => item.totalPodcasts > 0)

	return (
		<section
			className='flex w-full flex-col gap-4 overflow-hidden'
			ref={emblaRef}
		>
			<div className='flex'>
				{slides?.slice(0, 5).map(item => (
					<figure
						className='carousel_box'
						key={item._id}
						onClick={() =>
							router.push(`/podcasts/${item.podcast[0].podcastId}`)
						}
					>
						<Image
							src={item.imageUrl}
							alt={item.name}
							fill
							className='absolute size-full aspect-square rounded-xl border-none'
						/>
						<div className='glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-3'>
							<h2 className='text-14 font-semibold text-white-1'>
								{item.podcast[0]?.podcastTitle}
							</h2>
							<p className='text-14 font-light text-white-2'>{item.name}</p>
						</div>
					</figure>
				))}
			</div>

			<div className='flex justify-center gap-2'>
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						onClick={() => onDotButtonClick(index)}
						selected={index === selectedIndex}
					/>
				))}
			</div>
		</section>
	)
}

export default Carousel
