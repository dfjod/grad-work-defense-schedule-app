<template>
    <BaseToolbar>
        <template #left>
            <div v-if="score" class="indictment-buttons-wrapper">
                <div class="indictment-buttons">
                    <IndictmentObjectButton objectType="person" />
                    <IndictmentObjectButton objectType="thesis" />
                </div>
                <div class="indictment-buttons">
                    <IndictmentLevelButton level="hard" :score="score.hard" />
                    <IndictmentLevelButton level="medium" :score="score.medium" />
                    <IndictmentLevelButton level="soft" :score="score.soft" />
                </div>
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
import IndictmentLevelButton from '@/components/solution/IndictmentLevelButton.vue'
import IndictmentObjectButton from '@/components/solution/IndictmentObjectButton.vue'

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
.indictment-buttons {
    display: flex;
    gap: 10px;
}

.indictment-buttons-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
