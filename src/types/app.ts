export interface Solution {
    id: number | null
    solved: boolean
    changed: boolean
    name: string
    score: string
    sessions: Session[]
    persons: number[]
    theses: number[] | null
    indictments: Indictment[]
}

export interface Session {
    id: number
    startDate: string
    slotDuration: number
    room: string
    theses: number[]
    thesesPrevious: number[]
}

export interface Person {
    id: number
    isStudent: boolean
    name: string
    timeConstraints: TimeConstraint[]
    thesis?: number
}

export interface TimeConstraint {
    id: number
    from: string
    to: string
}

export interface Thesis {
    id: number
    name: string
    author: number
    supervisor: number
    reviewer: number
}

export interface Indictment {
    id: number
    class: string
    score: string
    matchCount: number
    constraintMatches: ConstraintMatch[]
}
export interface ConstraintMatch {
    name: string
    score: string
}

export interface SolutionElement {
    id: number
    title: string
}
