import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OutcomeExpectedCardProps {
	value: number
}

export function ExpectedOutcomeCard({ value }: OutcomeExpectedCardProps) {
	return (
		<div className="flex items-center justify-center p-2">
			<Card className="gap-0 flex-1">
				<CardHeader>
					<CardTitle className="text-muted-foreground text-xl font-medium">
						Expected Outcome
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
