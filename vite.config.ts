import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
