<template>
    <ModalComponent @close-modal="handleCloseModal">
        <h2 v-if="solutionProp">Edit Solution</h2>
        <h2 v-else >Create a Solution from Scratch</h2>
        <form @submit.prevent="handleSave">
            <div class="wrapper">
                <div class="field">
                    <label for="name">Name</label>
                    <input id="name" name="name" v-model="solution.name" required />
                </div>
                <div class="field">
                    <label for="persons">Persons</label>
                    <PersonList :handle-click-event="handleClick" :color-function="colorSelected" />
                </div>
                <div class="field">
                    <SessionForm v-model="solution.sessions" />
                </div>
                <BaseButton @click="handleSave" color="green">Save Solution</BaseButton>
                <BaseButton v-if="solution" @click="handleDelete" color="red">Delete Solution</BaseButton>
            </div>
        </form>
    </ModalComponent>
</template>

<script setup lang="ts">
import { type Solution, type Person } from '@/types/app'
import ModalComponent from '@/components/ui/ModalComponent.vue'
import PersonList from '@/components/shared/PersonList.vue'
import SessionForm from '@/components/forms/solution/SessionForm.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ref, onMounted } from 'vue'
import useSolutionState from '@/composables/useSolutionState'

const emit = defineEmits<{
    closeModal: []
}>()

const props = defineProps<{
    solutionProp?: Solution
}>()

const { saveSolutionToStorage, deleteSolutionFromStorage } = useSolutionState()

const solution = ref<Solution>({
    id: null,
    solved: false,
    changed: false,
    name: '',
    score: null,
    sessions: [],
    persons: [],
    theses: [],
    thesesIndictments: [],
    personIndictments: [],
})

const solutionPersons = ref<number[]>([])

function colorSelected(person: Person): string | null {
    return solutionPersons.value.includes(person.id) ? 'light-gray' : null
}

function handleClick(person: Person) {
    if (!solutionPersons.value.includes(person.id)) {
        solutionPersons.value.push(person.id)
    } else {
        solutionPersons.value = solutionPersons.value.filter(pId => pId !== person.id)
    }
}

function handleSave() {
    if (props.solutionProp) {
        console.log("Updating solution", solution.value)
        saveSolutionToStorage()
    } else {
        console.log("Saving a new solution", solution.value)
        solution.value.persons = solutionPersons.value
        saveSolutionToStorage(solution.value)
    }

    handleCloseModal()
}

function handleDelete() {
    deleteSolutionFromStorage()
    handleCloseModal()
}

function handleCloseModal() {
    emit('closeModal')
}

onMounted(() => {
    if (props.solutionProp) {
        const solutionToEdit = props.solutionProp
        solution.value = solutionToEdit
        solutionPersons.value = solutionToEdit.persons
    }
})
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
