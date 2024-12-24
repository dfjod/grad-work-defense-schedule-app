<template>
    <div class="wrapper">
        <span class="time-constraint">{{ timeConstraint.from }} - {{ timeConstraint.to }}</span>
        <BaseButton class="time-constraint-delete" @click="handleDeleteTimeConstraint" color="red">Delete</BaseButton>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import type { TimeConstraint } from '@/types/app';

const props = defineProps<{
    timeConstraint: TimeConstraint
}>()

const emit = defineEmits<{
    (e: 'deleteTimeConstraint', timeConstraintId: number): void
}>()

const handleDeleteTimeConstraint = () => {
    emit('deleteTimeConstraint', props.timeConstraint.id)
}
</script>

<style scoped>
.wrapper {
    display: flex;
    gap: 5px;
}

.time-constraint {
    padding: 10px;
    background-color: var(--gray);
    border-radius: 10px;
    width: auto;
}

.time-constraint-delete {
    max-width: 100px;
}
</style>
