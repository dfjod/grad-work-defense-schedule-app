<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

async function fetchData() {
    try {
        loading.value = true;
        await fetch('/api/schedule')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="schedule">
        <div v-if="loading">. . .</div>
        <button @click="fetchData">Fetch</button>
    </div>
</template>

<style scoped></style>
