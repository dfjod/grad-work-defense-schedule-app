<template>
    <div class="session-form">
        <div class="sessions">
            <div class="session" v-for="session in sessions" :key="session.id">
                <div class="info" @click="handleSessionClick(session)">
                    <p>Session #{{ session.id }}</p>
                    <p @click="console.log(session)">Start Date: {{ formatTime(session.startDate) }}</p>
                    <p>Room: {{ session.room }}</p>
                </div>
                <div>
                    <BaseButton color="red" @click="handleSessionDelete(session)">Delete</BaseButton>
                </div>
            </div>
        </div>
        <BaseButton v-if="!showForm" @click="showForm = true">Add Session</BaseButton>
        <form v-else @submit.prevent="saveSession">
            <div class="field">
                <label for="startDate">Start Date</label>
                <input id="startDate" name="startDate" type="datetime-local" v-model="session.startDate" required />
            </div>
            <div class="field">
                <label for="slotDuration">Slot Duration</label>
                <input id="slotDuration" name="slotDuration" type="number" v-model="session.slotDuration" required />
            </div>
            <div class="field">
                <label for="room">Room</label>
                <input id="room" name="room" v-model="session.room" required />
            </div>
            <div class="form-buttons">
                <BaseButton @click="saveSession" color="green">Save Session</BaseButton>
                <BaseButton @click="handleCloseSessionForm" color="red">Close Session</BaseButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { type Session } from '@/types/app'
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { formatTime } from '@/services/utils'

const sessions = defineModel<Session[]>()

const showForm = ref(false)

const session = ref<Session>({
    id: null,
    startDate: '',
    slotDuration: null,
    room: '',
    theses: [],
    thesesPrevious: [],

})

const resetSession = () => {
    session.value = {
        id: null,
        startDate: '',
        slotDuration: null,
        room: '',
        theses: [],
        thesesPrevious: [],
    }
}

const saveSession = () => {
    if (session.value.id) {
        const index = sessions.value.findIndex(s => s.id === session.value.id)
        sessions.value[index] = session.value
        console.log('Session updated:', sessions.value)
    } else {
        session.value.id = sessions.value?.length + 1
        sessions.value?.push(session.value)
        console.log('Session saved:', sessions.value)
    }
    resetSession()
    showForm.value = false
}

const handleSessionDelete = (sessionToDelete: Session) => {
    sessions.value = sessions.value.filter(session => session.id !== sessionToDelete.id)
}

const handleCloseSessionForm = () => {
    resetSession()
    showForm.value = false
}

const handleSessionClick = (sessionClicked: Session) => {
    session.value = sessionClicked
    showForm.value = true
}
</script>

<style scoped>
.session-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.sessions {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.session {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.session .info {
    display: flex;
    cursor: pointer;
    flex-grow: 1;
    justify-content: space-between;
    padding: 10px;
    background-color: var(--gray);
    border-radius: 10px;
}

.session p {
    margin: 0;
    padding: 0;
}
</style>
