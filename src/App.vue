<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import SolutionListComponent from './components/SolutionListComponent.vue'
import type ListSchedule from '@/types/ListSchedule';
import SolutionComponent from './components/SolutionComponent.vue';
import fetchData from './utils/Fetch';
import useSolution from './composables/useSolutionState'

const { loadSolution } = useSolution()
const solutionList: Ref<ListSchedule[]> = ref([])

onMounted(async () => {
    solutionList.value = await fetchData<ListSchedule[]>('/api/list')
})
</script>

<template>
    <div class="wrapper">
        <SolutionListComponent v-if="solutionList.length > 0" :list="solutionList" @load-solution="loadSolution" />
        <SolutionComponent class="solution" />
    </div>
</template>

<style>
.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    height: inherit;
}
</style>
