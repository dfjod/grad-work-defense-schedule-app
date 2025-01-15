import { reactive, ref } from 'vue'
import type { ListSolution, Solution } from '@/types/app'
import {
    mapApiSessions,
    mapApiScore,
    mapAppSolutionForIndictments,
    mapAppSolutionForSolving,
    mapApiIndictments,
} from '@/services/mapper'
import api from '@/services/api'
import type { IndictmentApi } from '@/types/api'
import type { ConstraintMatch } from '@/types/app'
import emitter from '@/services/mitt'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'

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
    // Load solution s into current solution state
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

    // Load a solution from the API update the session objects
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

    // Load indictments for the solution
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
        }
        // Indictments are up to date and solution has not changed
        else {
            console.log('Solution has not changed, indictments are up to date')
        }
        console.log(solution)
    }

    // Solve the solution and load the new solution and indictments
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
            }
        }

        if (solvingInProgress.value) {
            console.log('Solution solved')
            solvingInProgress.value = false
        } else {
            console.log('Solution solving cancelled')
        }
    }

    function solutionLoaded() {
        return solution.id !== null
    }

    // Change the name of the current solution
    function changeName(newName: string) {
        solution.name = newName
        // Save the solution to storage
    }

    // Check if the solution has changed and set the changed state
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

    // Generate an id for a new solution
    function getUniqueSolutionId() {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }

    // Get a list of theses from a list of person ids
    function parseTheses(personIds: number[]): number[] {
        console.log('Parsing theses from person ids')
        const involvedStudents = usePersonState().getStudents().filter((student) => {
                return personIds.includes(student.id)
            })
        return involvedStudents.map(student => student.thesis)
    }

    // Save a new solution or save the current state of the solution to storage
    function saveSolutionToStorage(solutionToSave: Solution | null = null) {
        if (solutionToSave === null) {
            console.log('Saving solution to storage')
            solution.theses = parseTheses(solution.persons)
            localStorage.setItem(`${STORAGE_KEY}:${solution.id}`, JSON.stringify(solution))
        } else if (solutionToSave !== null) {
            console.log('Saving new solution to storage')
            solutionToSave.id = getUniqueSolutionId()
            solutionToSave.theses = parseTheses(solutionToSave.persons)
            localStorage.setItem(`${STORAGE_KEY}:${solutionToSave.id}`, JSON.stringify(solutionToSave))
        }

        emitter.emit('solution-saved', 'saved')
    }

    // Delete the current solution from
    function deleteSolutionFromStorage() {
        const key = `${STORAGE_KEY}:${solution.id}`
        console.log('Deleting solution from storage', key)
        localStorage.removeItem(key)
        resetSolution()
        emitter.emit('solution-deleted', 'deleted')
    }

    // Load a solution from storage
    function loadSolutionFromStorage(solutionId: number) {
        const storedSolution = localStorage.getItem(`${STORAGE_KEY}:${solutionId}`)

        if (storedSolution) {
            console.log('Loading solution from storage')
            loadSolution(JSON.parse(storedSolution))
        }
    }

    // Reset the solution state
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

    function getSolutionsForList(): ListSolution[] {
        const solutions: ListSolution[] = []

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('solution:')) {
                const item = JSON.parse(localStorage.getItem(key) || '{}')

                if (item.id !== undefined && item.name !== undefined) {
                    solutions.push({
                        id: item.id,
                        name: item.name,
                    })
                }
            }
        })

        return solutions
    }

    function validateSolution(solutionToValidate: Solution) {
        const messages = []

        if (solutionToValidate.name === '') {
            messages.push('Solution name is required')
        }

        return messages
    }

    function validateSolutionForSolving() {
        console.log('Validating solution for solving')
        const messages = []

        if (solution.persons.length === 0) {
            messages.push('Solution has no persons')
        }

        if (solution.theses.length === 0) {
            messages.push('Solution has no theses')
        }

        // Check if each thesis has a supervisor and a reviewre present
        for (const thesisId of solution.theses) {
            const thesis = useThesesState().findThesisById(thesisId)
            const author = usePersonState().getPersonById(thesis?.author)

            if (solution.persons.includes(thesis?.supervisor) === false) {
                const supervisor = usePersonState().getPersonById(thesis?.supervisor)
                messages.push(`Thesis of ${author?.name} has no supervisor ${supervisor.name}`)
            }

            if (solution.persons.includes(thesis?.reviewer) === false) {
                const reviewer = usePersonState().getPersonById(thesis?.reviewer)
                messages.push(`Thesis of ${author?.name} has no supervisor ${reviewer.name}`)
            }
        }

        return messages
    }

    return {
        solution,
        loadSolution,
        loadSolutionApi,
        loadIndictments,
        solutionLoaded,
        changeName,
        solveSolution,
        checkAndSetChangedState,
        saveSolutionToStorage,
        deleteSolutionFromStorage,
        loadSolutionFromStorage,
        getSolutionsForList,
        validateSolution,
        validateSolutionForSolving,
        solvingInProgress,
    }
}
