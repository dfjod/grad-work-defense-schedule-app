<template>
    <ModalComponent @close-modal="handleCloseModal">
        <h2>Create a Solution from Scratch</h2>
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
                <BaseButton @click="handleSave" color="green">Save solution</BaseButton>
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
import useSolutionsState from '@/composables/useSolutionsState'
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
    closeModal: []
}>()

const props = defineProps<{
    solutionId: number | null
}>()

const { saveSolution, getSolutionById } = useSolutionsState()

const solution = ref<Solution>({
    id: null,
    solved: false,
    changed: false,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    indictments: [],
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
    solution.value.persons = solutionPersons.value
    saveSolution(solution.value)
    handleCloseModal()
}

function handleCloseModal() {
    emit('closeModal')
}

onMounted(() => {
    if (props.solutionId) {
        const solutionToEdit = getSolutionById(props.solutionId)
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
