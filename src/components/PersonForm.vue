<template>
    <ModalComponent>
        <div class="wrapper">
            <BaseToolbar>
                <template #left></template>
                <template #middle></template>
                <template #right>
                    <BaseButton v-if="!showForm" @click="showForm = !showForm" color="green">Add Person</BaseButton>
                    <div v-if="showForm" class="form-buttons">
                        <BaseButton @click="handleSubmit" color="green">Save</BaseButton>
                        <BaseButton @click="showForm = !showForm" color="red">Close</BaseButton>
                    </div>
                </template>
            </BaseToolbar>
            <div v-if="!showForm" class="person-list">
                <div v-if="hasPersons">
                    <PersonFormSlot v-for="person of persons" :person="person" :key="person.id" @edit-person="handleEditPerson" />
                </div>
                <div v-else class="alert">
                    <p>Add a person to the list</p>
                </div>
            </div>
            <div v-else class="person-form">
                <form @submit.prevent="handleSubmit">
                    <div class="field">
                        <label for="name">Name</label>
                        <input id="name" name="name" v-model="person.name" />
                    </div>
                    <div class="field">
                        <TimeConstraintForm
                            :time-constraints="person.timeConstraints"
                            @save-time-constraint="handleSaveTimeConstraint"
                            @delete-time-constraint="handleDeleteTimeConstraint"
                        />
                    </div>
                </form>
                <BaseButton v-if="isSavedPerson" @click="handleDeletePerson" color="red">Delete</BaseButton>
            </div>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import { type Person } from '@/types/app';
import BaseButton from '@/components/BaseButton.vue';
import BaseToolbar from '@/components/BaseToolbar.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import PersonFormSlot from '@/components/PersonFormSlot.vue';
import usePersonState from '@/composables/usePersonState'
import TimeConstraintForm from '@/components/TimeConstraintForm.vue';
import { computed, ref } from 'vue'

const { persons, savePerson, deletePerson, saveTimeConstraint, deleteTimeConstraint } = usePersonState()
const hasPersons = computed(() => persons.value.length > 0)
const isSavedPerson = computed(() => person.value.id !== null)
const showForm = ref(false)
const person = ref<Person>({
    id: null,
    name: '',
    timeConstraints: [],
    indictments: [],
})

const resetPerson = () => {
    person.value = {
        id: null,
        name: '',
        timeConstraints: [],
        indictments: [],
    }
}

const handleSubmit = () => {
    console.log("Saving person", person.value)
    savePerson(person.value)
    resetPerson()
    showForm.value = false
}

const handleDeletePerson = () => {
    console.log("Deleting person", person.value)
    deletePerson(person.value)
    resetPerson()
    showForm.value = false
}

const handleSaveTimeConstraint = (constraintFrom: string, constraintTo: string) => {
    saveTimeConstraint(person.value, constraintFrom, constraintTo)
}

const handleDeleteTimeConstraint = (timeConstraintId: number) => {
    deleteTimeConstraint(person.value, timeConstraintId)
}

const handleEditPerson = (personToEdit: Person) => {
    console.log("Editing person", person)
    showForm.value = true
    person.value = personToEdit
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-buttons {
    display: flex;
    gap: 5px;
}

.person-list {
    text-align: center;
}

.person-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
