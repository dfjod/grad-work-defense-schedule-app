<script setup lang="ts">
import type { Session } from '@/types/app';
import SlotComponent from '@/components/solution/SlotComponent.vue';
import draggableComponent from 'vuedraggable';
import useSolutionState from '@/composables/useSolutionState';

const props = defineProps<{
    sessionId: number
}>()

const { getSessionWithId } = useSolutionState()

const session: Session = getSessionWithId(props.sessionId)

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit'
    }
    const dateObj = new Date(date)
    const dateFormatter = Intl.DateTimeFormat('lv', options)
    const dateString = dateFormatter.format(dateObj)

    return dateString.charAt(0).toUpperCase() + dateString.slice(1)
}
</script>

<template>
    <div class="session">
        <div class="meta">
            <h2 class="title">Session #{{ session.id }}</h2>
            <div class="details">
                <div class="date">{{ formatDate(session.startDate) }}</div>
                <div class="place">
                    <span>Room: {{ session.room }}</span>
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
            <draggableComponent v-model="session.theses" group="theses" item-key="thesis" tag="tbody">
                <template #item="{ element: thesis }">
                    <SlotComponent :key="thesis" :thesisId="thesis" />
                </template>
            </draggableComponent>
        </table>
    </div>
</template>

<style scoped>
.session {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    background-color: var(--light-gray);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 10px;
}

.session:last-child {
    margin-bottom: 0;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    margin-top: -10px; /* correct offset on first border spacing if desired */
}

th {
    text-align: left;
    padding: 5px 10px;
}

.meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    margin: 0;
}
</style>
