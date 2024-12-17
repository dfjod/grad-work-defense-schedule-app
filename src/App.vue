<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import SolutionComponent from './components/SolutionComponent.vue';
import useSolution from './composables/useSolutionState'
import { type Solution, type SolutionElement } from '@/types/app';
import CreationForm from '@/components/CreationForm.vue';

const { loadSolution } = useSolution()

// TODO: Implement local storage for solutions
const solutionList: SolutionElement[] = [
    { id: 1, title: 'Solution 1' },
]

const isCreationModalOpen = ref<boolean>(false)

const toggleCreationModal = () => {
    isCreationModalOpen.value = !isCreationModalOpen.value
}

const handleSolutionCreation = (solution: Solution) => {
    console.log(solution)
    toggleCreationModal()
}

onMounted(async () => {
})
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent v-if="solutionList.length > 0" :list="solutionList" @load-solution="loadSolution"
            @creation-modal-open="toggleCreationModal" />
        <SolutionComponent class="solution" />
    </div>
    <CreationForm v-if="isCreationModalOpen" @close-modal="toggleCreationModal" @submit="handleSolutionCreation"/>
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
