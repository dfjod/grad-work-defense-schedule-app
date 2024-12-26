import { type Thesis } from "@/types/app"
import { ref } from "vue"

const theses = ref<Thesis[]>([
    {
        id: 1,
        name: 'Efficient Algorithms for Data Sorting',
        author: 1, // Alice Johnson
        supervisor: 2, // Dr. Robert Smith
        reviewer: 3, // Dr. Emily Davis
        indictments: [],
    },
    {
        id: 2,
        name: 'Advanced AI Techniques in Robotics',
        author: 4, // John Doe
        supervisor: 3, // Dr. Emily Davis
        reviewer: 2, // Dr. Robert Smith
        indictments: [],
    },
    {
        id: 3,
        name: 'Machine Learning Applications in Healthcare',
        author: 5, // Michael Brown
        supervisor: 6, // Dr. Susan Clark
        reviewer: 7, // Dr. James Taylor
        indictments: [],
    },
    {
        id: 4,
        name: 'Exploring Quantum Computing Algorithms',
        author: 8, // Emily White
        supervisor: 7, // Dr. James Taylor
        reviewer: 9, // Dr. Karen Martinez
        indictments: [],
    },
])

export default () => {
    function saveThesis(thesis: Thesis) {
        const index = theses.value.findIndex(t => t.id === thesis.id)
        thesis.id = theses.value.length ? Math.max(...theses.value.map(t => t.id)) + 1 : 1

        if (index === -1) {
            theses.value.push(thesis)
        } else {
            theses.value.splice(index, 1, thesis)
        }

        return thesis.id
    }

    function deleteThesis(thesisId: number) {
        const index = theses.value.findIndex(t => t.id === thesisId)

        if (index === -1) {
            console.error('Thesis not found')
            return
        }

        theses.value.splice(index, 1)
    }

    function findThesisById(thesisId: number) {
        return theses.value.find(t => t.id === thesisId)
    }

    return {
        theses,
        saveThesis,
        deleteThesis,
        findThesisById
    }
}
