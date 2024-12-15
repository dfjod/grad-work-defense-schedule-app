import {
    type Person as PersonApi,
    type Session as SessionApi,
    type SolutionResponse,
    type Thesis as ThesisApi,
    type TimeConstraint as TimeConstraintApi,
} from '@/types/api'

import {
    type Person,
    type Session,
    type Solution,
    type Thesis,
    type TimeConstraint,
} from '@/types/app'

export default {
    mapApiSolution(fetchedSolution: SolutionResponse): Solution {
        const solution: Solution = {
            id: fetchedSolution.scheduleId,
            // Temporary naming solution
            name: `Solution ${fetchedSolution.scheduleId}`,
            sessions: mapApiSessions(fetchedSolution.sessions),
            persons: mapApiPersons(fetchedSolution.persons),
            score: fetchedSolution.score,
            theses: mapApiThesisList(fetchedSolution.thesis),
        }

        return solution
    },
}

function mapApiSessions(sessionsApi: SessionApi[]): Session[] {
    const sessions: Session[] = []

    for (const sessionApi of sessionsApi) {
        const session: Session = {
            id: sessionApi.sessionId,
            startDate: sessionApi.startingAt,
            slotDuration: sessionApi.slotDurationMinutes,
            theses: mapApiThesisList(sessionApi.thesisList),
            room: sessionApi.room,
        }
        sessions.push(session)
    }

    return sessions
}

function mapApiPersons(personsApi: PersonApi[]): Person[] {
    const persons: Person[] = []

    for (const personApi of personsApi) {
        const person: Person = {
            id: personApi.personId,
            name: personApi.name,
            timeConstraints: mapApiTimeConstraints(personApi.timeConstraints),
            indictments: [],
        }
        persons.push(person)
    }

    return persons
}

function mapApiTimeConstraints(timeConstraintsApi: TimeConstraintApi[]): TimeConstraint[] {
    const timeConstraints: TimeConstraint[] = []

    for (const timeConstraintApi of timeConstraintsApi) {
        const timeConstraint: TimeConstraint = {
            id: timeConstraintApi.timeConstraintId,
            from: timeConstraintApi.from,
            to: timeConstraintApi.to,
        }

        timeConstraints.push(timeConstraint)
    }

    return timeConstraints
}

function mapApiThesisList(thesesApi: ThesisApi[]): Thesis[] {
    const theses: Thesis[] = []

    for (const thesisApi of thesesApi) {
        const thesis: Thesis = {
            id: thesisApi.thesisId,
            title: thesisApi.title,
            author: thesisApi.author,
            supervisor: thesisApi.supervisor,
            reviewer: thesisApi.reviewer,
            indictments: [],
        }

        theses.push(thesis)
    }

    return theses
}
