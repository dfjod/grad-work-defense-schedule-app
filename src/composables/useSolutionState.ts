import type Solution from "@/types/Solution";
import type SolutionJson from "@/types/api/SolutionJson";
import { reactive, toRefs } from "vue";
import { transformSolution } from "@/utils/SolutionUtils";
import fetchData from "@/utils/Fetch";

const solution = reactive<Solution>({
    id: null,
    name: "",
    score: null,
    persons: [],
    sessions: []
})

export default () => {
    const { sessions, persons } = toRefs(solution)

    async function loadSolution(solutionId: number) {
        const fetchedSolution = await fetchData<SolutionJson>(`/api/solution?id=${solutionId}`)
        const transformedSolution = transformSolution(fetchedSolution)

        solution.id = transformedSolution.id
        solution.name = transformedSolution.name
        solution.score = transformedSolution.score
        solution.sessions = transformedSolution.sessions
        solution.persons = transformedSolution.persons
    }

    function solutionLoaded(): boolean {
        return solution.id != null
    }

    return {
        sessions,
        persons,
        loadSolution,
        solutionLoaded
    }
}
