import type { Solution, Person } from "@/types/app"

export function saveSolution(solution: Solution): void {
    try {
        const key = `solution:${solution.id}`
        localStorage.setItem(key, JSON.stringify(solution))
    } catch (error) {
        console.error('Error saving solution:', error)
    }
}

export function savePerson(persons: Person[]): void {
    try {
        const key = `persons`
        localStorage.setItem(key, JSON.stringify(persons))
    } catch (error) {
        console.error('Error saving persons:', error)
    }
}
