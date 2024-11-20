<script setup lang="ts">
import type Session from '@/types/Session';
import SessionSlot from './SessionSlot.vue';

defineProps<{
    session: Session
}>()
</script>

<template>
    <div class="session">
        <div class="row">
            <div class="title">Session #{{ session.id + 1 }}</div>
            <div class="details">
                <div class="date">{{ session.startDate }}</div>
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
            <tbody>
                <SessionSlot v-for="thesis of session.theses" :key="thesis.id" :thesis="thesis"/>
            </tbody>
        </table>
    </div>
</template>
