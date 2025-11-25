import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ConvexClerkProvider } from "@/providers/ConvexProviders"
import AudioProvider from "@/providers/AudioProvider"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Podcastr",
	description: "Generate your podcasts using AI",
	icons: {
		icon: "/icons/logo.svg"
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexClerkProvider>
			<html
				lang='en'
				suppressHydrationWarning
			>
				<AudioProvider>
					<body className={`${manrope.className} custom-scrollbar`}>
						{children}
					</body>
				</AudioProvider>
			</html>
		</ConvexClerkProvider>
	)
}
