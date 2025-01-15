import type { Person } from '@/types/app'
import { ref, readonly } from 'vue'
import useThesesState from '@/composables/useThesesState'

const STORAGE_KEY = 'persons'
const COUNTER_KEY = 'person_counter'

const persons = ref<Person[]>([])

export default () => {

    const { deleteThesis } = useThesesState()

    // Adds a person to the persons array
    function savePerson(person: Person) {
        console.log("Saving person", person)
        const index = persons.value.findIndex((p) => p.id === person.id)

        if (!person.id) {
            person.id = getUniquePersonId()
        }

        if (index === -1) {
            persons.value.push(person)
        } else {
            persons.value.splice(index, 1, person)
        }

        savePersonsToStorage()

        return person.id
    }

    // Deletes a person from the persons array
    function deletePerson(person: Person) {
        console.log("Deleting person", person)

        const solutions = getSolutionsOfPerson(person.id)
        const theses = getThesesOfPerson(person.id)

        if (solutions.length > 0) {
            console.error("Person is attached to solutions", solutions)
            return
        }

        if(theses.length > 0) {
            console.error("Person is attached to theses", theses)
            return
        }

        const index = persons.value.findIndex(p => p.id === person.id)

        if (index === -1) {
            console.error('Person not found')
            return
        }

        if (person.isStudent && person.thesis) {
            deleteThesis(person.thesis)
        }

        persons.value.splice(index, 1)

        savePersonsToStorage()
    }

    // Get the id and name of solutions that the specified person is attached to
    function getSolutionsOfPerson(personId: number) {
        const solutionsAttachedTo: [number, string][] = []

        // Iterate over solutions
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("solution:")) {
                const storedSolution = localStorage.getItem(key);

                if (storedSolution) {
                    const solution = JSON.parse(storedSolution);

                    if (solution.persons.includes(personId)) {
                        solutionsAttachedTo.push([solution.id, solution.name])
                    }
                }
            }
        })

        if (solutionsAttachedTo.length > 0) {
            return solutionsAttachedTo
        } else {
            return solutionsAttachedTo
        }
    }

    // Get theses that are attached to the specified person
    function getThesesOfPerson(personId: number) {
        return useThesesState().theses.value.filter(thesis => {
            const isSupervisor = thesis.supervisor === personId
            const isReviewer = thesis.reviewer === personId
            return isSupervisor || isReviewer
        })
    }

    // Saves a time constraint to the person object
    function saveTimeConstraint(person: Person, from: string, to: string) {
        person.timeConstraints.push({
            id: person.timeConstraints.length,
            from,
            to
        })
    }

    // Deletes a time constraint from the person object
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

    // Get the person object by id
    function getPersonById(id: number): Person | undefined {
        return persons.value.find(p => p.id === id)
    }

    // Get students from the persons array
    function getStudents(): Person[] {
        return persons.value.filter(p => p.isStudent)
    }

    // Get academic staff from the persons array
    function getAcademicStaff() {
        return persons.value.filter(p => !p.isStudent)
    }

    // Generate a unique id for a new person
    function getUniquePersonId(): number {
        let counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10)
        counter += 1
        localStorage.setItem(COUNTER_KEY, counter.toString())
        return counter
    }

    // Save the persons array to local storage
    function savePersonsToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persons.value));
    }

    // Load the persons array from local storage
    function loadPersons() {
        const storedPersons = localStorage.getItem(STORAGE_KEY)

        if (storedPersons) {
            persons.value = JSON.parse(storedPersons)
        }
    }

    // Validate the person object
    function validatePerson(person: Person) {
        if (!person.name) {
            console.error('Person name is required')
            return false
        }

        return true
    }

    return {
        persons: readonly(persons),
        savePerson,
        deletePerson,
        saveTimeConstraint,
        deleteTimeConstraint,
        getStudents,
        getAcademicStaff,
        getPersonById,
        loadPersons,
        validatePerson,
    }
}
