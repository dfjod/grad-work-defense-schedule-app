<script setup lang="ts">
import useSolutionState from '@/composables/useSolutionState';
import SessionComponent from '@/components/solution/SessionComponent.vue';
import SolutionToolbar from '@/components/solution/SolutionToolbar.vue';
import { computed } from 'vue';
import type { Solution } from '@/types/app';

const emit = defineEmits<{
    editSolution: [solution: Solution]
}>()

function handleEditSolution() {
    emit('editSolution', solution)
}

const { solutionLoaded, solution } = useSolutionState()
// TODO: Does this computed property belong here?

const solutionScore = computed(() => {
    return solution.score || null
})
</script>

<template>
    <div v-if="!solutionLoaded()" class="not-selected">
        Import a solution to get started
    </div>
    <div v-else class="selected">
        <SolutionToolbar :score="solutionScore" @edit-solution="handleEditSolution"/>
        <div v-if="!solution.solved" class="not-selected">
            Press Solve to see the solution
        </div>
        <div v-else class="session-wrapper">
            <SessionComponent v-for="session of solution.sessions" :key="session.id" :sessionId="session.id" />
        </div>
    </div>
</template>

<style scoped>
.not-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.selected {
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
}

.session-wrapper {
    margin-top: 20px;
}
</style>
