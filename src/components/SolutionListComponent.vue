<script setup lang="ts">
import { type SolutionElement } from '@/types/app';
import BaseButton from '@/components/BaseButton.vue';
import { computed } from 'vue';

const props = defineProps<{
  list: SolutionElement[]
}>()

const emit = defineEmits<{
    loadSolution: [id: number]
    importModalOpen: []
    exportSolution: []
    managePersons: []
    createSolution: []
}>()

function handleLoad(id: number) {
    emit('loadSolution', id)
}

function handleImport() {
    emit('importModalOpen')
}

function handleExport() {
    emit('exportSolution')
}

function handleManagePersons() {
    emit('managePersons')
}

function handleCreateSolution() {
    emit('createSolution')
}

const solutionsAvailable = computed(() => props.list.length > 0)
</script>

<template>
    <div class="list">
        <BaseButton @click="handleManagePersons" color="green">Manage persons</BaseButton>
        <BaseButton @click="handleCreateSolution" color="green">Create solution</BaseButton>
        <BaseButton @click="handleImport" color="green">Import</BaseButton>
        <BaseButton @click="handleExport" color="orange">Export</BaseButton>
        <div v-if="solutionsAvailable">
            <div v-for="schedule in props.list" :key="schedule.id">
                <BaseButton @click="handleLoad(schedule.id)">{{ schedule.title }}</BaseButton>
            </div>
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
