import { ChartBarInteractive } from "./components/charts/bar-chart"
import { ChartPieDonutText } from "./components/charts/donut-chart"
import { IncomeCard } from "./components/cards/income-card"
import { SelectMonth } from "./components/selects/select-month"
import { SelectYear } from "./components/selects/select-year"
import { OutcomeCard } from "./components/cards/outcome-card"
import { ExpectedIncomeCard } from "./components/cards/expected-income-card"
import { ExpectedOutcomeCard } from "./components/cards/expected-outcome-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { TransactionsContext } from "@/contexts/transactions-context"

export function Dashboard() {
	const { transactions } = useContext(TransactionsContext)
	const [income, setIncome] = useState<number>(0)
	const [incomeExpected, setIncomeExpected] = useState<number>(0)
	const [outcome, setOutcome] = useState<number>(0)
	const [outcomeExpected, setOutcomeExpected] = useState<number>(0)

	function setData() {
		let income = 0
		let outcome = 0
		let incomeExpected = 0
		let outcomeExpected = 0

		transactions?.map((transaction) => {
			if (transaction.type === "Income") {
				if (transaction.frequency === "Fixed") {
					incomeExpected += Number(transaction.price)
				} else {
					income += Number(transaction.price)
				}
			}

			if (transaction.type === "Outcome") {
				if (transaction.frequency === "Fixed") {
					outcomeExpected += Number(transaction.price)
				} else {
					outcome += Number(transaction.price)
				}
			}
		})

		setIncome(income)
		setOutcome(outcome)
		setIncomeExpected(incomeExpected)
		setOutcomeExpected(outcomeExpected)

		console.log(outcome)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => {
		setData()
		console.log("data set")
	}, [])

	return (
		<div className="flex flex-col gap-3 py-8 px-4">
			<div className="flex gap-4 px-3">
				<SelectMonth />
				<SelectYear />
				<Button onClick={setData}>
					<Search />
					Search
				</Button>
			</div>

			<div className="grid grid-cols-4">
				<IncomeCard value={income} />
				<OutcomeCard value={outcome} />
				<ExpectedIncomeCard value={incomeExpected} />
				<ExpectedOutcomeCard value={outcomeExpected} />
			</div>

			<div className="grid grid-cols-4 gap-4 p-2">
				<ChartPieDonutText />
				<ChartBarInteractive />
			</div>
		</div>
	)
}
