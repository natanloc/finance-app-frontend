import "./index.css"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { App } from "./app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// biome-ignore lint/style/noNonNullAssertion: react mandatory
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
)
