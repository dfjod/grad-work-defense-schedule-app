import { reactive, toRefs, shallowReadonly } from 'vue'
import { type Solution } from '@/types/app'
import mapper from '@/services/mapper'
import api from '@/services/api'

let solution = reactive<Solution>({
    id: null,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
})

export default () => {
    const { id, name, score, sessions, persons } = toRefs(solution)

    async function loadSolution(solutionId: number) {
        const fetchedSolution = await api.solution(solutionId)
        const mappedSolution = mapper.mapApiSolution(fetchedSolution)
        solution.id = mappedSolution.id
        solution.name = mappedSolution.name
        solution.score = mappedSolution.score
        solution.sessions = mappedSolution.sessions
        solution.persons = mappedSolution.persons
    }

    // TODO: Implement checking if the solution is loaded
    async function loadScore() {}

    const solutionLoaded = () => solution.id !== null

    return {
        id: shallowReadonly(id),
        name: shallowReadonly(name),
        score: shallowReadonly(score),
        persons: shallowReadonly(persons),
        sessions: shallowReadonly(sessions),
        loadSolution,
        loadScore,
        solutionLoaded,
    }
}
