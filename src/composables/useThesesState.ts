import { type Thesis } from "@/types/app"
import { ref, readonly } from "vue"

const theses = ref<Thesis[]>([
    {
        id: 1,
        name: 'Baltā kvantu kriptogrāfija',
        author: 8,
        supervisor: 1,
        reviewer: 2,
    },
    {
        id: 2,
        name: 'Programmatūras kvalitātes dzirnavas',
        author: 9,
        supervisor: 2,
        reviewer: 3,
    },
    {
        id: 3,
        name: 'Kiberfizikālās sistēmas Silmačos',
        author: 10,
        supervisor: 3,
        reviewer: 4,
    },
    {
        id: 4,
        name: 'Datizrace būrī',
        author: 11,
        supervisor: 5,
        reviewer: 1,
    },
    {
        id: 5,
        name: 'Mazā Anduļa datu noliktavas',
        author: 12,
        supervisor: 6,
        reviewer: 5,
    },
    {
        id: 6,
        name: 'Tīklplēsis',
        author: 13,
        supervisor: 7,
        reviewer: 3,
    },
    {
        id: 7,
        name: 'Neironu skartie',
        author: 14,
        supervisor: 7,
        reviewer: 1,
    },
    {
        id: 8,
        name: 'Billes datu noliktavas',
        author: 15,
        supervisor: 6,
        reviewer: 4,
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
        theses: readonly(theses),
        saveThesis,
        deleteThesis,
        findThesisById
    }
}
