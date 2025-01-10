import type { IndictmentApi, SolutionApi } from "@/types/api"
import axios from "axios"
import type { AxiosError } from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
})

export default {
    async solve(data: SolutionApi) {
        try {
            console.log("solve data",data)
            const requestJson = JSON.stringify(data)
            const response = await apiClient.post('/defsched/solve', requestJson)
            return response.status
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                console.error("API Error: ", axiosError)
            } else {
                console.error(error)
            }
            return null
        }
    },

    async solution(id: number) {
        try {
            const response = await apiClient.get<SolutionApi>(`/defsched/solution?id=${id}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                console.error("API Error: ", axiosError)
            } else {
                console.error(error)
            }
            return {}
        }
    },

    async indictments(id: number) {
        try {
            const response = await apiClient.get<IndictmentApi[]>(`/defsched/indictments?id=${id}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                console.error("API Error: ", axiosError)
            } else {
                console.error(error)
            }
            return []
        }
    },

    async putandindictments(data: SolutionApi) {
        try {
            const requestJson = JSON.stringify(data)
            const response = await apiClient.post('/defsched/putandindictments', requestJson)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError
                console.error("API Error: ", axiosError)
            } else {
                console.error(error)
            }
            return []
        }
    }
}
