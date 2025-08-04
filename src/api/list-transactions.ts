import { api } from "@/lib/axios"

export interface TransactionFilters {
	month?: number
	year?: number
	startDate?: string
	endDate?: string
	type?: "Income" | "Outcome"
	frequency?: "Fixed" | "Variable"
	status?: "Paid" | "Pending"
	minPrice?: number
	maxPrice?: number
	name?: string
}

export async function listTransactions(filters?: TransactionFilters) {
	const params = new URLSearchParams()

	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== "") {
				params.append(key, String(value))
			}
		})
	}

	const url = params.toString()
		? `/transactions?${params.toString()}`
		: "/transactions"

	const response = await api.get(url)

	return response.data.transactions
}
