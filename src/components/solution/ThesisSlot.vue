<template>
    <td
        :class="{ indictment: hasIndictment }"
        @mouseover="showIndictment = true"
        @mouseleave="showIndictment = false"
        @click="handleClick"
    >
        <ThesisSlotIndictments v-if="hasIndictment" v-show="showIndictment" :object-id="object.id" :object-type="objectType"/>
        {{ object.name }}
    </td>
</template>

<script setup lang="ts">
import type { Person, Thesis } from '@/types/app'
import ThesisSlotIndictments from '@/components/solution/ThesisSlotIndictments.vue'
import { ref } from 'vue'
import useSolutionState from '@/composables/useSolutionState'
import emitter from '@/services/mitt'

const props = defineProps<{
    object: Person | Thesis
    objectType: 'person' | 'thesis'
}>()

const { getObjectConstraints } = useSolutionState()

const hasIndictment = ref(false)

const showIndictment = ref(false)

const handleClick = () => {
    console.log(hasIndictment.value)
}

emitter.on(`indictments-loaded`, (val) => {
    console.log("val ThesisSlot", val)
    const constraints = getObjectConstraints(props.object.id, props.objectType)
    hasIndictment.value = constraints.length > 0
})
</script>

<style scoped>
.indictment {
    background-color: var(--red);
}

td {
    padding: 10px;
    background-color: var(--gray);
    position: relative;
}

td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

td:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}
</style>

