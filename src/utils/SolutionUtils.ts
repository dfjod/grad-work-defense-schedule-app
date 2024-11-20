import type SolutionJson from "@/types/api/SolutionJson";
import type Solution from "@/types/Solution";
import type Person from "@/types/Person";
import type Session from "@/types/Session";
import type TimeConstraintJson from "@/types/api/TimeConstraintJson";
import type TimeConstraint from "@/types/TimeConstraint";
import type ThesisJson from "@/types/api/ThesisJson";
import type Thesis from "@/types/Thesis";
import type SessionJson from "@/types/api/SessionJson";
import type PersonJson from "@/types/api/PersonJson";

export function transformSolution(fetchedSolution: SolutionJson): Solution {
    const solution: Solution = {
        id: fetchedSolution.scheduleId,
        // Temporary naming solution
        name: `Solution ${fetchedSolution.scheduleId}`,
        sessions: transformSessions(fetchedSolution.sessions),
        persons: transformPersons(fetchedSolution.persons),
        score: fetchedSolution.score
    }

    return solution
}

function transformSessions(sessionsJson: SessionJson[]): Session[] {
    const sessions: Session[] = []

    for (const sessionJson of sessionsJson) {
        const session: Session = {
            id: sessionJson.sessionId,
            startDate: sessionJson.startingAt,
            slotDuration: sessionJson.slotDurationMinutes,
            theses: transformThesisList(sessionJson.thesisList),
            room: sessionJson.room
        }
        sessions.push(session)
    }

    return sessions
}

function transformPersons(personsJson: PersonJson[]): Person[] {
    const persons: Person[] = []

    for (const personJson of personsJson) {
        const person: Person = {
            id: personJson.personId,
            name: personJson.name,
            timeConstraints: transformTimeConstraints(personJson.timeConstraints)
        }
        persons.push(person)
    }

    return persons
}

function transformTimeConstraints(timeConstraintsJson: TimeConstraintJson[]): TimeConstraint[] {
    const timeConstraints: TimeConstraint[] = []

    for (const timeConstraintJson of timeConstraintsJson) {
        const timeConstraint: TimeConstraint = {
            id: timeConstraintJson.timeConstraintId,
            from: timeConstraintJson.from,
            to: timeConstraintJson.to
        }

        timeConstraints.push(timeConstraint)
    }

    return timeConstraints
}

function transformThesisList(thesesJson: ThesisJson[]): Thesis[] {
    const theses: Thesis[] = []

    for (const thesisJson of thesesJson) {
        const thesis: Thesis = {
            id: thesisJson.thesisId,
            title: thesisJson.title,
            author: thesisJson.author,
            supervisor: thesisJson.supervisor,
            reviewer: thesisJson.reviewer,
        }

        theses.push(thesis)
    }

    return theses
}
