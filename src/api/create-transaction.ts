import { api } from "@/lib/axios"
import type { transactionData } from "@/types/transaction"

export async function createTransaction(data: transactionData) {
	await api.post("/transactions", data)
}
