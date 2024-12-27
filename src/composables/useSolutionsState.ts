import { type Solution } from "@/types/app";
import usePersonState from "@/composables/usePersonState";
import { ref } from "vue";

const solutions = ref<Solution[]>([
    {
        id: 1,
        solved: false,
        changed: false,
        name: 'Scheduling Solution Alpha',
        score: '',
        sessions: [
            {
                id: 1,
                startDate: '2024-12-28T09:00:00',
                slotDuration: 30,
                room: 'Room A',
                theses: [],
                thesesPrevious: [],
            },
            {
                id: 2,
                startDate: '2024-12-28T09:00:00',
                slotDuration: 30,
                room: 'Room B',
                theses: [],
                thesesPrevious: [],
            },
        ],
        persons: [
            1,
            2,
        ],
        theses: null,
        indictments: [],
    },
    {
        id: 2,
        solved: false,
        changed: false,
        name: 'Scheduling Solution Beta',
        score: '',
        sessions: [
            {
                id: 3,
                startDate: '2024-12-30T10:00:00',
                slotDuration: 30,
                room: 'Room C',
                theses: [],
                thesesPrevious: [],
            },
            {
                id: 4,
                startDate: '2024-12-30T14:00:00',
                slotDuration: 30,
                room: 'Room D',
                theses: [],
                thesesPrevious: [],
            },
        ],
        persons: [
            5,
            6,
        ],
        theses: null,
        indictments: [],
    },
])

export default () => {
    function saveSolution(s: Solution) {
        s.id = s.id || solutions.value.length + 1;
        s.theses = parseTheses(s.persons);

        const index = solutions.value.findIndex(sol => sol.id === s.id);
        if (index === -1) {
            solutions.value.push(s);
        } else {
            solutions.value[index] = s;
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
        return solutions.value.find((sol) => sol.id === id);
    }

    return {
        solutions,
        saveSolution,
        getSolutionById,
    }
}
