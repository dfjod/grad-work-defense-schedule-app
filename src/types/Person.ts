import type TimeConstraint from "./TimeConstraint"
import type Indictment from "@/types/Indictment"

export default interface Person {
    id: number
    name: string
    timeConstraints: TimeConstraint[]
    indictments: Indictment[]
}
