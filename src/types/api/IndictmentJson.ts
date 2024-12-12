interface ConstraintMatch {
    constraintName: string;
    score: string;
}

export default interface IndictmentJson {
    indictedObjectID: number;
    indictedObjectClass: string;
    score: string;
    matchCount: number;
    constraintMatches: ConstraintMatch[];
}
