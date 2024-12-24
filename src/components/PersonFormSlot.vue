<template>
    <div class="person" @click="handleClick">
        {{ person.name }}
    </div>
</template>

<script setup lang="ts">
import type { Person } from '@/types/app';

const emit = defineEmits<{
    (e: 'editPerson', person: Person): void
}>()

const props = defineProps<{
    person: Person
}>()

const handleClick = () => {
    emit('editPerson', props.person)
}
</script>

<style scoped>
.person {
    padding: 10px;
    background-color: var(--gray);
    border-radius: 10px;
}

.person:hover {
    cursor: pointer;
}
</style>
