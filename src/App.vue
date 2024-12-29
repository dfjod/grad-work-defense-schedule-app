<script setup lang="ts">
import { ref } from 'vue'
import SolutionListComponent from '@/components/layout/SolutionListComponent.vue'
import SolutionComponent from '@/components/layout/SolutionComponent.vue'
import useSolution from './composables/useSolutionState'
import { type Solution } from '@/types/app';
import ImportForm from '@/components/forms/import/ImportForm.vue';
import PersonForm from './components/forms/person/PersonForm.vue';
import SolutionForm from './components/forms/solution/SolutionForm.vue';

const { loadSolution } = useSolution()

const isImportModalOpen = ref<boolean>(false)
const isCreationModalOpen = ref<boolean>(false)
const isPersonModalOpen = ref<boolean>(false)

const toEdit = ref<number | null>(null)

const handleImprot = (solution: Solution) => {
    loadSolution(solution)
    isImportModalOpen.value = false
}

const handleExport = () => {
    useSolution().exportSolution()
}

function handleEditSolution(solutionId: number) {
    isCreationModalOpen.value = true
    toEdit.value = solutionId
}

function handleCloseCreationModal() {
    toEdit.value = null
    isCreationModalOpen.value = false
}
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent
            @import-modal-open="isImportModalOpen = true"
            @export-solution="handleExport"
            @manage-persons="isPersonModalOpen = true"
            @create-solution="isCreationModalOpen = true"
            @load-solution="loadSolution"
        />
        <SolutionComponent class="solution" @edit-solution="handleEditSolution" />
    </div>
    <ImportForm v-if="isImportModalOpen" @close-modal="isImportModalOpen = false" @submit="handleImprot" />
    <PersonForm v-if="isPersonModalOpen" @close-modal="isPersonModalOpen = false" />
    <SolutionForm v-if="isCreationModalOpen" @close-modal="handleCloseCreationModal" :solution-id="toEdit" />
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
