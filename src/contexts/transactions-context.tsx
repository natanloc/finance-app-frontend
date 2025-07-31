import { createContext, type ReactNode } from "react"
import type { transactionData } from "@/types/transaction"
import { useQuery } from "@tanstack/react-query"
import { listTransactions } from "@/api/list-transactions"

interface TransactionContextType {
	transactions: transactionData[]
}

interface TransactionProviderProps {
	children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const { data: transactions } = useQuery({
		queryKey: ["transactions"],
		queryFn: listTransactions,
	})

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	)
}
