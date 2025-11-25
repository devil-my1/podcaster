import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com"
			},
			{
				protocol: "https",
				hostname: "plus.unsplash.com"
			},
			{
				protocol: "https",
				hostname: "perceptive-deer-269.convex.cloud"
			},
			{
				protocol: "https",
				hostname: "img.clerk.com"
			}
		]
	}
}

export default nextConfig
