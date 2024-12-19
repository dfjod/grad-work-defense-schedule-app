<script setup lang="ts">
import useSolutionState from '@/composables/useSolutionState';
import SessionComponent from './SessionComponent.vue';
import ToolbarComponent from './ToolbarComponent.vue';

const { score, sessions, solutionLoaded, solved } = useSolutionState()
// TODO: Does this computed property belong here?
</script>

<template>
    <div v-if="!solutionLoaded()" class="not-selected">
        Import a solution to get started
    </div>
    <div v-else class="selected">
        <ToolbarComponent :score="score" />
        <div v-if="!solved" class="not-selected">
            Press Solve to see the solution
        </div>
        <div v-else class="session-wrapper">
            <SessionComponent v-for="session of sessions" :key="session.id" :session="session" />
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
