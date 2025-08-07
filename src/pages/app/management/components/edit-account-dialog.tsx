/** biome-ignore-all lint/style/noNonNullAssertion: . */
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
import { Edit } from "lucide-react"
import { DatePickerDialogNewTransaction } from "./new-account-date-picker"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { transactionData } from "@/types/transaction"
import { updateTransaction } from "@/api/update-transaction"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

export function DialogEditAccount({
	id,
	name,
	price,
	date,
	type,
	status,
	frequency,
	validity,
}: transactionData) {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<newTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			name: name,
			price: price,
			status: status,
			type: type,
			frequency: frequency,
			date: new Date(date),
			validity: validity ? new Date(validity) : validity,
		},
	})

	const queryClient = useQueryClient()

	const { mutateAsync: updateTransactionMutation } = useMutation({
		mutationFn: handleEditTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] })
		},
	})

	async function handleEditTransaction(data: newTransactionFormInputs) {
		const { name, price, date, frequency, status, type, validity } = data

		console.log(id)
		await updateTransaction(id!, {
			name,
			price,
			date,
			frequency,
			status,
			type,
			validity: validity ?? null,
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Edit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(updateTransactionMutation)}>
					<DialogHeader>
						<DialogTitle>Editing Account</DialogTitle>
						<DialogDescription>
							Edit your account to fix or add new informations.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 mt-4">
						<div className="grid gap-3">
							<Label htmlFor="name">Account name</Label>
							<Input id="name" {...register("name")} required />
						</div>

						<div className="flex gap-4">
							<div className="grid gap-3">
								<Label htmlFor="price">Price</Label>
								<Input
									id="price"
									type="number"
									{...register("price")}
									required
								/>
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
					<DialogFooter className="mt-8">
						<DialogClose>
							<Button variant="outline" className="mr-2">
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								Save
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
