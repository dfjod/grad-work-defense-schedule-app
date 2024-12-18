export interface Solution {
    id: number | null
    solved: boolean
    name: string
    score: string
    sessions: Session[]
    persons: Person[]
    theses: Thesis[]
    indictments: Indictment[]
}

export interface Session {
    id: number
    startDate: string
    slotDuration: number
    room: string
    theses: Thesis[]
}

export interface Person {
    id: number
    name: string
    timeConstraints: TimeConstraint[]
    indictments: Indictment[]
}

export interface TimeConstraint {
    id: number
    from: string
    to: string
}

export interface Thesis {
    id: number
    title: string
    author: number
    supervisor: number
    reviewer: number
    indictments: Indictment[]
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
