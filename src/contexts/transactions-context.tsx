import { createContext, useState, type ReactNode } from "react"
import type { transactionData } from "@/types/transaction"
import { useQuery } from "@tanstack/react-query"
import {
	listTransactions,
	type TransactionFilters,
} from "@/api/list-transactions"

interface TransactionContextType {
	transactions: transactionData[]
	transactionsFiltered: transactionData[]
	isLoading: boolean
	isLoadingFiltered: boolean
	filters: TransactionFilters | undefined
	setFilters: (filters: TransactionFilters) => void
}

interface TransactionProviderProps {
	children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [filters, setFilters] = useState<TransactionFilters | undefined>(
		undefined,
	)

	const { data: transactions = [], isLoading } = useQuery({
		queryKey: ["transactions", filters],
		queryFn: () => listTransactions(),
	})

	const { data: transactionsFiltered = [], isLoading: isLoadingFiltered } =
		useQuery({
			queryKey: ["transactionsFiltered", filters],
			queryFn: () => listTransactions(filters),
		})

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				transactionsFiltered,
				isLoading,
				isLoadingFiltered,
				filters,
				setFilters,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	)
}
