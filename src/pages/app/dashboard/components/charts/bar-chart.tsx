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

export const description = "An interactive bar chart"

const chartData = [
	{ date: "2024-04-01", income: 222, outcome: 150 },
	{ date: "2024-04-02", income: 97, outcome: 180 },
	{ date: "2024-04-03", income: 167, outcome: 120 },
	{ date: "2024-04-04", income: 242, outcome: 260 },
	{ date: "2024-04-05", income: 373, outcome: 290 },
	{ date: "2024-04-06", income: 301, outcome: 340 },
	{ date: "2024-04-07", income: 245, outcome: 180 },
	{ date: "2024-04-08", income: 409, outcome: 320 },
	{ date: "2024-04-09", income: 59, outcome: 110 },
	{ date: "2024-04-10", income: 261, outcome: 190 },
	{ date: "2024-04-11", income: 327, outcome: 350 },
	{ date: "2024-04-12", income: 292, outcome: 210 },
	{ date: "2024-04-13", income: 342, outcome: 380 },
	{ date: "2024-04-14", income: 137, outcome: 220 },
	{ date: "2024-04-15", income: 120, outcome: 170 },
	{ date: "2024-04-16", income: 138, outcome: 190 },
	{ date: "2024-04-17", income: 446, outcome: 360 },
	{ date: "2024-04-18", income: 364, outcome: 410 },
	{ date: "2024-04-19", income: 243, outcome: 180 },
	{ date: "2024-04-20", income: 89, outcome: 150 },
	{ date: "2024-04-21", income: 137, outcome: 200 },
	{ date: "2024-04-22", income: 224, outcome: 170 },
	{ date: "2024-04-23", income: 138, outcome: 230 },
	{ date: "2024-04-24", income: 387, outcome: 290 },
	{ date: "2024-04-25", income: 215, outcome: 250 },
	{ date: "2024-04-26", income: 75, outcome: 130 },
	{ date: "2024-04-27", income: 383, outcome: 420 },
	{ date: "2024-04-28", income: 122, outcome: 180 },
	{ date: "2024-04-29", income: 315, outcome: 240 },
	{ date: "2024-04-30", income: 454, outcome: 380 },
]

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
		color: "var(--chart-1)",
	},
} satisfies ChartConfig

export function ChartBarInteractive() {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>("income")

	const total = React.useMemo(
		() => ({
			income: chartData.reduce((acc, curr) => acc + curr.income, 0),
			outcome: chartData.reduce((acc, curr) => acc + curr.outcome, 0),
		}),
		[],
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
								<span className="text-lg text-foreground leading-none font-bold sm:text-3xl">
									{total[key as keyof typeof total].toLocaleString()}
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
								return date.toLocaleDateString("en-US", {
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
										return new Date(value).toLocaleDateString("en-US", {
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
