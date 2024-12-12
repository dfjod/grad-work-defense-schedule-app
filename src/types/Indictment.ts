interface ConstraintMatch {
    name: string
    score: string
}

export default interface Indictment {
    id: number
    class: string
    score: string
    matchCount: number
    constraintMatches: ConstraintMatch[]
}
