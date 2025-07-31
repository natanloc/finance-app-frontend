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
import { DatePickerDialogNewTransaction } from "./new-account-date-picker"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTransaction } from "@/api/create-transaction"

const newTransactionFormSchema = z.object({
	name: z.string().min(1, "Required field"),
	price: z.coerce.number(),
	date: z.date(),
	type: z.enum(["Income", "Outcome"]),
	frequency: z.enum(["Fixed", "Variable"]),
	status: z.enum(["Paid", "Pending"]),
	validity: z.date().nullable().optional(),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function DialogAccount() {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<newTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			name: "",
			price: 0,
			date: new Date(),
			type: "Outcome",
			frequency: "Variable",
			status: "Paid",
			validity: null,
		},
	})

	async function handleCreateTransaction(data: newTransactionFormInputs) {
		const { name, price, date, frequency, status, type, validity } = data

		await createTransaction({
			name,
			price,
			date,
			frequency,
			status,
			type,
			validity: validity ?? null,
		})
		reset()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Plus />
					New Account
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(handleCreateTransaction)}>
					<DialogHeader>
						<DialogTitle>New Account</DialogTitle>
						<DialogDescription>
							Add a new account to your management table.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name">Account name</Label>
							<Input id="name" {...register("name")} />
						</div>

						<div className="flex gap-4">
							<div className="grid gap-3">
								<Label htmlFor="price">Price</Label>
								<Input id="price" type="number" {...register("price")} />
							</div>

							<div className="grid gap-3">
								<Label htmlFor="date">Date</Label>
								<Controller
									name="date"
									control={control}
									render={({ field }) => (
										<DatePickerDialogNewTransaction
											value={field.value || new Date()}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="date">Validity</Label>
								<Controller
									name="validity"
									control={control}
									render={({ field }) => (
										<DatePickerDialogNewTransaction
											value={field.value || null}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="grid gap-3">
								<Label htmlFor="type">Type</Label>
								<Controller
									name="type"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-[114px]">
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="Income">Income</SelectItem>
												<SelectItem value="Outcome">Outcome</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="frequency">Frequency</Label>
								<Controller
									name="frequency"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-[114px]">
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="Variable">Variable</SelectItem>
												<SelectItem value="Fixed">Fixed</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="status">Status</Label>
								<Controller
									name="status"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-[114px]">
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="Pending">Pending</SelectItem>
												<SelectItem value="Paid">Paid</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={isSubmitting}>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
