import type Thesis from "./Thesis"

export default interface Session {
    id: number
    startDate: string
    slotDuration: number
    room: string
    theses: Thesis[]
}
