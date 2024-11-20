export default interface ThesisJson {
    thesisId: number
    title: string
    author: number
    supervisor: number
    reviewer: number
    session: number
    previous: number | null
    next: number | null
    startsAt: string
    cascadeStartsAt: string
}
