import { listTransactions } from "@/api/list-transactions"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { transactionData } from "@/types/transaction"
import { useQuery } from "@tanstack/react-query"
import { Edit, X } from "lucide-react"

export function ControlTable() {
	const { data: transactions } = useQuery({
		queryKey: ["transactions"],
		queryFn: listTransactions,
	})

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
						<TableCell>{transaction.type}</TableCell>
						<TableCell>{transaction.status}</TableCell>
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
							<Button variant="outline">
								<Edit />
							</Button>

							<Button variant="outline">
								<X />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
