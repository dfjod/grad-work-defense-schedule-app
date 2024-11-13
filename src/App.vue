<script setup lang="ts">
import { ref } from 'vue'
import draggableComponent from "vuedraggable";

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
    <div class="wrapper">
        <button @click="fetchData">Fetch</button>
        <div v-if="schedule">
            <table v-for="(session, key) in schedule.sessions" :key="key">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Supervisor</th>
                        <th>Reviewer</th>
                    </tr>
                </thead>
                <draggableComponent v-model="session.thesis" tag="tbody">
                    <template #item="{ element }">
                        <tr :key="element.id">
                            <td>{{ element.firstName }} {{ element.lastName }}</td>
                            <td>{{ element.title }}</td>
                            <td>{{ element.supervisor.firstName }} {{ element.supervisor.lastName }}</td>
                            <td>{{ element.reviewer.firstName }} {{ element.reviewer.lastName }}</td>
                        </tr>
                    </template>
                </draggableComponent>
            </table>
        </div>
    </div>
</template>

<style scoped>
th {
    text-align: start;
    font-weight: bold;
}
</style>
