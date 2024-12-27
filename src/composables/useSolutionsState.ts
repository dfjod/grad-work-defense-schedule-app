import { type Solution } from "@/types/app";
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
            // Including some previous persons
            {
                id: 1,
                isStudent: true,
                name: 'Alice Johnson',
                timeConstraints: [
                    { id: 1, from: '2024-12-10T08:00:00', to: '2024-12-10T10:00:00' },
                    { id: 2, from: '2024-12-11T14:00:00', to: '2024-12-11T16:00:00' },
                ],
                indictments: [],
                thesis: 1,
            },
            {
                id: 2,
                isStudent: false,
                name: 'Dr. Robert Smith',
                timeConstraints: [
                    { id: 3, from: '2024-12-12T09:00:00', to: '2024-12-12T11:00:00' },
                    { id: 4, from: '2024-12-14T13:00:00', to: '2024-12-14T15:00:00' },
                ],
                indictments: [],
            },
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
            // Including other previous persons
            {
                id: 5,
                isStudent: true,
                name: 'Michael Brown',
                timeConstraints: [
                    { id: 9, from: '2024-12-17T09:00:00', to: '2024-12-17T11:00:00' },
                    { id: 10, from: '2024-12-19T13:00:00', to: '2024-12-19T15:00:00' },
                ],
                indictments: [],
                thesis: 3,
            },
            {
                id: 6,
                isStudent: false,
                name: 'Dr. Susan Clark',
                timeConstraints: [
                    { id: 11, from: '2024-12-18T08:30:00', to: '2024-12-18T10:30:00' },
                    { id: 12, from: '2024-12-20T14:00:00', to: '2024-12-20T16:00:00' },
                ],
                indictments: [],
            },
        ],
        theses: null,
        indictments: [],
    },
])

export default () => {
    function saveSolution(s: Solution) {
        const index = solutions.value.findIndex((sol) => sol.id === s.id);
        s.id = s.id || solutions.value.length + 1;
        if (index === -1) {
            solutions.value.push(s);
        } else {
            solutions.value[index] = s;
        }
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
