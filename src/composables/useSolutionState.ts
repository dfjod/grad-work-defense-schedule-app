import { reactive, readonly } from 'vue'
import { type Solution } from '@/types/app'
import {
    mapApiSessions,
    mapApiScore,
    mapAppSolutionForIndictments,
    mapAppSolutionForSolving,
    mapApiIndictments,
} from '@/services/mapper'
import api from '@/services/api'
import type { Indictment as IndictmentApi} from '@/types/api'
import type { Indictment, ConstraintMatch } from '@/types/app'
import useEventsBus from '@/composables/useEventBus'

const solution = reactive<Solution>({
    id: null,
    solved: false,
    changed: false,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    personIndictments: [],
    thesesIndictments: [],
})

export default () => {
    function loadSolution(s: Solution) {
        solution.id = s.id
        solution.solved = s.solved
        solution.name = s.name
        solution.score = s.score
        solution.sessions = s.sessions
        solution.persons = s.persons
        solution.theses = s.theses !== null ?  s.theses : []
    }

    async function loadSolutionApi() {
        if (solution.id === null) {
            console.error('Solution ID is null')
            return
        }

        const fetchedSolution = await api.solution(solution.id)
        const sessions = mapApiSessions(fetchedSolution.sessions)

        solution.sessions = sessions
        solution.score = mapApiScore(fetchedSolution.score)
        solution.solved = true
    }

    async function loadIndictments() {
        if (solution.id === null) {
            console.error('Solution not loaded')
            return
        }

        if (solution.solved === false) {
            console.error('Solution not solved')
            return
        }

        checkAndSetChangedState()

        let fetchIndictments: IndictmentApi[] = []

        if (solution.personIndictments.length === 0 && solution.thesesIndictments.length === 0) {
            console.log('Indictments not loaded, fetching them')
            fetchIndictments = await api.indictments(solution.id)
        }

        if (solution.changed) {
            console.log('Solution has changed, fetching new indictments')
            // Update previousTheses list
            solution.sessions.forEach(session => {
                session.thesesPrevious = session.theses
            })
            fetchIndictments = await api.putandindictments(mapAppSolutionForIndictments(solution))
        }

        if (fetchIndictments.length > 0) {
            const mappedIndictments = mapApiIndictments(fetchIndictments)
            solution.personIndictments = mappedIndictments[0] // At index 0 are person indictments
            solution.thesesIndictments = mappedIndictments[1] // At index 1 are thesis indictments
            useEventsBus().emit('indictments-loaded')
        } else {
            console.log('Solution has not changed, indictments are up to date')
        }
    }

    async function solveSolution() {
        if (solution.id !== null) {
            const requestObj = mapAppSolutionForSolving(solution)
            await api.solve(requestObj)
        } else {
            console.error('Solution not loaded')
        }
    }

    function printSolvePayload() {
        console.log(mapAppSolutionForIndictments(solution))
    }

    const solutionLoaded = () => solution.id !== null

    function serializeSolution(): string {
        return JSON.stringify(solution)
    }

    function exportSolution() {
        if (!solutionLoaded()) {
            console.error('Solution not loaded')
            return
        }

        const fileData = serializeSolution()
        const blob = new Blob([fileData], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `${solution.name}.json`
        link.href = url
        link.click()
    }

    function changeName(newName: string) {
        solution.name = newName
    }

    function printSolution() {
        console.log(solution)
    }

    function checkAndSetChangedState(): void{
        let changed = false;

        for (const session of solution.sessions) {
            const theses = session.theses.toString()
            const thesesPrevious = session.thesesPrevious.toString()
            if (theses !== thesesPrevious) {
                changed = true
                break
            }
        }

        solution.changed = changed
    }

    function getObjectIndictments(objectId: number, objectType: 'person' | 'thesis'): Indictment[] {
        if (objectType === 'person') {
            return solution.personIndictments.filter(indictment => indictment.id === objectId && indictment.class === 'Person')
        } else {
            return solution.thesesIndictments.filter(indictment => indictment.id === objectId && indictment.class === 'Thesis')
        }
    }

    function getObjectConstraints(objectId: number, objectType: 'person' | 'thesis'): ConstraintMatch[] {
        const indictments = getObjectIndictments(objectId, objectType)
        const constraints = indictments.map(indictment => indictment.constraintMatches)
        return constraints.flat()
    }

    function getTypeOfConstraints(type: 'hard' | 'medium' | 'soft', constraints: ConstraintMatch[]): ConstraintMatch[] {
        switch (type) {
            case 'hard':
                return constraints.filter(constraint => constraint.score.hard < 0)
            case 'medium':
                return constraints.filter(constraint => constraint.score.medium < 0)
            case 'soft':
                return constraints.filter(constraint => constraint.score.soft < 0)
            default:
                return []
        }
    }

    function getSessionWithId(sessionId: number) {
        return solution.sessions.find(session => session.id === sessionId)
    }

    return {
        solution: readonly(solution),
        loadSolution,
        loadSolutionApi,
        loadIndictments,
        solutionLoaded,
        exportSolution,
        changeName,
        solveSolution,
        printSolution,
        printSolvePayload,
        getObjectConstraints,
        getTypeOfConstraints,
        getSessionWithId
    }
}
