<template>
    <div>
        <input
            v-if="edit"
            v-model="solutionName"
            @blur="toggleEdit"
            @keyup.enter="handleSave"
            @focus="event => event.target?.select()"
            v-focus
        >
        <div v-else>
            <label @click="toggleEdit"> {{ solution.name }} </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSolutionState from '@/composables/useSolutionState';

const vFocus = (el: HTMLInputElement) => {
    el.focus()
}

const { solution, changeName } = useSolutionState()

const edit = ref(false)
const solutionName = ref<string>(solution.name)

const handleSave = () => {
    changeName(solutionName.value)
    toggleEdit()
}

const toggleEdit = () => {
    solutionName.value = solution.name
    edit.value = !edit.value
}
</script>

<style scoped>

</style>
