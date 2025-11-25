"use client"
import LeftSideBar from "@/components/LeftSideBar"
import MobileNav from "@/components/MobileNav"
import RightSideBar from "@/components/RightSideBar"
import Image from "next/image"
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayer"

export default function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex relative flex-col '>
			<main className='flex relative bg-black-3 '>
				<LeftSideBar />

				<section className='flex flex-col px-4 sm:px-14 min-h-screen flex-1 overflow-y-auto xl:ml-[240px] xl:mr-[264px]'>
					<div className='mx-auto flex w-full max-w-5xl flex-col max-sm:px-4'>
						<div className='flex h-16 items-center justify-between md:hidden '>
							<Image
								src='/icons/logo.svg'
								alt='menu-icon'
								width={30}
								height={30}
							/>
							<MobileNav />
						</div>
						<div className='flex flex-col md:pb-14  '>
							{children}
							<Toaster />
						</div>
					</div>
				</section>

				<RightSideBar />
			</main>
			{<PodcastPlayer />}
		</div>
	)
}
