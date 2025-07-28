import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./pages/_layouts/app"
import { Dashboard } from "./pages/app/dashboard/dashboard"
import { Management } from "./pages/app/management/management"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ path: "/", element: <Dashboard /> },
			{ path: "/management", element: <Management /> },
		],
	},
])
