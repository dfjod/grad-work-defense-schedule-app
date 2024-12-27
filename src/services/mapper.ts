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

import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import moment from 'moment'

const { getPersonById } = usePersonState()
const { findThesisById } = useThesesState()

export default {
    // As solutions are managed locally only the session must be mapped from the API
    mapApiSessions(sessionsApi: SessionApi[]): Session[] {
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
            sessions: mapAppSessions(solution.sessions, solution.solved),
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
            thesis: solution.theses,
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

function mapApiThesisList(thesesApi: ThesisApi[]): number[] {
    const theses: number[] = []

    for (const thesisApi of thesesApi) {
        const thesis = thesisApi.thesisId
        theses.push(thesis)
    }

    return theses
}

function mapAppSessions(sessions: Session[], solved: boolean): SessionApi[] {
    return sessions.map(session => ({
        sessionId: session.id,
        startingAt: session.startDate,
        slotDurationMinutes: session.slotDuration,
        thesisList: solved ? mapAppThesesForSession(session.id, session.theses, session.startDate, session.slotDuration) : [],
        room: session.room,
    }))
}

function mapAppPersons(personIds: number[]): PersonApi[] {
    return personIds.map(personId => {
        const person = getPersonById(personId)
        return {
            personId: person.id,
            name: person.name,
            timeConstraints: mapAppTimeConstraints(person.timeConstraints),
        }
    })
}

function mapAppTimeConstraints(timeConstraints: TimeConstraint[]): TimeConstraintApi[] {
    return timeConstraints.map(timeConstraint => ({
        timeConstraintId: timeConstraint.id,
        from: timeConstraint.from,
        to: timeConstraint.to,
    }))
}

function mapAppThesisListForSolving(theses: number[]): ThesisApi[] {
    return theses.map(thesisId => {
        const thesis = findThesisById(thesisId)
        return {
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
        }
    })
}

function mapAppThesesForSession(
    sessionId: number,
    thesesSequence: number[],
    sessionStartDate: string,
    slotDuration: number,
): ThesisApi[] {
    return thesesSequence.map((thesisId, index) => {
        const thesis = findThesisById(thesisId)
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
