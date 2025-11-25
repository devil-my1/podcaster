"use client"
import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

const SearchBar = () => {
	const [search, setSearch] = useState("")
	const router = useRouter()
	const pathname = usePathname()

	const debouncedSearch = useDebounce(search, 1000)

	useEffect(() => {
		if (debouncedSearch.length > 0) {
			router.push(`/discover?search=${debouncedSearch}`)
		} else if (pathname === "/discover") {
			router.push("/discover")
		}
	}, [pathname, router, debouncedSearch])

	return (
		<div className='relative mt-8 block'>
			<Input
				placeholder='Search for podcasts'
				className='input-class py-6 pl-12 focus-visible:ring-orange-1'
				value={search}
				onChange={e => setSearch(e.target.value)}
				onLoad={e => setSearch("")}
			/>
			<Image
				src='/icons/search.svg'
				alt='search'
				width={20}
				height={20}
				className='absolute top-1/2 right-4 transform -translate-y-1/2'
			/>
		</div>
	)
}

export default SearchBar
