import { DollarSign } from "lucide-react"

export function Header() {
	return (
		<div className="flex items-center py-4 px-8 bg-slate-800 gap-2">
			<DollarSign className="text-foreground w-5 h-5" />
			<h2 className="text-foreground font-bold text-xl">Finance app</h2>
		</div>
	)
}
