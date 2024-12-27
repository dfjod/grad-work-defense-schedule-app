<template>
    <BaseToolbar>
        <template #left>
            <div v-if="scoreLoaded" class="score">
                Score: <strong>{{ props.score }}</strong>
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
import { computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue';
import SolutionTitle from '@/components/SolutionTitle.vue';
import useSolutionState from '@/composables/useSolutionState';
import BaseToolbar from './BaseToolbar.vue';

const props = defineProps<{
    score: string
}>()

const emit = defineEmits<{
    editSolution: [solutionId: number]
}>()

const { solveSolution, loadSolutionApi, loadIndictments, printSolution, printSolvePayload, solution } = useSolutionState()

const scoreLoaded = computed(() => {
    return props.score !== ""
})

function handleEditSolution() {
    console.log('editSolution', solution.id)
    emit('editSolution', solution.id)
}
</script>
