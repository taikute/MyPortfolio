import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			manifest: {
				name: "My PWA App",
				short_name: "PWA App",
				description: "A Progressive Web App example",
				start_url: "/",
				scope: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#0078D7",
				icons: [
					{
						src: "/web-app-manifest-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/web-app-manifest-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				screenshots: [
					{
						src: "/web-app-manifest-512x512.png",
						sizes: "1280x800",
						type: "image/png",
						form_factor: "wide",
					},
					{
						src: "/web-app-manifest-512x512.png",
						sizes: "750x1334",
						type: "image/png",
					},
				],
			},
			registerType: "autoUpdate", // Tự động cập nhật PWA khi có bản mới
			devOptions: {
				enabled: true, // Cho phép chạy PWA trong môi trường dev
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
