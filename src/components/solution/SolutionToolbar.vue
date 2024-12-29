<template>
    <BaseToolbar>
        <template #left>
            <div v-if="score" class="score">
                <IndictmentButton level="Hard" :score="score.hard" />
                <IndictmentButton level="Medium" :score="score.medium" />
                <IndictmentButton level="Soft" :score="score.soft" />
            </div>
        </template>
        <template #middle>
            <SolutionTitle />
        </template>
        <template #right>
            <BaseButton @click="solveSolution" color="green">Solve</BaseButton>
            <BaseButton @click="loadSolutionApi" color="gray">Load</BaseButton>
            <BaseButton @click="loadIndictments" color="gray">Indictments</BaseButton>
            <BaseButton @click="printSolution" color="gray">Print</BaseButton>
            <BaseButton @click="printSolvePayload" color="gray">Payload</BaseButton>
            <BaseButton @click="handleEditSolution" color="green">Edit</BaseButton>
        </template>
    </BaseToolbar>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SolutionTitle from '@/components/solution/SolutionTitle.vue'
import useSolutionState from '@/composables/useSolutionState'
import BaseToolbar from '@/components/ui/BaseToolbar.vue'
import type { Score } from '@/types/app'
import IndictmentButton from './IndictmentButton.vue'

defineProps<{
    score: Score | null
}>()

const emits = defineEmits<{
    editSolution: [solutionId: number]
}>()

const { solveSolution, loadSolutionApi, loadIndictments, printSolution, printSolvePayload, solution } = useSolutionState()

function handleEditSolution() {
    emits('editSolution', solution.id)
}
</script>

<style scoped>
.score {
    display: flex;
    gap: 10px;
}
</style>
