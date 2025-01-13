<template>
    <ModalComponent @close-modal="handleCloseModal">
        <h2 v-if="solutionProp" @click="console.log(solution)">Edit Solution</h2>
        <h2 v-else @click="console.log(solution)">Create a Solution from Scratch</h2>
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
                <BaseButton @click.prevent="handleSave" color="green">Save Solution</BaseButton>
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

const { saveSolutionToStorage, deleteSolutionFromStorage, validateSolution } = useSolutionState()

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

function colorSelected(person: Person): string | null {
    return solution.value.persons.includes(person.id) ? 'light-gray' : null
}

function handleClick(person: Person) {
    if (!solution.value.persons.includes(person.id)) {
        solution.value.persons.push(person.id)
    } else {
        solution.value.persons = solution.value.persons.filter(pId => pId !== person.id)
    }
}

function handleSave() {
    const messages = validateSolution(solution.value)

    if (messages.length > 0) {
        for (const message of messages) {
            console.error(message)
        }
        return
    }

    if (props.solutionProp) {
        console.log("Updating solution", solution.value)
        saveSolutionToStorage()
    } else {
        console.log("Saving a new solution", solution.value)
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
