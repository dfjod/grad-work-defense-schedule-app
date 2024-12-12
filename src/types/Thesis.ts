import type Indictment from "@/types/Indictment"

export default interface Thesis {
    id: number
    title: string
    author: number
    supervisor: number
    reviewer: number
    indictments: Indictment[]
}
