// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// routeRules: {
	// 	"/**": {
	// 		ssr: false,
	// 	},
	// 	"/": { static: true },
	// },

	// ssr: false,
	// nitro: {
	// 	static: true,
	// },
	app: {
		head: {
			htmlAttrs: { lang: "es" },
		},
	},

	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxt/content",
		"@nuxt/fonts",
		"nuxt-svgo",
		"@nuxt/icon",
		"@nuxt/image",
		"nuxt-easy-lightbox",
	],
	tailwindcss: {
		cssPath: ["./assets/css/tailwind.css", { injectPosition: "first" }],
		configPath: "./tailwind.config",
		exposeConfig: {
			level: 2,
		},
		config: {},
		viewer: true,
	},
	image: {
		format: ["webp"],
	},
});
