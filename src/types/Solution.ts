import type Session from './Session'
import type Person from './Person'

export default interface Solution {
    id: number
    name: string
    score: string
    sessions: Session[]
    persons: Person[]
}
