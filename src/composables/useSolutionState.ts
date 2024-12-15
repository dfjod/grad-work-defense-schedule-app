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

    async function loadSolution(solutionId: number) {
        const fetchedSolution = await api.solution(solutionId)
        const mappedSolution = mapper.mapApiSolution(fetchedSolution)
        solution.id = mappedSolution.id
        solution.name = mappedSolution.name
        solution.score = mappedSolution.score
        solution.sessions = mappedSolution.sessions
        solution.persons = mappedSolution.persons
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

    return {
        id: shallowReadonly(id),
        name: shallowReadonly(name),
        score: shallowReadonly(score),
        persons: shallowReadonly(persons),
        sessions: shallowReadonly(sessions),
        indictments: shallowReadonly(indictments),
        loadSolution,
        loadIndictments,
        solutionLoaded,
    }
}
