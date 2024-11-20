import type PersonJson from "./PersonJson"
import type SessionJson from "./SessionJson"
import type ThesisJson from "./ThesisJson"

export default interface SolutionJson {
    scheduleId: number
    persons: PersonJson[]
    sessions: SessionJson[]
    thesis: ThesisJson[]
    score: string
    properties: object
}
