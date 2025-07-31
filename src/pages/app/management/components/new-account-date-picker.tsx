"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface datePickerProps {
	value?: Date | null
	onChange: (date?: Date | null) => void
}

export function DatePickerDialogNewTransaction({
	value,
	onChange,
}: datePickerProps) {
	const [open, setOpen] = React.useState(false)
	// const [date, _setDate] = React.useState<Date | undefined>(undefined)

	return (
		<div className="flex flex-col gap-3">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-32 justify-between font-normal"
					>
						{value ? value.toLocaleDateString("pt-BR") : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={value ?? undefined}
						captionLayout="dropdown"
						onSelect={(date) => {
							onChange(date ?? null)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
