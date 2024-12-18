import { reactive, toRefs, shallowReadonly } from 'vue'
import { type Solution } from '@/types/app'
import mapper from '@/services/mapper'
import api from '@/services/api'

const solution = reactive<Solution>({
    id: null,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    indictments: [],
})

export default () => {
    const { id, name, score, sessions, persons, indictments } = toRefs(solution)

    function loadSolution(s: Solution) {
        solution.id = s.id
        solution.name = s.name
        solution.score = s.score
        solution.sessions = s.sessions
        solution.persons = s.persons
    }

    async function loadSolutionApi(solutionId: number) {
        const fetchedSolution = await api.solution(solutionId)
        const mappedSolution = mapper.mapApiSolution(fetchedSolution)
        loadSolution(mappedSolution)
    }

    async function loadIndictments() {
        if (solution.id !== null) {
            const fetchIndictments = await api.indictments(solution.id)
            const mappedIndictments = mapper.mapApiIndictments(fetchIndictments)
            solution.indictments = mappedIndictments
        } else {
            console.error('Solution not loaded')
        }
    }

    const solutionLoaded = () => solution.id !== null

    function serializeSolution(): string {
        return JSON.stringify(solution)
    }

    return {
        id: shallowReadonly(id),
        name: shallowReadonly(name),
        score: shallowReadonly(score),
        persons: shallowReadonly(persons),
        sessions: shallowReadonly(sessions),
        indictments: shallowReadonly(indictments),
        loadSolution,
        loadSolutionApi,
        loadIndictments,
        solutionLoaded,
        serializeSolution
    }
}
