import { type Thesis } from "@/types/app"
import { ref, readonly } from "vue"

const STORAGE_KEY = 'theses'
const COUNTER_KEY = 'theses_counter'

const theses = ref<Thesis[]>([])

export default () => {

    // Saves the thesis to the list of theses and to the local storage
    function saveThesis(thesis: Thesis) {
        console.log("Saving thesis", thesis)
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

    // Deletes a thesis from the list of theses and from the local storage
    function deleteThesis(thesisId: number) {
        console.log("Deleting thesis", thesisId)

        const index = theses.value.findIndex(t => t.id === thesisId)

        if (index === -1) {
            console.error('Thesis not found')
            return
        }

        theses.value.splice(index, 1)

        saveThesesToStorage()
    }

    // Finds a thesis by its id
    function findThesisById(thesisId: number) {
        return theses.value.find(t => t.id === thesisId)
    }

    // Generates a unique id for a new thesis
    function getUniqueThesisId(): number {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }

    // Saves the theses to the local
    function saveThesesToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(theses.value));
    }

    // Loads the theses from the local storage
    function loadTheses() {
        const storedTheses = localStorage.getItem(STORAGE_KEY)

        if (storedTheses) {
            theses.value = JSON.parse(storedTheses)
        }
    }

    // Validates the thesis object
    function validateThesis(thesis: Thesis): string[] {
        const messages = []

        if (!thesis.name) {
            messages.push('Thesis name is required')
        }

        if (!thesis.supervisor) {
            messages.push('Thesis supervisor is required')
        }

        if (!thesis.reviewer) {
            messages.push('Thesis reviewer is required')
        }

        if (thesis.supervisor && thesis.reviewer && thesis.supervisor === thesis.reviewer) {
            messages.push('Thesis supervisor and reviewer cannot be the same person')
        }

        return messages
    }

    return {
        theses: readonly(theses),
        saveThesis,
        deleteThesis,
        findThesisById,
        saveThesesToStorage,
        loadTheses,
        validateThesis,
    }
}
