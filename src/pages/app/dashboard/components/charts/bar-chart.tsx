/** biome-ignore-all lint/style/noNonNullAssertion: . */
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { TransactionsContext } from "@/contexts/transactions-context"

export const description = "An interactive bar chart"

const chartConfig = {
	views: {
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

export function ChartBarInteractive() {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>("income")

	const { transactionsFiltered } = React.useContext(TransactionsContext)

	const chartData = React.useMemo(() => {
		const data: Record<string, { income: number; outcome: number }> = {}

		transactionsFiltered.forEach((transaction) => {
			const dataKey = new Date(transaction.date!).toISOString().split("T")[0]

			if (!data[dataKey]) {
				data[dataKey] = { income: 0, outcome: 0 }
			}

			if (transaction.type === "Income") {
				data[dataKey].income += Number(transaction.price)
			} else {
				data[dataKey].outcome += Number(transaction.price)
			}
		})

		return Object.entries(data)
			.map(([date, values]) => ({
				date,
				income: values.income,
				outcome: values.outcome,
			}))
			.sort(
				(before, after) =>
					new Date(before.date).getTime() - new Date(after.date).getTime(),
			)
	}, [transactionsFiltered])

	const total = React.useMemo(
		() => ({
			income: chartData.reduce((acc, curr) => acc + curr.income, 0),
			outcome: chartData.reduce((acc, curr) => acc + curr.outcome, 0),
		}),
		[chartData],
	)

	return (
		<Card className="py-0 col-span-2 mt-0">
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
					<CardTitle>Transactions</CardTitle>
					<CardDescription>
						All transactions done during the selected period.
					</CardDescription>
				</div>
				<div className="flex">
					{["income", "outcome"].map((key) => {
						const chart = key as keyof typeof chartConfig
						return (
							<Button
								key={chart}
								data-active={activeChart === chart}
								className="bg-slate-900 data-[active=true]:bg-accent relative h-[80px] z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 hover:bg-accent/50"
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-muted-foreground text-xs">
									{chartConfig[chart].label}
								</span>
								<span className="text-lg text-foreground leading-none font-bold sm:text-xl">
									{total[key as keyof typeof total].toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})}
								</span>
							</Button>
						)
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value)
								return date.toLocaleDateString("pt-BR", {
									month: "short",
									day: "numeric",
								})
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("pt-BR", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})
									}}
								/>
							}
						/>
						<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
