import { type Solution } from "@/types/app";
import usePersonState from "@/composables/usePersonState";
import { ref } from "vue";

const solutions = ref<Solution[]>([
    {
        id: 1,
        solved: false,
        changed: false,
        name: 'Thesis Schedule',
        persons: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
        ],
        sessions: [
            {
                id: 1,
                room: '13',
                startDate: "2025-1-2T09:00:00",
                slotDuration: 30,
                theses: [],
                thesesPrevious: [],
            },
            {
                id: 2,
                room: '16',
                startDate: "2025-1-2T09:00:00",
                slotDuration: 30,
                theses: [],
                thesesPrevious: [],
            },
        ],
        theses: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
        ],
        score: '',
        indictments: [],
    },
])

export default () => {

    function saveSolution(s: Solution) {
        s.id = s.id || solutions.value.length + 1
        s.theses = parseTheses(s.persons)

        const index = solutions.value.findIndex(sol => sol.id === s.id)
        if (index === -1) {
            solutions.value.push(s)
        } else {
            solutions.value[index] = s
        }
    }

    function parseTheses(personIds: number[]): number[] {
        return usePersonState().getStudents().map(student => {
            if (personIds.includes(student.id)) {
                return student.thesis
            }
        })
    }

    function getSolutionById(id: number): Solution | undefined {
        return solutions.value.find((sol) => sol.id === id)
    }

    return {
        solutions,
        saveSolution,
        getSolutionById,
    }
}
