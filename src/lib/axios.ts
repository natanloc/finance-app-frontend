import axios from "axios"
// import { env } from "@/env"

export const api = axios.create({
	baseURL: "http://localhost:1234",
})
