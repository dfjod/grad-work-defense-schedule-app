import { reactive, ref  } from 'vue'
import type { Solution } from '@/types/app'
import {
    mapApiSessions,
    mapApiScore,
    mapAppSolutionForIndictments,
    mapAppSolutionForSolving,
    mapApiIndictments,
} from '@/services/mapper'
import api from '@/services/api'
import type { IndictmentApi } from '@/types/api'
import type { Indictment, ConstraintMatch } from '@/types/app'
import emitter from '@/services/mitt'
import usePersonState from '@/composables/usePersonState'

const STORAGE_KEY = 'solution'
const COUNTER_KEY = 'solution_counter'

const solution = reactive<Solution>({
    id: null,
    solved: false,
    changed: false,
    name: '',
    score: null,
    sessions: [],
    persons: [],
    theses: [],
    personIndictments: [],
    thesesIndictments: [],
})

const solvingInProgress = ref(false)

export default () => {
    function loadSolution(s: Solution) {
        solution.id = s.id
        solution.solved = s.solved
        solution.name = s.name
        solution.score = s.score
        solution.sessions = s.sessions
        solution.persons = s.persons
        solution.theses = s.theses !== null ?  s.theses : []
        solution.personIndictments = s.personIndictments
        solution.thesesIndictments = s.thesesIndictments
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

        let fetchIndictments: IndictmentApi[] = []

        // Solution has changed, fetch and load new indictments
        if (solution.changed) {
            console.log('Solution has changed, fetching new indictments')
            // Update previousTheses list
            solution.sessions.forEach(session => {
                session.thesesPrevious = session.theses
            })
            solution.changed = false

            fetchIndictments = await api.putandindictments(mapAppSolutionForIndictments(solution))

            const mappedIndictments = mapApiIndictments(fetchIndictments)

            solution.personIndictments = mappedIndictments[0] // At index 0 are person indictments
            solution.thesesIndictments = mappedIndictments[1] // At index 1 are thesis indictments

            emitter.emit('indictments-loaded', 'loaded')
        }
        // Indictments are up to date and solution has not changed
        else {
            console.log('Solution has not changed, indictments are up to date')
        }
        console.log(solution)
    }

    // GS2
    async function solveSolution() {
        if (solvingInProgress.value) {
            solvingInProgress.value = false
            return
        }
        solvingInProgress.value = true
        let solutionSolved = false
        const solutionIdForServer = solution.id + Math.floor(Math.random() * 100)

        const requestObj = mapAppSolutionForSolving(solution)
        requestObj.scheduleId = solutionIdForServer

        const currentSolutionOnServer = await api.solution(solutionIdForServer)

        await api.solve(requestObj)

        while (!solutionSolved && solvingInProgress.value) {
            const newSolution = await api.solution(solutionIdForServer)

            if (newSolution.score !== currentSolutionOnServer.score) {
                solutionSolved = true

                const sessions = mapApiSessions(newSolution.sessions)
                solution.sessions = sessions
                solution.score = mapApiScore(newSolution.score)
                solution.solved = true

                const indictment = mapApiIndictments(await api.indictments(solutionIdForServer))
                solution.personIndictments = indictment[0]
                solution.thesesIndictments = indictment[1]
                emitter.emit('indictments-loaded', 'loaded')
            }
        }

        if (solvingInProgress.value) {
            console.log('Solution solved')
            solvingInProgress.value = false
        } else {
            console.log('Solution solving cancelled')
        }
    }

    function printSolvePayload() {
        console.log(mapAppSolutionForIndictments(solution))
    }

    const solutionLoaded = () => solution.id !== null

    function changeName(newName: string) {
        solution.name = newName
    }

    function checkAndSetChangedState(): void{
        let changed = false;

        for (const session of solution.sessions) {
            const theses = JSON.stringify(session.theses)
            const thesesPrevious = JSON.stringify(session.thesesPrevious)

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

    // Helper function
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

    function getUniqueSolutionId() {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }

    function parseTheses(personIds: number[]): number[] {
        let students = usePersonState().getStudents().filter((student) => {
                personIds.includes(student.id)
            })
        return students.map(student => student.thesis)
    }

    function saveSolutionToStorage(solutionToSave: Solution | null = null) {
        if (solutionToSave === null) {
            console.log('Saving solution to storage')
            localStorage.setItem(`${STORAGE_KEY}:${solution.id}`, JSON.stringify(solution))
        } else if (solutionToSave !== null) {
            console.log('Saving new solution to storage')
            solutionToSave.id = getUniqueSolutionId()
            solutionToSave.theses = parseTheses(solutionToSave.persons)
            localStorage.setItem(`${STORAGE_KEY}:${solutionToSave.id}`, JSON.stringify(solutionToSave))
        }

    }

    function deleteSolutionFromStorage() {
        const key = `${STORAGE_KEY}:${solution.id}`
        console.log('Deleting solution from storage', key)
        localStorage.removeItem(key)
        resetSolution()

    }

    function loadSolutionFromStorage(solutionId: number) {
        const storedSolution = localStorage.getItem(`${STORAGE_KEY}:${solutionId}`)

        if (storedSolution) {
            console.log('Loading solution from storage')
            loadSolution(JSON.parse(storedSolution))
        }
        emitter.emit('indictments-loaded', 'loaded')
    }

    function resetSolution() {
        solution.id = null
        solution.solved = false
        solution.changed = false
        solution.name = ''
        solution.score = null
        solution.sessions = []
        solution.persons = []
        solution.theses = []
        solution.personIndictments = []
        solution.thesesIndictments = []
    }

    return {
        solution: solution,
        loadSolution,
        loadSolutionApi,
        loadIndictments,
        solutionLoaded,
        changeName,
        solveSolution,
        printSolvePayload,
        getObjectConstraints,
        getTypeOfConstraints,
        getSessionWithId,
        checkAndSetChangedState,
        saveSolutionToStorage,
        deleteSolutionFromStorage,
        loadSolutionFromStorage,
    }
}
