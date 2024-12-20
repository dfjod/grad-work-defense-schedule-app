import { reactive, toRefs, shallowReadonly, readonly } from 'vue'
import { type Solution } from '@/types/app'
import mapper from '@/services/mapper'
import api from '@/services/api'

const solution = reactive<Solution>({
    id: null,
    solved: false,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    indictments: [],
})

export default () => {
    const { id, name, score, sessions, persons, indictments, solved, theses } = toRefs(solution)

    function loadSolution(s: Solution) {
        solution.id = s.id
        solution.solved = s.solved
        solution.name = s.name
        solution.score = s.score
        solution.sessions = s.sessions
        solution.persons = s.persons
        if (s.theses !== null) {
            solution.theses = s.theses
        }
    }

    async function loadSolutionApi() {
        if (solution.id === null) {
            console.error('Solution ID is null')
            return
        }

        const fetchedSolution = await api.solution(solution.id)
        const mappedSolution = mapper.mapApiSolution(fetchedSolution)

        loadSolution(mappedSolution)
    }

    async function loadIndictments() {
        if (solution.id === null) {
            console.error('Solution not loaded')
            return
        }

        const fetchIndictments = await api.indictments(solution.id)
        const mappedIndictments = mapper.mapApiIndictments(fetchIndictments)

        solution.indictments = mappedIndictments

        distributeIndictments()
    }

    async function solveSolution() {
        if (solution.id !== null) {
            const requestObj = mapper.mapAppSolution(solution)
            await api.solve(requestObj)
        } else {
            console.error('Solution not loaded')
        }
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

    function distributeIndictments() {
        if (solution.theses === null) {
            console.error("Theses are not loaded")
            return
        }
        solution.persons.forEach(person => {
            person.indictments = solution.indictments.filter(i => i.class === 'Person' && i.id === person.id)
        })
        solution.theses.forEach(thesis => {
            thesis.indictments = solution.indictments.filter(i => i.class === 'Thesis' && i.id === thesis.id)
        })
    }

    function printSolution() {
        console.log(solution)
    }

    return {
        id: shallowReadonly(id),
        name: shallowReadonly(name),
        score: shallowReadonly(score),
        persons: shallowReadonly(persons),
        sessions: shallowReadonly(sessions),
        indictments: shallowReadonly(indictments),
        solved: shallowReadonly(solved),
        theses: readonly(theses),
        loadSolution,
        loadSolutionApi,
        loadIndictments,
        solutionLoaded,
        exportSolution,
        changeName,
        solveSolution,
        printSolution,
    }
}
