<script setup lang="ts">
import { ref, type Ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import SolutionComponent from './components/SolutionComponent.vue';
import useSolution from './composables/useSolutionState'
import { type Solution } from '@/types/app';
import ImportForm from '@/components/ImportForm.vue';
import PersonForm from './components/PersonForm.vue';
import SolutionForm from './components/SolutionForm.vue';

const { loadSolution } = useSolution()

const isImportModalOpen = ref<boolean>(false)
const isCreationModalOpen = ref<boolean>(false)
const isPersonModalOpen = ref<boolean>(false)

const handleImprot = (solution: Solution) => {
    loadSolution(solution)
    isImportModalOpen.value = false
}

const handleExport = () => {
    useSolution().exportSolution()
}
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent
            @import-modal-open="isImportModalOpen = true"
            @export-solution="handleExport"
            @manage-persons="isPersonModalOpen = true"
            @create-solution="isCreationModalOpen = true"
        />
        <SolutionComponent class="solution" />
    </div>
    <ImportForm v-if="isImportModalOpen" @close-modal="isImportModalOpen = false" @submit="handleImprot" />
    <PersonForm v-if="isPersonModalOpen" @close-modal="isPersonModalOpen = false" />
    <SolutionForm v-if="isCreationModalOpen" @close-modal="isCreationModalOpen = false" />
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
