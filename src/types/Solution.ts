import type Session from './Session'
import type Person from './Person'

export default interface Solution {
    id: number | null
    name: string
    score: string | null
    sessions: Session[]
    persons: Person[]
}
