<script setup lang="ts">
import ThesisSlot from '@/components/solution/ThesisSlot.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'

const props = defineProps<{
    thesisId: number
}>()

const { findThesisById } = useThesesState()
const { getPersonById } = usePersonState()

const thesis = findThesisById(props.thesisId)

const author = getPersonById(thesis.author)

const reviewer = getPersonById(thesis.reviewer)

const supervisor = getPersonById(thesis.supervisor)
</script>

<template>
    <tr>
        <ThesisSlot :object="author" object-type="person" />
        <ThesisSlot :object="thesis" object-type="thesis" />
        <ThesisSlot :object="supervisor" object-type="person" />
        <ThesisSlot :object="reviewer" object-type="person" />
    </tr>
</template>

<style scoped>
</style>
