<script setup lang="ts">
import { ref } from 'vue'
import SessionComponent from './components/SessionComponent.vue'

const loading = ref(false)
const schedule = ref({})

async function fetchData() {
    try {
        loading.value = true;
        const response = await fetch('/api/solution').then(res => { return res.json()})
        schedule.value = response
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="wrapper">
        <button @click="fetchData">Fetch</button>
        <div v-if="schedule">
            <SessionComponent v-for="(session, key) in schedule.sessions" :key="key" :session="session" />
        </div>
    </div>
</template>

<style scoped>
</style>
