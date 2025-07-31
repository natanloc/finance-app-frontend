import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "@/api/delete-transaction"

interface DeleteTransactionConfirmationProps {
	id: string
}

export function DeleteTransactionConfirmation({
	id,
}: DeleteTransactionConfirmationProps) {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteTransactionMutation } = useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] })
		},
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Trash2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<h2 className="text-2xl font-bold">Exclusion confirmation</h2>
				</DialogHeader>

				<p>Are you sure you want to delete that transaction?</p>

				<DialogFooter>
					<DialogClose className="flex items-center gap-3">
						<Button variant="outline">Cancel</Button>

						{/** biome-ignore lint/style/noNonNullAssertion: there'll be the id */}
						<Button onClick={() => deleteTransactionMutation(id!)}>
							Confirm
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
