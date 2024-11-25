<script setup lang="ts">
import useSolutionState from '@/composables/useSolutionState';
import SessionComponent from './SessionComponent.vue';

const { sessions, solutionLoaded } = useSolutionState()
</script>

<template>
    <div v-if="!solutionLoaded()" class="not-selected">
        Select a solution from the list
    </div>
    <div v-else class="selected">
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
