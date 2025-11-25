"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { LogInIcon, LogOutIcon } from "lucide-react"

const LeftSideBar = () => {
	const { signOut } = useClerk()
	const currentPath = usePathname()
	const router = useRouter()

	return (
		<section className='left_sidebar'>
			<nav className='flex flex-col gap-6'>
				<Link
					href='/'
					className='flex items-center gap-2 cursor-pointer pb-10'
				>
					<Image
						src='/icons/logo.svg'
						alt='logo'
						width={25}
						height={27}
					/>
					<h1 className='h1'>Podcaster</h1>
				</Link>
				{sidebarLinks.map(menuItem => (
					<Link
						key={menuItem.route}
						href={menuItem.route}
						className={cn(
							"flex items-center justify-center gap-3 py-4 max-lg:px-4 md:justify-start cursor-pointer",
							{
								"bg-nav-focus border-r-4 border-orange-1":
									currentPath === menuItem.route ||
									currentPath.startsWith(`${menuItem.route}/`)
							}
						)}
					>
						<Image
							src={menuItem.imgURL}
							alt={menuItem.label}
							width={24}
							height={24}
						/>
						<p className='text-white-1 text-18 '>{menuItem.label}</p>
					</Link>
				))}
			</nav>
			<SignedOut>
				<div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
					<Button
						asChild
						className='text-16 font-extrabold text-white-1 w-full bg-orange-1'
					>
						<Link href='/sign-in'>
							<LogInIcon size={24} />
							Sign In
						</Link>
					</Button>
				</div>
			</SignedOut>
			<SignedIn>
				<div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
					<Button
						onClick={() => signOut(() => router.push("/"))}
						className='text-16 font-extrabold text-white-1 w-full bg-orange-1 hover:bg-black-4'
					>
						<LogOutIcon size={24} />
						Log Out
					</Button>
				</div>
			</SignedIn>
		</section>
	)
}

export default LeftSideBar
