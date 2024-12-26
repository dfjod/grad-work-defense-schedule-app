<template>
    <ModalComponent>
        <h2>Create a Solution from Scratch</h2>
        <form @submit.prevent="saveSolution">
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
                <BaseButton @click="saveSolution" color="green">Save solution</BaseButton>
            </div>
        </form>
    </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import { type Solution, type Person } from '@/types/app'
import { ref } from 'vue'
import PersonList from './PersonList.vue'
import SessionForm from './SessionForm.vue'
import BaseButton from './BaseButton.vue'

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

const solutionPersons = ref<Person[]>([])

function colorSelected(person: Person): string | null {
    return solutionPersons.value.includes(person) ? 'light-gray' : null
}

function handleClick(person: Person) {
    if (!solutionPersons.value.includes(person)) {
        solutionPersons.value.push(person)
    } else {
        solutionPersons.value = solutionPersons.value.filter(p => p !== person)
    }
}

function saveSolution() {
    console.log('Solution saved:', solution);
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
