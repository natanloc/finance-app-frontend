export interface transactionData {
	id?: string
	name: string
	price: number
	type: "Income" | "Outcome"
	status: "Paid" | "Pending"
	frequency: "Fixed" | "Variable"
	date?: Date
	validity?: Date | null
}
