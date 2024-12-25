import { type Thesis } from "@/types/app"
import { ref } from "vue"

const theses = ref<Thesis[]>([])

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
