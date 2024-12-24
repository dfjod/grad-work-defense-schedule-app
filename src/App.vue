<script setup lang="ts">
import { ref, type Ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import SolutionComponent from './components/SolutionComponent.vue';
import useSolution from './composables/useSolutionState'
import { type Solution, type SolutionElement } from '@/types/app';
import ImportForm from '@/components/ImportForm.vue';
import PersonForm from './components/PersonForm.vue';
import ThesesForm from './components/ThesesForm.vue';

const { loadSolution } = useSolution()

// TODO: Implement local storage for solutions
const solutionList: SolutionElement[] = [
    // { id: 1, title: 'Solution 1' },
]

const isCreationModalOpen = ref<boolean>(false)
const isPersonFormOpen = ref<boolean>(false)
const isThesesFormOpen = ref<boolean>(false)

const handleImprot = (solution: Solution) => {
    loadSolution(solution)
    isCreationModalOpen.value = false
}

const handleExport = () => {
    useSolution().exportSolution()
}

const handleManagePersons = () => {
    isPersonFormOpen.value = true
}

const handleManageTheses = () => {
    isThesesFormOpen.value = true
}
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent
            :list="solutionList"
            @import-modal-open="isCreationModalOpen = true"
            @export-solution="handleExport"
            @manage-persons="handleManagePersons"
            @manage-theses="handleManageTheses"
        />
        <SolutionComponent class="solution" />
    </div>
    <ImportForm v-if="isCreationModalOpen" @close-modal="isCreationModalOpen = false" @submit="handleImprot" />
    <PersonForm v-if="isPersonFormOpen" @close-modal="isPersonFormOpen = false" />
    <ThesesForm v-if="isThesesFormOpen" @close-modal="isThesesFormOpen = false" />
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
