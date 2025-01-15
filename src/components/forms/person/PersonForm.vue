<template>
    <ModalComponent>
        <div class="wrapper">
            <BaseToolbar>
                <template #left>
                    <h2 v-if="showForm && !editing">Create a person</h2>
                    <h2 v-else-if="showForm && editing">Edit a person</h2>
                </template>
                <template #middle></template>
                <template #right>
                    <BaseButton v-if="!showForm" @click="showForm = !showForm" color="green">Add Person</BaseButton>
                    <div v-if="showForm" class="form-buttons">
                        <BaseButton @click="handleSavePerson" color="green">Save</BaseButton>
                        <BaseButton @click="handleClosePerson" color="red">Close</BaseButton>
                    </div>
                </template>
            </BaseToolbar>
            <div v-if="!showForm" class="person-list-wrapper">
                <PersonList v-if="hasPersons" :handle-click-event="handleEditPerson" />
                <div v-else class="alert">
                    <p>Add a person to the list</p>
                </div>
            </div>
            <div v-else-if="showForm" class="person-form">
                <form @submit.prevent="handleSavePerson" class="person-form">
                    <div class="field">
                        <label for="name">Name</label>
                        <input id="name" name="name" v-model="person.name" />
                    </div>
                    <div class="field" v-if="!editing">
                        <label for="isStudent">Is student</label>
                        <input id="isStudent" name="isStudent" type="checkbox" v-model="person.isStudent" />
                    </div>
                    <div class="field">
                        <TimeConstraintForm :time-constraints="person.timeConstraints"
                            @save-time-constraint="handleSaveTimeConstraint"
                            @delete-time-constraint="handleDeleteTimeConstraint" />
                    </div>
                    <div v-if="person.isStudent" class="field">
                        <ThesisForm v-model="thesis" />
                    </div>
                </form>
                <BaseButton v-if="isSavedPerson" @click="handleDeletePerson" color="red">Delete</BaseButton>
            </div>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import type { Thesis, Person } from '@/types/app'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseToolbar from '@/components/ui/BaseToolbar.vue'
import ModalComponent from '@/components/ui/ModalComponent.vue'
import usePersonState from '@/composables/usePersonState'
import TimeConstraintForm from '@/components/forms/person/TimeConstraintForm.vue'
import ThesisForm from '@/components/forms/person/ThesisForm.vue'
import { computed, ref } from 'vue'
import PersonList from '@/components/shared/PersonList.vue'
import useThesesState from '@/composables/useThesesState'

const { persons, savePerson, deletePerson, saveTimeConstraint, deleteTimeConstraint, validatePerson } = usePersonState()
const { saveThesis, findThesisById, validateThesis } = useThesesState()
const hasPersons = computed(() => persons.value.length > 0)
const isSavedPerson = computed(() => person.value.id !== null)
const showForm = ref(false)
const editing = ref(false)

const person = ref<Person>({
    id: null,
    name: '',
    isStudent: false,
    timeConstraints: [],
    indictments: [],
})

const thesis = ref<Thesis>({
    id: null,
    name: '',
    author: null,
    supervisor: null,
    reviewer: null,
})

const resetFormState = () => {
    person.value = {
        id: null,
        name: '',
        isStudent: false,
        timeConstraints: [],
        indictments: [],
    }

    thesis.value = {
        id: null,
        name: '',
        author: null,
        supervisor: null,
        reviewer: null,
    }
}

const handleSavePerson = () => {
    if (!validatePerson(person.value)) {
        return
    }

    if (person.value.isStudent) {
        const thesisErrors = validateThesis(thesis.value)

        if (thesisErrors.length > 0) {
            console.error("A student must have a valid thesis")
            return
        }

        const personId = savePerson(person.value)

        thesis.value.author = personId

        const thesisId = saveThesis(thesis.value)
        person.value.thesis = thesisId
    } else {
        savePerson(person.value)
    }


    resetFormState()
    showForm.value = false
}

const handleDeletePerson = () => {
    deletePerson(person.value)
    resetFormState()
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
    editing.value = true
    // Create a deep copy instead of shallow
    person.value = JSON.parse(JSON.stringify(personToEdit))
    thesis.value = { ...findThesisById(personToEdit.thesis) }
    showForm.value = true
}

const handleClosePerson = () => {
    resetFormState()
    showForm.value = false
    editing.value = false
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
}

.form-buttons {
    display: flex;
    gap: 5px;
}

.person-list-wrapper {
    text-align: center;
}

.person-list {
    display: flex;
    gap: 5px;
}

.person-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.json-editor-container {
  flex-grow: 1;
  overflow: auto;
}

.json-editor-container form {
    height: 100%;
}

.json-editor {
  height: 100%;
}
</style>
