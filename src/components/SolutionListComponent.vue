<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { computed } from 'vue'
import useSolutionsState from '@/composables/useSolutionsState'
import type { Solution } from '@/types/app';

const emit = defineEmits<{
    loadSolution: [solution: Solution]
    importModalOpen: []
    exportSolution: []
    managePersons: []
    createSolution: []
}>()

const { solutions } = useSolutionsState()

function handleLoad(solution: Solution) {
    emit('loadSolution', solution)
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

const solutionsAvailable = computed(() => solutions.value.length > 0)
</script>

<template>
    <div class="list">
        <BaseButton @click="handleManagePersons" color="green">Manage persons</BaseButton>
        <BaseButton @click="handleCreateSolution" color="green">Create solution</BaseButton>
        <BaseButton @click="handleImport" color="green">Import</BaseButton>
        <BaseButton @click="handleExport" color="orange">Export</BaseButton>
        <div v-if="solutionsAvailable" class="solutions">
            <div v-for="solution in solutions" :key="solution.id">
                <BaseButton @click="handleLoad(solution)">{{ solution.name }}</BaseButton>
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

.solutions {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
</style>
