<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import SolutionList from './components/SolutionList.vue'
import type ListSchedule from '@/types/ListSchedule';
import type Solution from '@/types/Solution';
import SolutionView from './components/SolutionView.vue';
import type SolutionJson from './types/api/SolutionJson';
import { transformSolution } from './utils/SolutionUtils';

const fetchData = async <T>(path: string): Promise<T> => {
    const response = await fetch(`http://localhost:3030${path}`)

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return await response.json() as T
}

const loadSolution = async (solutionId: number) => {
    console.log(solutionId)
    const fetchedSolution = await fetchData<SolutionJson>(`/api/solution?id=${solutionId}`)
    console.log(fetchedSolution)
    const transformedSolution = transformSolution(fetchedSolution)
    console.log(transformedSolution)
    solution.value = transformedSolution
}

const solutionList: Ref<ListSchedule[]> = ref([])
const solution: Ref<Solution | null> = ref(null)

onMounted(async () => {
    solutionList.value = await fetchData<ListSchedule[]>('/api/list')
})
</script>

<template>
    <SolutionList v-if="solutionList.length > 0" :list="solutionList" @load-solution="loadSolution"/>
    <SolutionView v-model:solution="solution" />
</template>

<style scoped>
</style>
