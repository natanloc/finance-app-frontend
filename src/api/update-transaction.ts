import { api } from "@/lib/axios"
import type { transactionData } from "@/types/transaction"

export async function updateTransaction(id: string, data: transactionData) {
	await api.put(`/transactions/${id}`, data)
}
