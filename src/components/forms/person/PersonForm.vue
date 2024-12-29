<template>
    <ModalComponent>
        <div class="wrapper">
            <BaseToolbar>
                <template #left></template>
                <template #middle></template>
                <template #right>
                    <BaseButton v-if="!showJson && !showForm" @click="showJson = !showJson" color="green">Import JSON</BaseButton>
                    <BaseButton v-if="!showForm && !showJson" @click="showForm = !showForm" color="green">Add Person</BaseButton>
                    <div v-if="showForm" class="form-buttons">
                        <BaseButton @click="handleSubmit" color="green">Save</BaseButton>
                        <BaseButton @click="showForm = !showForm" color="red">Close</BaseButton>
                    </div>
                    <div v-if="showJson" class="form-buttons">
                        <BaseButton @click="handleSubmitJson" color="green">Save</BaseButton>
                        <BaseButton @click="showJson = !showJson" color="red">Close</BaseButton>
                    </div>
                </template>
            </BaseToolbar>
            <div v-if="!showForm && !showJson" class="person-list-wrapper">
                <PersonList v-if="hasPersons" :handle-click-event="handleEditPerson" />
                <div v-else class="alert">
                    <p>Add a person to the list</p>
                </div>
            </div>
            <div v-else-if="showForm" class="person-form">
                <form @submit.prevent="handleSubmit" class="person-form">
                    <div class="field">
                        <label for="name">Name</label>
                        <input id="name" name="name" v-model="person.name" />
                    </div>
                    <div class="field">
                        <label for="isStudent">Is student</label>
                        <input id="isStudent" name="isStudent" type="checkbox" v-model="person.isStudent" />
                    </div>
                    <div class="field">
                        <TimeConstraintForm :time-constraints="person.timeConstraints"
                            @save-time-constraint="handleSaveTimeConstraint"
                            @delete-time-constraint="handleDeleteTimeConstraint" />
                    </div>
                    <div v-if="person.isStudent" class="field">
                        <ThesisForm :person="person" @save-thesis="handleSaveThesis"/>
                    </div>
                </form>
                <BaseButton v-if="isSavedPerson" @click="handleDeletePerson" color="red">Delete</BaseButton>
            </div>
            <div v-else-if="showJson" class="json-editor-container">
                <form @submit.prevent="handleSubmitJson">
                        <json-editor class="json-editor" mode="tree" :main-menu-bar="false" :navigation-bar="true"
                            v-model="personsJson" />
                </form>
            </div>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import { type Person } from '@/types/app'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseToolbar from '@/components/ui/BaseToolbar.vue'
import ModalComponent from '@/components/ui/ModalComponent.vue'
import usePersonState from '@/composables/usePersonState'
import TimeConstraintForm from '@/components/forms/person/TimeConstraintForm.vue'
import ThesisForm from '@/components/forms/person/ThesisForm.vue'
import JsonEditor from 'vue3-ts-jsoneditor'
import { computed, ref } from 'vue'
import PersonList from '@/components/shared/PersonList.vue'

const { persons, savePerson, deletePerson, saveTimeConstraint, deleteTimeConstraint } = usePersonState()
const hasPersons = computed(() => persons.value.length > 0)
const isSavedPerson = computed(() => person.value.id !== null)
const showForm = ref(false)
const showJson = ref(false)

const personsJson = ref<Person[]>([
    {
        id: null,
        name: 'Example Person',
        isStudent: false,
        timeConstraints: [],
        indictments: [],
    }
])

const person = ref<Person>({
    id: null,
    name: '',
    isStudent: false,
    timeConstraints: [],
    indictments: [],
})

const resetPerson = () => {
    person.value = {
        id: null,
        name: '',
        isStudent: false,
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

const handleSubmitJson = () => {
    console.log("Saving persons", personsJson.value)
    personsJson.value.forEach(person => savePerson(person))
    personsJson.value = []
    showJson.value = false
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

const handleSaveThesis = (thesisId: number) => {
    person.value.thesis = thesisId
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
