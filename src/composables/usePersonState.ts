import { type Person } from '@/types/app'
import { ref, readonly } from 'vue'

const persons = ref<Person[]>([
    {
        id: 1,
        name: 'prof. Andris Ambainis',
        isStudent: false,
        timeConstraints: [
            {
                id: 1,
                from: '2025-1-2T10:45:00',
                to: '2025-1-2T23:59:59',
            },
        ],
    },
    {
        id: 2,
        name: 'prof. Juris Borzovs',
        isStudent: false,
        timeConstraints: [],
    },
    {
        id: 3,
        name: 'prof. Leo Seļavo',
        isStudent: false,
        timeConstraints: [
            {
                id: 2,
                from: '2025-1-2T09:30:00',
                to: '2025-1-2T23:59:59',
            },
        ],
    },
    {
        id: 4,
        name: 'doc. Agris Šostaks',
        isStudent: false,
        timeConstraints: [
            {
                id: 3,
                from: '2025-1-2T08:45:00',
                to: '2025-1-2T09:59:59',
            },
        ],
    },
    {
        id: 5,
        name: 'prof. Karlis Podnieks',
        isStudent: false,
        timeConstraints: [],
    },
    {
        id: 6,
        name: 'prof. Laila Niedrīte',
        isStudent: false,
        timeConstraints: [
            {
                id: 4,
                from: '2025-1-2T09:30:00',
                to: '2025-1-2T10:00:00',
            },
        ],
    },
    {
        id: 7,
        name: 'prof. Guntis Bārzdiņš',
        isStudent: false,
        timeConstraints: [
            {
                id: 5,
                from: '2025-1-2T10:15:00',
                to: '2025-1-2T23:59:59',
            },
        ],
    },
    {
        id: 8,
        name: 'Jānis Jaunsudrabiņš',
        isStudent: true,
        timeConstraints: [],
        thesis: 1,
    },
    {
        id: 9,
        name: 'Kārlis Skalbe',
        isStudent: true,
        timeConstraints: [],
        thesis: 2,
    },
    {
        id: 10,
        name: 'Rūdolfs Blaumanis',
        isStudent: true,
        timeConstraints: [],
        thesis: 3,
    },
    {
        id: 11,
        name: 'Alberts Bels',
        isStudent: true,
        timeConstraints: [],
        thesis: 4,
    },
    {
        id: 12,
        name: 'Vilis Plūdons',
        isStudent: true,
        timeConstraints: [],
        thesis: 5,
    },
    {
        id: 13,
        name: 'Andrejs Pumpurs',
        isStudent: true,
        timeConstraints: [],
        thesis: 6,
    },
    {
        id: 14,
        name: 'Aleksandrs Čaks',
        isStudent: true,
        timeConstraints: [],
        thesis: 7,
    },
    {
        id: 15,
        name: 'Vizma Belševica',
        isStudent: true,
        timeConstraints: [],
        thesis: 8,
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

    function getPersonById(id: number): Person | undefined {
        return persons.value.find(p => p.id === id)
    }

    function getStudents(): Person[] {
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
        getAcademicStaff,
        getPersonById,
    }
}
