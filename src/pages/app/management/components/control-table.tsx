import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { transactionData } from "@/types/transaction"
import { ArrowDown, ArrowUp } from "lucide-react"
import { DialogEditAccount } from "./edit-account-dialog"
import { useContext } from "react"
import { TransactionsContext } from "@/contexts/transactions-context"
import { DeleteTransactionConfirmation } from "./delete-transaction-dialog"

export function ControlTable() {
	const { transactions } = useContext(TransactionsContext)

	return (
		<Table>
			<TableHeader className="bg-accent/60">
				<TableHead className="font-bold text-muted-foreground">
					Account
				</TableHead>
				<TableHead className="font-bold text-muted-foreground">Price</TableHead>
				<TableHead className="font-bold text-muted-foreground">Type</TableHead>
				<TableHead className="font-bold text-muted-foreground">
					Status
				</TableHead>
				<TableHead className="font-bold text-muted-foreground">
					Frequency
				</TableHead>
				<TableHead className="font-bold text-muted-foreground">Date</TableHead>
				<TableHead className="font-bold text-muted-foreground">
					Validity
				</TableHead>
				<TableHead className="w-[20px]"></TableHead>
			</TableHeader>

			<TableBody>
				{transactions?.map((transaction: transactionData) => (
					<TableRow key={transaction.id}>
						<TableCell>{transaction.name}</TableCell>
						<TableCell>
							{Number(transaction.price).toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
								{transaction.type === "Income" ? (
									<ArrowUp className="text-emerald-600 w-3 h-3" />
								) : (
									<ArrowDown className="text-rose-600 w-3 h-3" />
								)}
								{transaction.type}
							</div>
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
								<span
									className={
										transaction.status === "Paid"
											? "rounded-full w-2 h-2 bg-emerald-600 inline-block"
											: "rounded-full w-2 h-2 bg-rose-600 inline-block"
									}
								></span>
								{transaction.status}
							</div>
						</TableCell>
						<TableCell>{transaction.frequency}</TableCell>
						<TableCell>
							{transaction.date
								? new Date(transaction.date).toLocaleDateString("pt-BR")
								: undefined}
						</TableCell>
						<TableCell>
							{transaction.validity != null
								? new Date(transaction.validity).toLocaleDateString("pt-BR")
								: "-"}
						</TableCell>
						<TableCell className="flex gap-2">
							<DialogEditAccount
								id={transaction.id}
								name={transaction.name}
								price={transaction.price}
								status={transaction.status}
								type={transaction.type}
								frequency={transaction.frequency}
								date={transaction.date}
								validity={transaction.validity}
							/>

							{transaction.id && (
								<DeleteTransactionConfirmation id={transaction.id} />
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
