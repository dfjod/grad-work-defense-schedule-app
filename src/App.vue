<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import SolutionListComponent from '@/components/layout/SolutionListComponent.vue'
import SolutionComponent from '@/components/layout/SolutionComponent.vue'
import useSolution from '@/composables/useSolutionState'
import { type Solution } from '@/types/app'
import PersonForm from '@/components/forms/person/PersonForm.vue'
import SolutionForm from '@/components/forms/solution/SolutionForm.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'

const { loadSolutionFromStorage } = useSolution()

const isCreationModalOpen = ref<boolean>(false)
const isPersonModalOpen = ref<boolean>(false)

const toEdit = ref<Solution | null>(null)

function handleEditSolution(solution: Solution) {
    isCreationModalOpen.value = true
    toEdit.value = solution
}

function handleCloseCreationModal() {
    toEdit.value = null
    isCreationModalOpen.value = false
}

// Load data from localStorage
onBeforeMount(() => {
    usePersonState().loadPersons()
    useThesesState().loadTheses()
})
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent
            @manage-persons="isPersonModalOpen = true"
            @create-solution="isCreationModalOpen = true"
            @load-solution="loadSolutionFromStorage"
        />
        <SolutionComponent class="solution" @edit-solution="handleEditSolution" />
    </div>
    <PersonForm v-if="isPersonModalOpen" @close-modal="isPersonModalOpen = false" />
    <SolutionForm v-if="isCreationModalOpen" @close-modal="handleCloseCreationModal" :solution-prop="toEdit" />
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
