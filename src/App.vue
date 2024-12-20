<script setup lang="ts">
import { ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import SolutionComponent from './components/SolutionComponent.vue';
import useSolution from './composables/useSolutionState'
import { type Solution, type SolutionElement } from '@/types/app';
import ImportForm from '@/components/ImportForm.vue';

const { loadSolution } = useSolution()

// TODO: Implement local storage for solutions
const solutionList: SolutionElement[] = [
    // { id: 1, title: 'Solution 1' },
]

const isCreationModalOpen = ref<boolean>(false)

const toggleCreationModal = () => {
    isCreationModalOpen.value = !isCreationModalOpen.value
}

const handleImprot = (solution: Solution) => {
    loadSolution(solution)
    toggleCreationModal()
}

const handleExport = () => {
    useSolution().exportSolution()
}
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent :list="solutionList" @import-modal-open="toggleCreationModal"
            @export-solution="handleExport" />
        <SolutionComponent class="solution" />
    </div>
    <ImportForm v-if="isCreationModalOpen" @close-modal="toggleCreationModal" @submit="handleImprot" />
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
