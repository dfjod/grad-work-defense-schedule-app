<script setup lang="ts">
import type Solution from '@/types/Solution';
import type Person from '@/types/Person';
import type Thesis from '@/types/Thesis';
import type Session from '@/types/Session';

import SolutionSession from './SolutionSession.vue';
import { type Ref } from 'vue';

const solution = defineModel<Solution | null>('solution')
</script>

<template>
    <div class="solution-view">
        <div v-if="!solution">
            Select a solution from the list
        </div>
        <div v-else>
            <SolutionSession v-for="session of solution.sessions" :key="session.id" :session="session"/>
        </div>
    </div>
</template>
