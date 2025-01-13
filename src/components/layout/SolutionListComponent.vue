<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed } from 'vue'
import type { Solution } from '@/types/app'
import { ref } from 'vue'
import emitter from '@/services/mitt'
import useSolutionState from '@/composables/useSolutionState'

const emit = defineEmits<{
    loadSolution: [solutionId: number]
    importModalOpen: []
    exportSolution: []
    managePersons: []
    createSolution: []
}>()

const { getSolutionsForList } = useSolutionState()

const solutions = ref(getSolutionsForList())

function handleLoad(solution: Solution) {
    emit('loadSolution', solution)
}

function handleManagePersons() {
    emit('managePersons')
}

function handleCreateSolution() {
    emit('createSolution')
}

// TODO: No solutions object, think of other way to check
const solutionsAvailable = computed(() => solutions.value.length > 0)

emitter.on('solution-saved', () => {
    solutions.value = getSolutionsForList()
})

emitter.on('solution-deleted', () => {
    solutions.value = getSolutionsForList()
})
</script>

<template>
    <div class="list">
        <BaseButton @click="handleManagePersons" color="green">Manage persons</BaseButton>
        <BaseButton @click="handleCreateSolution" color="green">Create solution</BaseButton>
        <div v-if="solutionsAvailable" class="solutions">
            <div v-for="solution in solutions" :key="solution.id">
                <BaseButton @click="handleLoad(solution.id)">{{ solution.name }}</BaseButton>
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
