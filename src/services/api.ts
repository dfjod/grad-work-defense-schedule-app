import type { Indictment, SolutionRequest, SolutionResponse } from "@/types/api"
import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }
})

export default {
    async solve(data: SolutionRequest) {
        const requestJson = JSON.stringify(data)
        console.log(requestJson)
        return apiClient.post('/defsched/solve', requestJson).then((response) => console.log(response))
    },

    async solution(id: number): Promise<SolutionResponse> {
        try {
            const response = await apiClient.get<SolutionResponse>(`/defsched/solution?id=${id}`)
            return response.data
        } catch (error) {
            console.error(error)
            return {
                scheduleId: null,
                persons: [],
                sessions: [],
                thesis: [],
                score: "",
                properties: {}
            }
        }
    },

    async indictments(id: number): Promise<Indictment[]> {
        try {
            const response = await apiClient.get<Indictment[]>(`/defsched/indictments?id=${id}`)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}
