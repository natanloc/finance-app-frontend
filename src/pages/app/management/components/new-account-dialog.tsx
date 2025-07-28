import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { DatePickerModalNewAccount } from "./new-account-date-picker"

export function DialogAccount() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="secondary">
						<Plus />
						New Account
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>New Account</DialogTitle>
						<DialogDescription>
							Add a new account to your management table.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name">Account name</Label>
							<Input id="name" name="name" />
						</div>

						<div className="flex gap-4">
							<div className="grid gap-3">
								<Label htmlFor="price">Price</Label>
								<Input id="price" name="price" />
							</div>

							<div className="grid gap-3">
								<Label htmlFor="date">Date</Label>
								<DatePickerModalNewAccount />
							</div>
						</div>

						<div className="flex gap-4">
							<div className="grid gap-3">
								<Label htmlFor="type">Type</Label>
								<Select name="type">
									<SelectTrigger className="w-[114px]">
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="income">Income</SelectItem>
										<SelectItem value="outcome">Outcome</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="frequency">Frequency</Label>
								<Select name="frequency">
									<SelectTrigger className="w-[114px]">
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="variable">Variable</SelectItem>
										<SelectItem value="Fixed">Fixed</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="status">Status</Label>
								<Select name="status">
									<SelectTrigger className="w-[114px]">
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="pendent">Pendent</SelectItem>
										<SelectItem value="paid">Paid</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}
