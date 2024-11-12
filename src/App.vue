<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const schedule = ref({})

async function fetchData() {
    try {
        loading.value = true;
        const response = await fetch('/api/schedule')
        const json = await response.json()
        schedule.value = json
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="schedule">
        <button @click="fetchData">Fetch</button>
        <div v-if="schedule" class="schedule">
            <div v-for="(session, key) in schedule.sessions" :key="key" class="session">
                <div v-for="(thesis, key) in session.thesis" :key="key">
                    <span class="author">{{ thesis.firstName }} {{ thesis.lastName }}</span>
                    <span class="title">{{ thesis.title }}</span>
                    <span class="supervisor">{{ thesis.supervisor.firstName }} {{ thesis.supervisor.lastName }}</span>
                    <span class="reviewer">{{ thesis.reviewer.firstName }} {{ thesis.reviewer.lastName }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
