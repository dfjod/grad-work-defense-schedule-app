export interface SolutionRequest {
    scheduleId: number
    persons: Person[]
    sessions: Session[]
    thesis: Thesis[]
    score: Score
    properties: Properties
}

interface Score {
    feasible: boolean
    solutionInitialized: boolean
    zero: boolean
}

interface Properties {
    sessionSize: number
}

export interface SolutionResponse {
    scheduleId: number | null
    persons: Person[]
    sessions: Session[]
    thesis: Thesis[]
    score: string
    properties: object
}

export interface Person {
    personId: number
    name: string
    timeConstraints: TimeConstraint[]
}

export interface TimeConstraint {
    timeConstraintId: number
    from: string
    to: string
}

export interface Session {
    sessionId: number
    room: string
    startingAt: string
    slotDurationMinutes: number
    thesisList: Thesis[]
}

export interface Thesis {
    thesisId: number
    title: string
    author: number
    supervisor: number
    reviewer: number
    session: number
    previous: number
    next: number
    startsAt: string
    cascadeStartsAt: string
}

export interface Indictment {
    indictedObjectID: number
    indictedObjectClass: string
    score: string
    matchCount: number
    constraintMatches: ConstraintMatch[]
}

interface ConstraintMatch {
    constraintName: string
    score: string
}
