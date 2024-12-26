import { type Person } from '@/types/app'
import { ref, readonly } from 'vue'

const persons = ref<Person[]>([
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
    {
        id: 3,
        isStudent: false,
        name: 'Dr. Emily Davis',
        timeConstraints: [
            { id: 5, from: '2024-12-15T10:00:00', to: '2024-12-15T12:00:00' },
            { id: 6, from: '2024-12-16T14:30:00', to: '2024-12-16T16:30:00' },
        ],
        indictments: [],
    },
    {
        id: 4,
        isStudent: true,
        name: 'John Doe',
        timeConstraints: [
            { id: 7, from: '2024-12-11T08:30:00', to: '2024-12-11T10:30:00' },
            { id: 8, from: '2024-12-13T15:00:00', to: '2024-12-13T17:00:00' },
        ],
        indictments: [],
        thesis: 2,
    },
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
    {
        id: 7,
        isStudent: false,
        name: 'Dr. James Taylor',
        timeConstraints: [
            { id: 13, from: '2024-12-15T09:00:00', to: '2024-12-15T11:00:00' },
            { id: 14, from: '2024-12-16T10:00:00', to: '2024-12-16T12:00:00' },
        ],
        indictments: [],
    },
    {
        id: 8,
        isStudent: true,
        name: 'Emily White',
        timeConstraints: [
            { id: 15, from: '2024-12-13T08:00:00', to: '2024-12-13T10:00:00' },
            { id: 16, from: '2024-12-14T14:00:00', to: '2024-12-14T16:00:00' },
        ],
        indictments: [],
        thesis: 4,
    },
    {
        id: 9,
        isStudent: false,
        name: 'Dr. Karen Martinez',
        timeConstraints: [
            { id: 17, from: '2024-12-11T13:00:00', to: '2024-12-11T15:00:00' },
            { id: 18, from: '2024-12-12T09:00:00', to: '2024-12-12T11:00:00' },
        ],
        indictments: [],
    },
])

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
