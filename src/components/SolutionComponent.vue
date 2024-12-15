<script setup lang="ts">
import useSolutionState from '@/composables/useSolutionState';
import SessionComponent from './SessionComponent.vue';
import ToolbarComponent from './ToolbarComponent.vue';
import { computed } from 'vue';

const { id, score, sessions, loadScore } = useSolutionState()
// TODO: Does this computed property belong here?
const solutionLoaded = computed(() => id.value !== null)
</script>

<template>
    <div v-if="!solutionLoaded" class="not-selected">
        Select a solution from the list
    </div>
    <div v-else class="selected">
        <ToolbarComponent :score="score" @load-score="loadScore" />
        <SessionComponent v-for="session of sessions" :key="session.id" :session="session" />
    </div>
</template>

<style scoped>
.not-selected {
    display: flex;
    justify-content: center;
    align-items: center;
}

.selected {
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
</style>
