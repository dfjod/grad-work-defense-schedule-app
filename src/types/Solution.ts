import type Session from '@/types/Session'
import type Person from '@/types/Person'
import type Thesis from '@/types/Thesis'

export default interface Solution {
    id: number | null
    name: string
    score: string
    sessions: Session[]
    persons: Person[]
    theses: Thesis[]
}
