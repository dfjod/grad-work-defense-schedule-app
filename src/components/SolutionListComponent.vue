<script setup lang="ts">
import type ListSchedule from '@/types/ListSchedule';

const props = defineProps<{
  list: ListSchedule[]
}>()

const emit = defineEmits<{
    loadSolution: [id: number]
}>()
</script>

<template>
    <div class="list">
        <div v-for="schedule in props.list" :key="schedule.id">
            <button @click="emit('loadSolution', schedule.id)">{{ schedule.title }}</button>
        </div>
    </div>
</template>

<style scoped>
button {
    width: 100%;
    padding: 10px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: var(--gray);
    cursor: pointer;
}

.list {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px;
    border-right: 2px solid var(--gray);
}
</style>
