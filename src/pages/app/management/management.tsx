import { ControlTable } from "./components/control-table"
import { DialogAccount } from "./components/new-account-dialog"

export function Management() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-foreground mb-4">
					Manage your transactions
				</h1>

				<DialogAccount />
			</div>

			<ControlTable />
		</div>
	)
}
