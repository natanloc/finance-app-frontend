import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { TransactionsProvider } from "./contexts/transactions-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TransactionsProvider>
				<RouterProvider router={router} />
			</TransactionsProvider>
		</QueryClientProvider>
	)
}
