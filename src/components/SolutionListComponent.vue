<script setup lang="ts">
import { type SolutionElement } from '@/types/app';
import BaseButton from '@/components/BaseButton.vue';

const props = defineProps<{
  list: SolutionElement[]
}>()

const emit = defineEmits<{
    loadSolution: [id: number]
    creationModalOpen: []
}>()

function handleLoad(id: number) {
    emit('loadSolution', id)
}

function handleCreate() {
    emit('creationModalOpen')
}
</script>

<template>
    <div class="list">
        <BaseButton @click="handleCreate" color="green">Create New Solution</BaseButton>
        <div v-for="schedule in props.list" :key="schedule.id">
            <BaseButton @click="handleLoad(schedule.id)">{{ schedule.title }}</BaseButton>
        </div>
    </div>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px;
    border-right: 2px solid var(--gray);
}
</style>
