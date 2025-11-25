import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

const Header = ({
	headerTitle,
	titleClassName
}: {
	headerTitle?: string
	titleClassName?: string
}) => {
	return (
		<header className='flex items-center justify-between'>
			{headerTitle ? (
				<h2 className={cn("text-18 text-white-1 font-bold", titleClassName)}>
					{headerTitle}
				</h2>
			) : (
				<div />
			)}
			<Link
				className='text-16 font-semibold text-orange-1'
				href='/discover'
			>
				See all
			</Link>
		</header>
	)
}

export default Header
