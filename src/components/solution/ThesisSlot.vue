<template>
    <td
        :class="{ indictment: indictmentsActive}"
        @mouseover="showIndictment = true"
        @mouseleave="showIndictment = false"
    >
        <ThesisSlotIndictments
            v-show="showIndictment"
            :object-id="object.id"
            :object-type="objectType"
            @active-indictments="handleActiveIndictments"
        />
        {{ object.name }}
    </td>
</template>

<script setup lang="ts">
import type { Person, Thesis } from '@/types/app'
import ThesisSlotIndictments from '@/components/solution/ThesisSlotIndictments.vue'
import { ref } from 'vue'

const props = defineProps<{
    object: Person | Thesis
    objectType: 'person' | 'thesis'
}>()

const indictmentsActive = ref(false)

const showIndictment = ref(false)

const handleActiveIndictments = ((val: boolean) => {
    indictmentsActive.value = val
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

