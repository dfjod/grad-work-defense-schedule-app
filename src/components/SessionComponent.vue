<script setup lang="ts">
import draggableComponent from "vuedraggable"
import { ref } from 'vue'
const props = defineProps(['session'])

const date = ref(new Date(props.session.startTime))
const theses = ref(props.session.theses)

const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit'
}

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date.value)
</script>

<template>
    <div class="session">
        <div class="row">
            <div class="title">Session #{{ session.id + 1 }}</div>
            <div class="details">
                <div class="date">{{ formattedDate }}</div>
                <div class="place">
                    <span>{{ session.place }}, </span><span>{{ session.room }}</span>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Supervisor</th>
                    <th>Reviewer</th>
                </tr>
            </thead>
            <draggableComponent v-model="theses" tag="tbody">
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
</template>

<style>
th {
    text-align: start;
    font-weight: bold;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.session .title {
    font-size: 2em;
}
</style>
