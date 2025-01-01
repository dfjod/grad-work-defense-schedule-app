import type {
    ConstraintMatch as ConstraintMatchApi,
    Indictment as IndictmentApi,
    Person as PersonApi,
    Session as SessionApi,
    SolutionRequest,
    SolutionResponse,
    Thesis as ThesisApi,
    TimeConstraint as TimeConstraintApi,
} from '@/types/api'

import type {
    ConstraintMatch,
    Indictment,
    Score,
    Session,
    Solution,
    Thesis,
    ThesisId,
    TimeConstraint,
} from '@/types/app'

import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import moment from 'moment'

const { getPersonById } = usePersonState()
const { findThesisById } = useThesesState()

// As solutions are managed locally only the session must be mapped from the API
export function mapApiSessions(sessionsApi: SessionApi[]): Session[] {
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

export function mapApiIndictments(indictmentsApi: IndictmentApi[]): Indictment[][] {
    const personIndictments: Indictment[] = []
    const thesesIndictments: Indictment[] = []

    for (const indictmentApi of indictmentsApi) {
        const indictment: Indictment = {
            id: indictmentApi.indictedObjectID,
            class: indictmentApi.indictedObjectClass,
            score: indictmentApi.score,
            matchCount: indictmentApi.matchCount,
            constraintMatches: mapApiConstraintMatches(indictmentApi.constraintMatches),
        }

        if (indictmentApi.indictedObjectClass === 'Person') {
            personIndictments.push(indictment)
        } else if (indictmentApi.indictedObjectClass === 'Thesis') {
            thesesIndictments.push(indictment)
        }
    }

    return [
        personIndictments,
        thesesIndictments,
    ]
}

export function mapAppSolutionForSolving(solution: Solution): SolutionRequest {
    return {
        scheduleId: solution.id,
        persons: mapAppPersons(solution.persons),
        sessions: mapAppSessions(solution.sessions, solution.solved),
        thesis: mapAppThesisListForSolving(solution.theses),
        score: solution.score ? mapAppScore(solution.score) : null,
        properties: {
            sessionSize: 0,
        },
    }
}

export function mapAppSolutionForIndictments(solution: Solution): SolutionRequest {
    return {
        scheduleId: solution.id,
        persons: mapAppPersons(solution.persons),
        sessions: mapAppSessions(solution.sessions, solution.theses, solution.solved),
        thesis: solution.theses,
        score: solution.score ? mapAppScore(solution.score) : null,
        properties: {
            sessionSize: 0,
        },
    }
}

export function mapApiScore(scoreApi: string): Score {
    const [hard, medium, soft] = scoreApi.split('/')
    return {
        hard: Number(hard.replace('hard', '')),
        medium: Number(medium.replace('medium', '')),
        soft: Number(soft.replace('soft', '')),
    }
}

function mapApiConstraintMatches(constraintMatchesApi: ConstraintMatchApi[]): ConstraintMatch[] {
    const constraintMatches: ConstraintMatch[] = []

    for (const constraintMatchApi of constraintMatchesApi) {
        const constraintMatch: ConstraintMatch = {
            name: constraintMatchApi.constraintName,
            score: mapApiScore(constraintMatchApi.score)
        }

        constraintMatches.push(constraintMatch)
    }

    return constraintMatches
}

function mapApiThesisList(thesesApi: ThesisApi[]): ThesisId[] {
    const theses = []

    for (const thesisApi of thesesApi) {
        const thesis = thesisApi.thesisId
        theses.push({ id: thesis })
    }

    return theses
}

function mapAppScore(score: Score): string {
    return `${score.hard}hard/${score.medium}medium/${score.soft}soft`
}

function mapAppSessions(sessions: Session[], solved: boolean): SessionApi[] {
    return sessions.map(session => ({
        sessionId: session.id,
        startingAt: timeStringToArray(session.startDate),
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
        from: timeStringToArray(timeConstraint.from),
        to: timeStringToArray(timeConstraint.to),
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
    thesesSequence: ThesisId[],
    sessionStartDate: string,
    slotDuration: number,
): ThesisApi[] {
    return thesesSequence.map((thesisId, index) => {
        const thesis = findThesisById(thesisId.id)
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

function arrayToTimeString(arr: number[]): string {
    const [year, month, day, hour, minute, second = 0] = arr
    return `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

function timeStringToArray(timeString: string): number[] {
    if (typeof timeString !== 'string' || !timeString.includes('T')) {
        throw new Error('Input must be a valid ISO-like time string.')
    }

    const [datePart, timePart] = timeString.split('T')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute, second] = timePart.split(':').map(Number)
    return [year, month, day, hour, minute, second || 0]
}
