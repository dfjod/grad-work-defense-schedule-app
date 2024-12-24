<template>
    <label for="timeconstraints">Time Constraints</label>
    <TimeConstraintSlot
        v-for="constraint in timeConstraints"
        :key="constraint.id"
        :time-constraint="constraint"
        @delete-time-constraint="handleDeleteTimeConstraint"
    />
    <BaseButton v-if="!showTimeConstraintForm" @click="showTimeConstraintForm = true" color="gray">
        Add Time Constraint
    </BaseButton>
    <div v-if="showTimeConstraintForm" class="time-constraint-form">
        <div class="field">
            <label for="from">From</label>
            <input id="from" name="from" type="datetime-local" v-model="timeConstraint.from" />
        </div>
        <div class="field">
            <label for="to">To</label>
            <input id="to" name="to" type="datetime-local" v-model="timeConstraint.to" />
        </div>
        <BaseButton @click="handleSave" color="green">Save</BaseButton>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import type { TimeConstraint } from '@/types/app';
import { ref } from 'vue'
import TimeConstraintSlot from '@/components/TimeConstraintSlot.vue';

const emit = defineEmits<{
    (e: 'saveTimeConstraint', from: string, to: string): void
    (e: 'deleteTimeConstraint', timeConstraintId: number): void
}>()

const props = defineProps<{
    timeConstraints: TimeConstraint[]
}>()

const timeConstraint = ref<TimeConstraint>({
    id: null,
    from: '',
    to: '',
})

const showTimeConstraintForm = ref(false)

const handleSave = () => {
    emit('saveTimeConstraint', timeConstraint.value.from, timeConstraint.value.to)
    resetTimeConstraint()
    showTimeConstraintForm.value = false
}

const handleDeleteTimeConstraint = (timeConstraintId: number) => {
    emit('deleteTimeConstraint', timeConstraintId)
}

const resetTimeConstraint = () => {
    timeConstraint.value = {
        id: null,
        from: '',
        to: '',
    }
}
</script>

<style scoped>
.person {
    padding: 10px;
    background-color: var(--gray);
    border-radius: 10px;
}

.person:hover {
    cursor: pointer;
}
</style>
