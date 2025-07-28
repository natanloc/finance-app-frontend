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

export const description = "A donut chart with text"

const chartData = [
	{ browser: "income", amount: 275, fill: "var(--color-income)" },
	{ browser: "outcome", amount: 200, fill: "var(--color-outcome)" },
]

const chartConfig = {
	amount: {
		label: "Amount",
	},
	income: {
		label: "Income",
		color: "var(--chart-1)",
	},
	outcome: {
		label: "Outcome",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig

export function ChartPieDonutText() {
	const totalAmount = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.amount, 0)
	}, [])

	return (
		<Card className="flex flex-col col-span-2">
			<CardHeader className="items-center pb-0">
				<div className="flex items-center justify-between">
					<CardTitle>Transactions compared</CardTitle>

					<div className="flex gap-4 items-center">
						<div className="flex gap-2 items-center">
							<ArrowUp className="w-4 h-4 text-emerald-600" />
							R$ 1923,00
						</div>

						<div className="flex gap-2 items-center">
							<ArrowDown className="w-4 h-4 text-rose-600" />
							R$ 852,00
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
							nameKey="browser"
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
													className="fill-foreground text-3xl font-bold"
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
