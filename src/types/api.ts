export interface SolutionApi {
    scheduleId: number | null
    persons: PersonApi[]
    sessions: SessionApi[]
    thesis: ThesisApi[]
    score: string | null
    properties: PropertiesApi
}

interface PropertiesApi {
    sessionSize: number
}

export interface PersonApi {
    personId: number
    name: string
    timeConstraints: TimeConstraintApi[]
}

export interface TimeConstraintApi {
    timeConstraintId: number
    from: string
    to: string
}

export interface SessionApi {
    sessionId: number
    room: string
    startingAt: string
    slotDurationMinutes: number
    thesisList: ThesisApi[]
}

export interface ThesisApi {
    thesisId: number
    title: string
    author: number
    supervisor: number
    reviewer: number
    session: number | null
    previous: number | null
    next: number | null
    startsAt: string | null
    cascadeStartsAt: string | null
}

export interface IndictmentApi {
    indictedObjectID: number
    indictedObjectClass: string
    score: string
    matchCount: number
    constraintMatches: ConstraintMatchApi[]
}

export interface ConstraintMatchApi {
    constraintName: string
    score: string
}
