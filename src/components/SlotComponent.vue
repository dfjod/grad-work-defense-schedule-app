<script setup lang="ts">
import { type Thesis, type Person } from '@/types/app'
import SlotData from '@/components/SlotData.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
    thesisId: number
}>()

const { findThesisById } = useThesesState()
const { getPersonById } = usePersonState()

const thesis = findThesisById(props.thesisId)

const author = getPersonById(thesis.author)

const reviewer = getPersonById(thesis.reviewer)

const supervisor = getPersonById(thesis.supervisor)

function hasIndictment(obj: Person | Thesis): boolean {
    return obj.indictments.length > 0
}

const showIndictments = ref<boolean>(false)
onMounted(() => {
    console.log('SlotComponent mounted')
    console.log(thesis)
    console.log(author)
    console.log(reviewer)
    console.log(supervisor)
})
</script>

<template>
    <tr @mouseover="showIndictments = true" @mouseleave="showIndictments = false">
        <SlotData :object="author" :hasIndictment="hasIndictment(author)" />
        <SlotData :object="thesis" :hasIndictment="hasIndictment(thesis)" />
        <SlotData :object="supervisor" :hasIndictment="hasIndictment(supervisor)" />
        <SlotData :object="reviewer" :hasIndictment="hasIndictment(reviewer)" />
    </tr>
</template>

<style scoped>
</style>
