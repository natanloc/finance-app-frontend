import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IncomeExpectedCardProps {
	value: number
}

export function ExpectedIncomeCard({ value }: IncomeExpectedCardProps) {
	return (
		<div className="flex items-center justify-center p-2">
			<Card className="gap-0 flex-1">
				<CardHeader>
					<CardTitle className="text-muted-foreground text-xl font-medium">
						Expected Income
					</CardTitle>
				</CardHeader>

				<CardContent>
					<span className="text-2xl">
						{value.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}
					</span>
				</CardContent>
			</Card>
		</div>
	)
}
