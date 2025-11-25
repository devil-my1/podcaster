"use client"
import React from "react"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import router from "next/router"
import { Button } from "./ui/button"

const MobileNav = () => {
	const currentPath = usePathname()
	const { signOut } = useClerk()
	return (
		<section>
			<Sheet>
				<SheetTrigger>
					<MenuIcon
						className='text-white-1'
						size={30}
					/>
				</SheetTrigger>
				<SheetContent
					side='left'
					className='border-none bg-black-1'
				>
					<SheetTitle />
					<Link
						href='/'
						className='flex items-center gap-2 cursor-pointer pb-10 pl-4'
					>
						<Image
							src='/icons/logo.svg'
							alt='logo'
							width={25}
							height={27}
						/>
						<h1 className='text-24 font-extrabold text-white-1 ml-2'>
							Podcaster
						</h1>
					</Link>
					<div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-hidden'>
						<SheetClose asChild>
							<nav className='flex flex-col h-full gap-6 text-white-1'>
								{sidebarLinks.map(menuItem => (
									<SheetClose
										asChild
										key={menuItem.route}
									>
										<Link
											href={menuItem.route}
											className={cn(
												"flex  items-center justify-start gap-3 py-4 max-lg:px-4 ",
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
											<p className='text-white-1 text-18'>{menuItem.label}</p>
										</Link>
									</SheetClose>
								))}
							</nav>
						</SheetClose>
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
					</div>
				</SheetContent>
			</Sheet>
		</section>
	)
}

export default MobileNav
