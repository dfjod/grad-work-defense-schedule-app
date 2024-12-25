import { type Person } from '@/types/app'
import { ref, readonly } from 'vue'

const persons = ref<Person[]>([])

export default () => {
    function savePerson(person: Person) {
        const index = persons.value.findIndex(p => p.id === person.id)
        person.id = persons.value.length ? Math.max(...persons.value.map(p => p.id)) + 1 : 1

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

        persons.value.splice(index, 1)
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

    function getStudents() {
        return persons.value.filter(p => p.isStudent)
    }

    function getAcademicStaff() {
        return persons.value.filter(p => !p.isStudent)
    }

    return {
        persons: readonly(persons),
        savePerson,
        deletePerson,
        saveTimeConstraint,
        deleteTimeConstraint,
        getStudents,
        getAcademicStaff
    }
}
