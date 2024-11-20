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
