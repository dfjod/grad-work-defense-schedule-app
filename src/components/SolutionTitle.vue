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
            <label @click="toggleEdit"> {{ name }} </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSolutionState from '@/composables/useSolutionState';

const vFocus = (el: HTMLInputElement) => {
    el.focus()
}

const { name, changeName } = useSolutionState()

const edit = ref(false)
const solutionName = ref<string>(name.value)

const handleSave = () => {
    changeName(solutionName.value)
    toggleEdit()
}

const toggleEdit = () => {
    edit.value = !edit.value
}
</script>

<style scoped>

</style>
