import { EmptyStateProps } from "@/types"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

const EmptyState = ({
	title,
	buttonLink,
	buttonText,
	search
}: EmptyStateProps) => {
	return (
		<section className='flex-center size-full flex-col gap-3'>
			<Image
				src='/icons/emptyState.svg'
				alt='empty'
				width={250}
				height={250}
			/>
			<div className='flex-center w-full max-w-[255px] flex-col gap-3'>
				<h2 className='text-16 text-center font-medium text-white-1'>
					{title}
				</h2>
				{search && (
					<p className='text-white-2 text-16 font-medium text-center'>
						Try adjusting your search to find what you are looking for
					</p>
				)}
				{buttonLink && (
					<Button
						type='button'
						className='bg-orange-1 hover:bg-black-5 transition-all duration-300'
					>
						<Link
							className='gap-1 flex'
							href={buttonLink}
						>
							<Image
								src='/icons/discover.svg'
								alt='search'
								width={20}
								height={20}
							/>
							<h3 className='text-16 text-white-1 font-extrabold'>
								{buttonText}
							</h3>
						</Link>
					</Button>
				)}
			</div>
		</section>
	)
}

export default EmptyState
