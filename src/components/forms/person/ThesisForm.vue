<template>
    <div v-if="hasThesis && !showForm">
        <div class="thesis">
            <p>{{ thesis.name }}</p>
            <p>Supervisor: {{ getAcademicStaff().find(staff => staff.id === thesis.supervisor)?.name }}</p>
            <p>Reviewer: {{ getAcademicStaff().find(staff => staff.id === thesis.reviewer)?.name }}</p>
        </div>
        <BaseButton @click="showForm = true" color="green">Edit Thesis</BaseButton>
    </div>
    <div v-else>
        <BaseButton v-if="!showForm" @click="showForm = true" color="gray">Add Thesis</BaseButton>
        <form v-if="showForm" @submit.prevent="handleThesisSubmit">
            <div class="field">
                <label for="name">Name</label>
                <input id="name" name="name" v-model="thesis.name" />
            </div>
            <div class="field">
                <label for="supervisor">Supervisor</label>
                <select id="supervisor" name="supervisor" v-model="thesis.supervisor">
                    <option v-for="staff in getAcademicStaff()" :key="staff.id" :value="staff.id">{{ staff.name }}
                    </option>
                </select>
            </div>
            <div class="field">

                <label for="reviewer">Reviewer</label>
                <select id="reviewer" name="reviewer" v-model="thesis.reviewer">
                    <option v-for="staff in getAcademicStaff()" :key="staff.id" :value="staff.id">{{ staff.name }}
                    </option>
                </select>
            </div>
            <div class="form-buttons">
                <BaseButton @click="handleThesisSubmit" color="green">Save Thesis</BaseButton>
                <BaseButton @click="handleCloseThesisForm" color="red">Close Thesis</BaseButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { type Thesis, type Person } from '@/types/app'
import BaseButton from '@/components/ui/BaseButton.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
    person: Person
}>()

const emit = defineEmits<{
    (e: 'saveThesis', thesisId: number): void
    (e: 'deleteTimeConstraint', timeConstraintId: number): void
}>()

const { getAcademicStaff } = usePersonState()
const { saveThesis, findThesisById } = useThesesState()

const hasThesis = computed(() => !!thesis.value.id)
const showForm = ref(false)

const thesis = ref<Thesis>({
    id: null,
    name: '',
    author: props.person.id,
    supervisor: null,
    reviewer: null,
    indictments: [],
})

const handleThesisSubmit = () => {
    const thesisId = saveThesis(thesis.value)
    emit('saveThesis', thesisId)
    showForm.value = false
}

const handleCloseThesisForm = () => {
    showForm.value = false
}

onMounted(() => {
    if (props.person.thesis) {
        const existingThesis = findThesisById(props.person.thesis)
        if (existingThesis) {
            thesis.value = JSON.parse(JSON.stringify(existingThesis))
        } else {
            console.error(`Thesis with id ${props.person.thesis} not found`)
        }
    }
})
</script>

<style scoped>
.form-buttons {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}
</style>
