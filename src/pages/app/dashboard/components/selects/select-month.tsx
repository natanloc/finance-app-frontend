import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface SelectMonthProps {
	value: string | null
	onChange: (value: string) => void
}

export function SelectMonth({ value, onChange }: SelectMonthProps) {
	return (
		<Select value={value || ""} onValueChange={onChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Month" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Month</SelectLabel>
					<SelectItem value="1">January</SelectItem>
					<SelectItem value="2">February</SelectItem>
					<SelectItem value="3">March</SelectItem>
					<SelectItem value="4">April</SelectItem>
					<SelectItem value="5">May</SelectItem>
					<SelectItem value="6">June</SelectItem>
					<SelectItem value="7">July</SelectItem>
					<SelectItem value="8">August</SelectItem>
					<SelectItem value="9">September</SelectItem>
					<SelectItem value="10">October</SelectItem>
					<SelectItem value="11">November</SelectItem>
					<SelectItem value="12">December</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
