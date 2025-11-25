export const sidebarLinks = [
	{
		imgURL: "/icons/home.svg",
		route: "/",
		label: "Home"
	},
	{
		imgURL: "/icons/discover.svg",
		route: "/discover",
		label: "Discover"
	},
	{
		imgURL: "/icons/microphone.svg",
		route: "/create-podcast",
		label: "Create Podcast"
	}
]

export const voiceDetails = [
	{
		id: 1,
		name: "alloy"
	},
	{
		id: 2,
		name: "ash"
	},
	{
		id: 3,
		name: "coral"
	},
	{
		id: 4,
		name: "echo"
	},
	{
		id: 5,
		name: "fable"
	},
	{
		id: 6,
		name: "onyx"
	},
	{
		id: 7,
		name: "nova"
	},
	{
		id: 8,
		name: "shimmer"
	},
	{
		id: 9,
		name: "sage"
	}
]

export const podcastData = [
	{
		podcastId: 1,
		title: "The Joe Rogan Experience",
		description: "A long form, in-depth conversation",
		imgUrl:
			"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 2,
		title: "The Futur",
		description: "This is how the news should sound",
		imgUrl:
			"https://plus.unsplash.com/premium_vector-1682301729441-5ae8de7629d5?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 3,
		title: "Waveform",
		description: "Join Michelle Obama in conversation",
		imgUrl:
			"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 4,
		title: "The Tech Talks Daily Podcast",
		description: "This is how the news should sound",
		imgUrl:
			"https://images.unsplash.com/photo-1593697821094-53ed19153f21?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 5,
		title: "GaryVee Audio Experience",
		description: "A long form, in-depth conversation",
		imgUrl:
			"https://images.unsplash.com/photo-1607805074778-eeb1aafe3641?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 6,
		title: "Syntax ",
		description: "Join Michelle Obama in conversation",
		imgUrl:
			"https://images.unsplash.com/photo-1554200876-980213841c94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 7,
		title: "IMPAULSIVE",
		description: "A long form, in-depth conversation",
		imgUrl:
			"https://images.unsplash.com/photo-1501808503570-36559610f95e?q=80&w=1371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		podcastId: 8,
		title: "Ted Tech",
		description: "This is how the news should sound",
		imgUrl:
			"https://images.unsplash.com/photo-1607805074620-5802aee47bdb?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	}
]

export const sortTypes = [
	{
		label: "Date created (newest)",
		value: "createdAt-desc"
	},
	{
		label: "Created Date (oldest)",
		value: "createdAt-asc"
	},
	{
		label: "Podcast Title (A-Z)",
		value: "title-asc"
	},
	{
		label: "Podcast Title (Z-A)",
		value: "title-desc"
	},
	{
		label: "Author (Highest)",
		value: "author-desc"
	},
	{
		label: "Author (Lowest)",
		value: "author-asc"
	}
]
