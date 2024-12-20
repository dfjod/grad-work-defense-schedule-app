<template>

    <td
        :class="{ indictment: hasIndictment }"
        @mouseover="showIndictment = true"
        @mouseleave="showIndictment = false"
    >
        <span v-if="hasIndictment" v-show="showIndictment" class="indictment-popup">
            <p v-for="constraint of constraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</p>
        </span>
        {{ object.name }}
    </td>
</template>

<script setup lang="ts">
import { type Person, type Thesis } from '@/types/app';
import { ref } from 'vue';

const props = defineProps<{
    object: Person | Thesis
    hasIndictment: boolean
}>()

const showIndictment = ref<boolean>(false)

const constraints = props.object.indictments.map(indictment => {
    return indictment.constraintMatches
})[0]
</script>

<style scoped>
.indictment-popup {
    background-color: white;
    padding: 20px;
    position: absolute;
    right: 0;
    transform: translateY(-125%);
}

.indictment {
    background-color: #ff3333;
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

