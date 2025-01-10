<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed } from 'vue'
import type { Solution } from '@/types/app';
import { ref } from 'vue'

const emit = defineEmits<{
    loadSolution: [solutionId: number]
    importModalOpen: []
    exportSolution: []
    managePersons: []
    createSolution: []
}>()

const solutions = ref(getSolutionAttributes())

function getSolutionAttributes() {
  const solutions = [];

  // Iterate through localStorage keys
  Object.keys(localStorage).forEach((key) => {
    // Check if the key starts with the "solution:" namespace
    if (key.startsWith("solution:")) {
      const item = JSON.parse(localStorage.getItem(key) || "{}");

      // Extract "id" and "name" if they exist
      if (item.id !== undefined && item.name !== undefined) {
        solutions.push({
          id: item.id,
          name: item.name,
        });
      }
    }
  });

  return solutions;
}

function handleLoad(solution: Solution) {
    emit('loadSolution', solution)
}

function handleManagePersons() {
    emit('managePersons')
}

function handleCreateSolution() {
    emit('createSolution')
}

// TODO: No solutions object, think of other way to check
const solutionsAvailable = computed(() => solutions.value.length > 0)
</script>

<template>
    <div class="list">
        <BaseButton @click="handleManagePersons" color="green">Manage persons</BaseButton>
        <BaseButton @click="handleCreateSolution" color="green">Create solution</BaseButton>
        <div v-if="solutionsAvailable" class="solutions">
            <div v-for="solution in solutions" :key="solution.id">
                <BaseButton @click="handleLoad(solution.id)">{{ solution.name }}</BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px;
    border-right: 2px solid var(--gray);
}

.solutions {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
</style>
