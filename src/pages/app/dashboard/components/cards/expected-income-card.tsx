import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExpectedIncomeCard() {
	return (
		<div className="flex items-center justify-center p-2">
			<Card className="gap-0 flex-1">
				<CardHeader>
					<CardTitle className="text-muted-foreground text-xl font-medium">
						Expected Income
					</CardTitle>
				</CardHeader>

				<CardContent>
					<span className="text-2xl">R$ 3.000,00</span>
				</CardContent>
			</Card>
		</div>
	)
}
