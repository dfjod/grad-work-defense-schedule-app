import { type Thesis } from "@/types/app"
import { ref, readonly } from "vue"

const STORAGE_KEY = 'theses'
const COUNTER_KEY = 'theses_counter'

const theses = ref<Thesis[]>([])

export default () => {
    function saveThesis(thesis: Thesis) {
        const index = theses.value.findIndex((t) => t.id === thesis.id)

        if (!thesis.id) {
            thesis.id = getUniqueThesisId()
        }

        if (index === -1) {
            theses.value.push(thesis)
        } else {
            theses.value.splice(index, 1, thesis)
        }

        saveThesesToStorage()

        return thesis.id
    }

    function deleteThesis(thesisId: number) {
        const index = theses.value.findIndex(t => t.id === thesisId)

        if (index === -1) {
            console.error('Thesis not found')
            return
        }

        theses.value.splice(index, 1)

        saveThesesToStorage()
    }

    function findThesisById(thesisId: number) {
        return theses.value.find(t => t.id === thesisId)
    }

    function getUniqueThesisId(): number {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }

    function saveThesesToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(theses.value));
    }

    function loadTheses() {
        const storedTheses = localStorage.getItem(STORAGE_KEY)

        if (storedTheses) {
            theses.value = JSON.parse(storedTheses)
        }
    }

    return {
        theses: readonly(theses),
        saveThesis,
        deleteThesis,
        findThesisById,
        saveThesesToStorage,
        loadTheses,
    }
}
