import type TimeConstraintJson from "./TimeConstraintJson"

export default interface PersonJson {
    personId: number
    name: string
    timeConstraints: TimeConstraintJson[]
}
