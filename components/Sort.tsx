"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { sortTypes } from "@/constants"
import { usePathname, useRouter } from "next/navigation"

const Sort = () => {
	const router = useRouter()
	const path = usePathname()

	const handleSort = (value: string) => {
		router.push(`${path}?sort=${value}`)
	}

	return (
		<Select
			onValueChange={handleSort}
			defaultValue={sortTypes[0].value}
		>
			<SelectTrigger className='sort-select'>
				<p className='text-white-1 hidden sm:block text-16 font-bold'>
					Apply Filter
				</p>
			</SelectTrigger>
			<SelectContent className='sort-select-content'>
				{sortTypes.map(({ value, label }) => (
					<SelectItem
						className='cursor-pointer text-white-2'
						key={label}
						value={value}
					>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default Sort
