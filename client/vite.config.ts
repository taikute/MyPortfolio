import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: "prompt",
			manifest: {
				name: "My Vue PWA Game",
				short_name: "Game",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#42b983",
				icons: [
					{
						src: "/pwa-icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/pwa-icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
