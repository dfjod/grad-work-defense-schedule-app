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
        <form v-if="showForm" @submit.prevent="handleThesisSave">
            <div class="field">
                <label for="name">Name</label>
                <input id="name" name="name" v-model="thesisTemp.name" />
            </div>
            <div class="field">
                <label for="supervisor">Supervisor</label>
                <select id="supervisor" name="supervisor" v-model="thesisTemp.supervisor">
                    <option v-for="staff in getAcademicStaff()" :key="staff.id" :value="staff.id">{{ staff.name }}
                    </option>
                </select>
            </div>
            <div class="field">

                <label for="reviewer">Reviewer</label>
                <select id="reviewer" name="reviewer" v-model="thesisTemp.reviewer">
                    <option v-for="staff in getAcademicStaff()" :key="staff.id" :value="staff.id">{{ staff.name }}
                    </option>
                </select>
            </div>
            <div class="form-buttons">
                <BaseButton @click.prevent="handleThesisSave" color="green">Save Thesis</BaseButton>
                <BaseButton @click="handleCloseThesisForm" color="red">Close Thesis</BaseButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { type Thesis } from '@/types/app'
import BaseButton from '@/components/ui/BaseButton.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import { computed, ref } from 'vue'

const thesis = defineModel<Thesis>()

const thesisTemp = ref<Thesis>({ ...thesis.value })

const { validateThesis } = useThesesState()
const { getAcademicStaff } = usePersonState()

const hasThesis = computed(() => {
    return thesis.value.name !== '' && thesis.value.supervisor !== null && thesis.value.reviewer !== null
})
const showForm = ref(false)

// Close the form and merge the temporary thesis with the original thesis
const handleThesisSave = () => {
    const thesisErrors = validateThesis(thesisTemp.value)

    if (thesisErrors.length > 0) {
        for (const error of thesisErrors) {
            console.error(error)
        }
    } else {
        thesis.value = { ...thesisTemp.value }
        showForm.value = false
    }
}

// Close the form and reset it to the original thesis
const handleCloseThesisForm = () => {
    thesisTemp.value = { ...thesis.value }
    showForm.value = false
}
</script>

<style scoped>
.form-buttons {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}
</style>
