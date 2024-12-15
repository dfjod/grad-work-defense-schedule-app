<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import SolutionComponent from './components/SolutionComponent.vue';
import useSolution from './composables/useSolutionState'
import ModalComponent from './components/ModalComponent.vue';
import { type SolutionElement } from '@/types/app';

const { loadSolution } = useSolution()

// TODO: Implement local storage for solutions
const solutionList: SolutionElement[] = [
    { id: 1, title: 'Solution 1' },
]

const isCreationModalOpen: Ref<boolean> = ref(false)

const toggleCreationModal = () => {
    isCreationModalOpen.value = !isCreationModalOpen.value
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
    <ModalComponent v-if="isCreationModalOpen" @close-modal="toggleCreationModal"/>
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
