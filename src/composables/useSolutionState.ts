import type Solution from "@/types/Solution";
import type SolutionJson from "@/types/api/SolutionJson";
import type Indictment from "@/types/Indictment";
import { reactive, toRefs, shallowReadonly, computed } from "vue";
import { transformSolution } from "@/utils/SolutionUtils";
import fetchData from "@/utils/Fetch";
import type IndictmentJson from "@/types/api/IndictmentJson";

const solution = reactive<Solution>({
    id: null,
    name: "",
    score: "",
    sessions: [],
    persons: [],
    theses: [],
})

export default () => {
    const { id, name, score, sessions, persons } = toRefs(solution)

    async function loadSolution(solutionId: number) {
        const fetchedSolution = await fetchData<SolutionJson>(`/api/solution?id=${solutionId}`)
        const transformedSolution = transformSolution(fetchedSolution)

        solution.id = transformedSolution.id
        solution.name = transformedSolution.name
        solution.score = transformedSolution.score
        solution.sessions = transformedSolution.sessions
        solution.persons = transformedSolution.persons
    }

    // TODO: Implement checking if the solution is loaded
    async function loadScore() {
        const indictments = await fetchData<IndictmentJson[]>('/api/indictments?id=0')

        for (const indictment of indictments) {
            const type: string = indictment.indictedObjectClass

            if (type === 'LoadBalancer') {
                continue
            }

            const array = type === 'Person' ? solution.persons : solution.theses

            const objectId = indictment.indictedObjectID
            const object = array.find((obj) => obj.id === objectId)
            if (object) {
                const objectIndictment: Indictment = {
                    id: indictment.indictedObjectID,
                    class: indictment.indictedObjectClass,
                    score: indictment.score,
                    matchCount: indictment.matchCount,
                    constraintMatches: [],
                }

                for (const constraintMatch of indictment.constraintMatches) {
                    objectIndictment.constraintMatches.push({
                        name: constraintMatch.constraintName,
                        score: constraintMatch.score,
                    })
                }

                object.indictments.push(objectIndictment)
            }
        }
    }

    const solutionLoaded = computed(() => solution.id !== null)

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
