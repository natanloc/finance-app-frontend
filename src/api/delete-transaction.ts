import { api } from "@/lib/axios"

export async function deleteTransaction(id: string) {
	console.log(id)
	await api.delete(`/transactions/${id}`)
}
