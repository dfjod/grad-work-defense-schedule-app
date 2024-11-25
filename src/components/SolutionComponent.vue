<script setup lang="ts">
import useSolutionState from '@/composables/useSolutionState';
import SessionComponent from './SessionComponent.vue';

const { sessions, solutionLoaded } = useSolutionState()
</script>

<template>
    <div class="solution-view">
        <div v-if="!solutionLoaded()">
            Select a solution from the list
        </div>
        <div v-else>
            <SessionComponent v-for="session of sessions" :key="session.id" :session="session" />
        </div>
    </div>
</template>
