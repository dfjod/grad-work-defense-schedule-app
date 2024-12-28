import { reactive, readonly } from 'vue'
import { type Solution } from '@/types/app'
import mapper from '@/services/mapper'
import api from '@/services/api'
import type { Indictment as IndictmentApi} from '@/types/api'
import type { Indictment, ConstraintMatch } from '@/types/app'

const solution = reactive<Solution>({
    id: null,
    solved: false,
    changed: false,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    indictments: [],
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
        const sessions = mapper.mapApiSessions(fetchedSolution.sessions)
        console.log('Fetched solution:', fetchedSolution)
        console.log('Mapped sessions:', sessions)

        solution.sessions = sessions
        solution.score = fetchedSolution.score
        solution.solved = true
        console.log('Solution loaded:', solution)
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
        console.log('Solution changed state:', solution.changed)

        let fetchIndictments: IndictmentApi[] = []

        if (solution.indictments.length === 0) {
            console.log('Indictments not loaded, fetching them')
            fetchIndictments = await api.indictments(solution.id)
        }

        if (solution.changed) {
            console.log('Solution has changed, fetching new indictments')
            // Update previousTheses list
            solution.sessions.forEach(session => {
                session.thesesPrevious = session.theses
            })
            fetchIndictments = await api.putandindictments(mapper.mapAppSolutionForIndictments(solution))
        }

        if (fetchIndictments.length > 0) {
            const mappedIndictments = mapper.mapApiIndictments(fetchIndictments)
            solution.indictments = mappedIndictments
        } else {
            console.log('Solution has not changed, indictments are up to date')
        }
    }

    async function solveSolution() {
        if (solution.id !== null) {
            const requestObj = mapper.mapAppSolutionForSolving(solution)
            await api.solve(requestObj)
        } else {
            console.error('Solution not loaded')
        }
    }

    function printSolvePayload() {
        console.log(mapper.mapAppSolutionForIndictments(solution))
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

    function getPersonIndictments(personId: number): Indictment[] {
        return solution.indictments.filter(indictment => indictment.id === personId && indictment.class === 'Person')
    }

    function getPersonConstraints(personId: number): ConstraintMatch[] {
        const indictments = getPersonIndictments(personId)
        const constraints = indictments.map(indictment => indictment.constraintMatches)
        console.log(constraints.flat())
        return constraints.flat()
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
        getPersonConstraints,
    }
}
