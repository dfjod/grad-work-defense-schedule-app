<script setup lang="ts">
import { type Thesis, type Person } from '@/types/app'
import SlotData from '@/components/SlotData.vue'
import usePersonState from '@/composables/usePersonState'
import useThesesState from '@/composables/useThesesState'
import { ref, computed, onMounted } from 'vue'
import useSolutionState from '@/composables/useSolutionState'
import { get } from 'node_modules/axios/index.cjs'

const props = defineProps<{
    thesisId: number
}>()

const { findThesisById } = useThesesState()
const { getPersonById } = usePersonState()
const { getPersonConstraints } = useSolutionState()

const thesis = findThesisById(props.thesisId)

const author = getPersonById(thesis.author)

const reviewer = getPersonById(thesis.reviewer)

const supervisor = getPersonById(thesis.supervisor)

function hasIndictment(person: Person): boolean {
    return getPersonConstraints(person.id).length > 0
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
        <SlotData :object="author" :hasIndictment="hasIndictment(author)" :constraints="getPersonConstraints(author.id)" />
        <SlotData :object="thesis" :hasIndictment="false" :constraints="[]"/>
        <SlotData :object="supervisor" :hasIndictment="hasIndictment(supervisor)" :constraints="getPersonConstraints(supervisor.id)" />
        <SlotData :object="reviewer" :hasIndictment="hasIndictment(reviewer)" :constraints="getPersonConstraints(reviewer.id)" />
    </tr>
</template>

<style scoped>
</style>
