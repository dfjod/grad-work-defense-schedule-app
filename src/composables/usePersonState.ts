import type { Person } from '@/types/app'
import { ref, readonly } from 'vue'
import useThesesState from '@/composables/useThesesState'

const STORAGE_KEY = 'persons'
const COUNTER_KEY = 'person_counter'

const persons = ref<Person[]>([])

export default () => {

    const { deleteThesis, findThesisById } = useThesesState()

    function savePerson(person: Person) {
        const index = persons.value.findIndex((p) => p.id === person.id)

        if (!person.id) {
            person.id = getUniquePersonId()
        }

        if (index === -1) {
            persons.value.push(person)
        } else {
            persons.value.splice(index, 1, person)
        }
    }

    function deletePerson(person: Person) {
        const index = persons.value.findIndex(p => p.id === person.id)

        if (index === -1) {
            console.error('Person not found')
            return
        }

        deletePersonFromSolutions(person.id)

        if (person.isStudent && person.thesis) {
            deleteThesis(person.thesis)
        }

        persons.value.splice(index, 1)
        console.log(persons.value)
    }

    function saveTimeConstraint(person: Person, from: string, to: string) {
        person.timeConstraints.push({
            id: person.timeConstraints.length,
            from,
            to
        })
    }

    function deleteTimeConstraint(person: Person, timeConstraintId: number) {
        if (person === undefined) {
            console.error('Person not found')
            return
        }

        const index = person.timeConstraints.findIndex(tc => tc.id === timeConstraintId)

        if (index === -1) {
            console.error('Time constraint not found')
            return
        }

        person.timeConstraints.splice(index, 1)
    }

    function getPersonById(id: number): Person | undefined {
        return persons.value.find(p => p.id === id)
    }

    function getStudents(): Person[] {
        return persons.value.filter(p => p.isStudent)
    }

    function getAcademicStaff() {
        return persons.value.filter(p => !p.isStudent)
    }

    function getUniquePersonId(): number {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }


    function savePersonsToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persons.value));
    }


    function loadPersons() {
        const storedPersons = localStorage.getItem(STORAGE_KEY)

        if (storedPersons) {
            persons.value = JSON.parse(storedPersons)
        }
    }

    // function deletePersonFromSolutions(personId: number) {
    //     Object.keys(localStorage).forEach((key) => {
    //         if (key.startsWith('solution:')) {
    //             const storedSolution = localStorage.getItem(key)

    //             if (storedSolution) {
    //                 const solution = JSON.parse(storedSolution) as Solution

    //                 solution.persons = solution.persons.filter((id) => id !== personId)

    //                 solution.theses = solution.theses.filter((thesisId) => {
    //                     const thesis = findThesisById(thesisId)
    //                     return thesis && thesis.author !== personId
    //                 })

    //                 for (const session of solution.sessions) {
    //                     session.theses = session.theses.filter((thesisId) => {
    //                         const thesis = findThesisById(thesisId)
    //                         console.log("removing theses from session", thesis?.id, thesis?.author, personId)
    //                         return thesis && thesis.author !== personId
    //                     })
    //                 }

    //                 solution.changed = true
    //                 localStorage.setItem(key, JSON.stringify(solution))
    //             }
    //         }
    //     })
    // }

    return {
        persons: readonly(persons),
        savePerson,
        deletePerson,
        saveTimeConstraint,
        deleteTimeConstraint,
        getStudents,
        getAcademicStaff,
        getPersonById,
        savePersonsToStorage,
        loadPersons,
    }
}
