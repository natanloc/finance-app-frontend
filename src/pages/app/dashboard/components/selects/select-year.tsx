/** biome-ignore-all lint/style/noNonNullAssertion: . */
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { TransactionsContext } from "@/contexts/transactions-context"
import { useContext } from "react"

interface SelectYearProps {
	value: string | null
	onChange: (value: string) => void
}

export function SelectYear({ value, onChange }: SelectYearProps) {
	const { transactions } = useContext(TransactionsContext)

	const years: string[] = []

	transactions?.forEach((transaction) => {
		const year = new Date(transaction.date!).getFullYear()

		if (!years.includes(String(year))) {
			years.push(String(year))
		}
	})

	years.sort((before, after) => Number(before) - Number(after))

	return (
		<Select value={value || ""} onValueChange={onChange}>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder="Year" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Month</SelectLabel>
					{years.map((year) => (
						<SelectItem key={year} value={year}>
							{year}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
