import { api } from "@/lib/axios"

export async function listTransactions() {
	const response = await api.get("/transactions")

	return response.data.transactions
}
