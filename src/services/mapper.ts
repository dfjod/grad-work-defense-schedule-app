import {
    type ConstraintMatch as ConstraintMatchApi,
    type Indictment as IndictmentApi,
    type Person as PersonApi,
    type Session as SessionApi,
    type SolutionRequest,
    type SolutionResponse,
    type Thesis as ThesisApi,
    type TimeConstraint as TimeConstraintApi,
} from '@/types/api'

import {
    type ConstraintMatch,
    type Indictment,
    type Person,
    type Session,
    type Solution,
    type Thesis,
    type TimeConstraint,
} from '@/types/app'
import moment from 'moment'

export default {
    mapApiSolution(fetchedSolution: SolutionResponse): Solution {
        const solution: Solution = {
            id: fetchedSolution.scheduleId,
            solved: true,
            changed: false,
            // Temporary naming solution
            name: `Solution ${fetchedSolution.scheduleId}`,
            sessions: mapApiSessions(fetchedSolution.sessions),
            persons: mapApiPersons(fetchedSolution.persons),
            score: fetchedSolution.score,
            theses: null,
            indictments: [],
        }

        return solution
    },

    mapApiIndictments(indictmentsApi: IndictmentApi[]): Indictment[] {
        const indictments: Indictment[] = []

        for (const indictmentApi of indictmentsApi) {
            const indictment: Indictment = {
                id: indictmentApi.indictedObjectID,
                class: indictmentApi.indictedObjectClass,
                score: indictmentApi.score,
                matchCount: indictmentApi.matchCount,
                constraintMatches: mapApiConstraintMatches(indictmentApi.constraintMatches),
            }
            indictments.push(indictment)
        }

        return indictments
    },

    mapAppSolutionForSolving(solution: Solution): SolutionRequest {
        return {
            scheduleId: solution.id,
            persons: mapAppPersons(solution.persons),
            sessions: mapAppSessions(solution.sessions, solution.theses, solution.solved),
            thesis: mapAppThesisListForSolving(solution.theses),
            score: solution.score || null,
            properties: {
                sessionSize: 0
            }
        }
    },

    mapAppSolutionForIndictments(solution: Solution): SolutionRequest {
        return {
            scheduleId: solution.id,
            persons: mapAppPersons(solution.persons),
            sessions: mapAppSessions(solution.sessions, solution.theses, solution.solved),
            thesis: mapAppThesisListForIndictments(solution.theses),
            score: solution.score || null,
            properties: {
                sessionSize: 0
            }
        }
    }
}

function mapApiConstraintMatches(constraintMatchesApi: ConstraintMatchApi[]): ConstraintMatch[] {
    const constraintMatches: ConstraintMatch[] = []

    for (const constraintMatchApi of constraintMatchesApi) {
        const constraintMatch: ConstraintMatch = {
            name: constraintMatchApi.constraintName,
            score: constraintMatchApi.score,
        }

        constraintMatches.push(constraintMatch)
    }

    return constraintMatches
}

function mapApiSessions(sessionsApi: SessionApi[]): Session[] {
    const sessions: Session[] = []

    for (const sessionApi of sessionsApi) {
        const session: Session = {
            id: sessionApi.sessionId,
            startDate: sessionApi.startingAt,
            slotDuration: sessionApi.slotDurationMinutes,
            theses: mapApiThesisList(sessionApi.thesisList),
            thesesPrevious: mapApiThesisList(sessionApi.thesisList),
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

function mapApiThesisList(thesesApi: ThesisApi[]): number[] {
    const theses: number[] = []

    for (const thesisApi of thesesApi) {
        const thesis = thesisApi.thesisId
        theses.push(thesis)
    }

    return theses
}



function mapAppSessions(sessions: Session[], theses: Thesis[], solved: boolean): SessionApi[] {
    return sessions.map(session => ({
        sessionId: session.id,
        startingAt: session.startDate,
        slotDurationMinutes: session.slotDuration,
        thesisList: mapAppThesesForSession(session.id, session.theses, theses, solved, session.startDate, session.slotDuration),
        room: session.room,
    }))
}

function mapAppPersons(persons: Person[]): PersonApi[] {
    return persons.map(person => ({
        personId: person.id,
        name: person.name,
        timeConstraints: mapAppTimeConstraints(person.timeConstraints),
    }))
}

function mapAppTimeConstraints(timeConstraints: TimeConstraint[]): TimeConstraintApi[] {
    return timeConstraints.map(timeConstraint => ({
        timeConstraintId: timeConstraint.id,
        from: timeConstraint.from,
        to: timeConstraint.to,
    }))
}

function mapAppThesisListForSolving(theses: Thesis[]): ThesisApi[] {
    return theses.map(thesis => ({
        thesisId: thesis.id,
        title: thesis.name,
        author: thesis.author,
        supervisor: thesis.supervisor,
        reviewer: thesis.reviewer,
        session: null,
        previous: null,
        next: null,
        startsAt: null,
        cascadeStartsAt: null,
    }))
}

function mapAppThesisListForIndictments(theses: Thesis[]): number[] {
    return theses.map(thesis => thesis.id)
}

function mapAppThesesForSession(
    sessionId: number,
    thesesSequence: number[],
    theses: Thesis[],
    solutionSolved: boolean,
    sessionStartDate: string,
    slotDuration: number,
): ThesisApi[] {
    if (!solutionSolved) {
        return []
    }

    return thesesSequence.map((thesisId, index) => {
        const thesis = theses.find((thesis) => thesis.id === thesisId)
        const previous = index === 0 ? null : thesesSequence[index - 1]
        const next = index === thesesSequence.length - 1 ? null : thesesSequence[index + 1]
        const startsAt = index === 0 ? sessionStartDate : moment(sessionStartDate).add(slotDuration * index, 'm').format("YYYY-MM-DDTHH:mm:ss")
        return {
            thesisId: thesis.id,
            title: thesis.name,
            author: thesis.author,
            supervisor: thesis.supervisor,
            reviewer: thesis.reviewer,
            session: sessionId,
            previous: previous,
            next: next,
            startsAt: startsAt,
            cascadeStartsAt: startsAt,
        }
    })
}
