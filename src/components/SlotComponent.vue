<script setup lang="ts">
import { type Thesis, type Person } from '@/types/app';
import useSolutionState from '@/composables/useSolutionState';
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
    thesis: Thesis
    // indictments: Indictment[]
}>()

const { persons } = useSolutionState()

const author = computed<Person>(() => persons.value.filter(person => {
    return person.id === props.thesis.author
})[0])
const reviewer = computed<Person>(() => persons.value.filter(person => {
    return person.id === props.thesis.reviewer
})[0])
const supervisor = computed<Person>(() => persons.value.filter(person => {
    return person.id === props.thesis.supervisor
})[0])

const showIndictments = ref<boolean>(false)
</script>

<template>
    <div v-show="showIndictments">
    </div>
    <tr @mouseover="showIndictments = true" @mouseleave="showIndictments = false">
        <td>{{ author.name }}</td>
        <td>{{ thesis.title }}</td>
        <td>{{ supervisor.name }}</td>
        <td>{{ reviewer.name }}</td>
    </tr>
</template>

<style scoped>
td {
    padding: 10px;
    background-color: var(--gray);
}

td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

td:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}
</style>
