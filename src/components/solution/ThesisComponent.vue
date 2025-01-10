<script setup lang="ts">
import ThesisSlot from '@/components/solution/ThesisSlot.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import type { Person, Thesis } from '@/types/app';
import moment from 'moment';
import { ref } from 'vue'

const props = defineProps<{
    thesisId: number
    sessionStart: string
    slotDuration: number
    index: number
}>()

const { findThesisById } = useThesesState()
const { getPersonById } = usePersonState()

const thesis = ref<Thesis>(findThesisById(props.thesisId))

const author = ref<Person>(getPersonById(thesis.value.author))

const reviewer = ref<Person>(getPersonById(thesis.value.reviewer))

const supervisor = ref<Person>(getPersonById(thesis.value.supervisor))
</script>

<template>
    <tr>
        <ThesisSlot :object="author" object-type="person" />
        <ThesisSlot :object="thesis" object-type="thesis" />
        <ThesisSlot :object="supervisor" object-type="person" />
        <ThesisSlot :object="reviewer" object-type="person" />
        <td style="text-align: center; background-color: var(--gray);">{{ moment(props.sessionStart).add(slotDuration * index, 'm').format("HH:mm") }}</td>
    </tr>
</template>

<style scoped>
td:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}
</style>
