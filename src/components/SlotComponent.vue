<script setup lang="ts">
import type Thesis from '@/types/Thesis';
import type Person from '@/types/Person';
import useSolutionState from '@/composables/useSolutionState';
import { computed } from 'vue';

const props = defineProps<{
    thesis: Thesis
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
</script>

<template>
    <tr>
        <td>{{ author.name }}</td>
        <td>{{ thesis.title }}</td>
        <td>{{ supervisor.name }}</td>
        <td>{{ reviewer.name }}</td>
    </tr>
</template>
