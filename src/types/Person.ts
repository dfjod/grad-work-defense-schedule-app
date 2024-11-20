import type TimeConstraint from "./TimeConstraint"

export default interface Person {
    id: number
    name: string
    timeConstraints: TimeConstraint[]
}
