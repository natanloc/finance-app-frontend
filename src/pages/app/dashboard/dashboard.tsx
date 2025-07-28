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

export function Dashboard() {
	return (
		<div className="flex flex-col gap-3 py-8 px-4">
			<div className="flex gap-4 px-3">
				<SelectMonth />
				<SelectYear />
				<Button>
					<Search />
					Search
				</Button>
			</div>

			<div className="grid grid-cols-4">
				<IncomeCard />
				<OutcomeCard />
				<ExpectedIncomeCard />
				<ExpectedOutcomeCard />
			</div>

			<div className="grid grid-cols-4 gap-4 p-2">
				<ChartPieDonutText />
				<ChartBarInteractive />
			</div>
		</div>
	)
}
