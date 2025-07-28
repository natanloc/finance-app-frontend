import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export function SelectYear() {
	return (
		<Select>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder="Year" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Month</SelectLabel>
					<SelectItem value="2024">2024</SelectItem>
					<SelectItem value="2025">2025</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
