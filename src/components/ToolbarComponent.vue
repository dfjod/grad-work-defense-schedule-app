<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue';
import SolutionTitle from '@/components/SolutionTitle.vue';
import useSolutionState from '@/composables/useSolutionState';

const props = defineProps<{
    score: string
}>()

const { solveSolution, loadSolutionApi } = useSolutionState()

const scoreLoaded = computed(() => {
    return props.score !== ""
})
</script>

<template>
    <div class="toolbar">
        <div class="left">
            <div v-if="scoreLoaded" class="score">
                Score: <strong>{{ props.score }}</strong>
            </div>
        </div>
        <div class="middle">
            <SolutionTitle />
        </div>
        <div class="right">
            <BaseButton @click="solveSolution" color="green">Solve</BaseButton>
            <BaseButton @click="loadSolutionApi" color="gray">Load</BaseButton>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.left, .middle, .right {
    display: flex;
    align-items: center;
}
</style>
