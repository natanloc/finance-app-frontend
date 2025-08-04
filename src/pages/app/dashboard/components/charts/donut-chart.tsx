"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { ArrowDown, ArrowUp } from "lucide-react"
import { TransactionsContext } from "@/contexts/transactions-context"
import { useContext } from "react"

export const description = "A donut chart with text"

const chartConfig = {
	amount: {
		label: "Amount",
	},
	income: {
		label: "Income",
		color: "var(--chart-2)",
	},
	outcome: {
		label: "Outcome",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig

export function ChartPieDonutText() {
	const { transactionsFiltered, isLoading } = useContext(TransactionsContext)

	const { income, outcome } = React.useMemo(() => {
		if (!transactionsFiltered?.length) return { income: 0, outcome: 0 }

		return transactionsFiltered.reduce(
			(acc, curr) => {
				if (curr.type === "Income" && curr.frequency === "Variable")
					acc.income += Number(curr.price)
				if (curr.type === "Outcome" && curr.frequency === "Variable")
					acc.outcome += Number(curr.price)
				return acc
			},
			{ income: 0, outcome: 0 },
		)
	}, [transactionsFiltered])

	if (isLoading) {
		return <h2>Loading Chart</h2>
	}

	if (!transactionsFiltered.length) {
		return <h2>Not enough transactions</h2>
	}

	const totalAmount = Number(income) - Number(outcome)

	const chartData = [
		{
			transaction: "Total amount",
			amount: totalAmount > 0 ? totalAmount : 0,
			fill: "var(--color-income)",
		},
		{ transaction: "outcome", amount: outcome, fill: "var(--color-outcome)" },
	]

	return (
		<Card className="flex flex-col col-span-2">
			<CardHeader className="items-center pb-0">
				<div className="flex items-center justify-between">
					<CardTitle>Total amount</CardTitle>

					<div className="flex gap-4 items-center">
						<div className="flex gap-2 items-center">
							<ArrowUp className="w-4 h-4 text-emerald-600" />
							{income.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</div>

						<div className="flex gap-2 items-center">
							<ArrowDown className="w-4 h-4 text-rose-600" />
							{outcome.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</div>
					</div>
				</div>
				<CardDescription>[Start Date] - [Final Date]</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="amount"
							nameKey="transaction"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-xl font-bold"
												>
													{totalAmount.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Total
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="text-muted-foreground leading-none">
					Showing the total amount for the selected period.
				</div>
			</CardFooter>
		</Card>
	)
}
