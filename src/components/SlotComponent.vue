<script setup lang="ts">
import { type Thesis, type Person } from '@/types/app';
import useSolutionState from '@/composables/useSolutionState';
import { ref, computed } from 'vue';
import SlotData from './SlotData.vue';

const props = defineProps<{
    thesisId: number
}>()

const { theses, persons } = useSolutionState()

const thesis = computed(() => theses.value.filter(thesis => {
    return thesis.id === props.thesisId
})[0])

const author = computed<Person>(() => persons.value.filter(person => {
    return person.id === thesis.value.author
})[0])

const reviewer = computed<Person>(() => persons.value.filter(person => {
    return person.id === thesis.value.reviewer
})[0])

const supervisor = computed<Person>(() => persons.value.filter(person => {
    return person.id === thesis.value.supervisor
})[0])

function hasIndictment(obj: Person | Thesis): boolean {
    return obj.indictments.length > 0
}

const showIndictments = ref<boolean>(false)
</script>

<template>
    <tr @mouseover="showIndictments = true" @mouseleave="showIndictments = false">
        <SlotData :object="author" :hasIndictment="hasIndictment(author)" />
        <SlotData :object="thesis" :hasIndictment="hasIndictment(thesis)" />
        <SlotData :object="supervisor" :hasIndictment="hasIndictment(supervisor)" />
        <SlotData :object="reviewer" :hasIndictment="hasIndictment(reviewer)" />
    </tr>
</template>

<style scoped>
</style>
