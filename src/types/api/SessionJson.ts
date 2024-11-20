import type ThesisJson from "./ThesisJson"

export default interface SessionJson {
    sessionId: number
    room: string
    startingAt: string
    slotDurationMinutes: number
    thesisList: ThesisJson[]
}
