<template>
    <td
        :class="{ indictment: hasIndictment }"
        @mouseover="showIndictment = true"
        @mouseleave="showIndictment = false"
    >
        <span v-if="hasIndictment" v-show="showIndictment" class="indictment-popup">
            <p>Indictments</p>
            <ul>
                <li v-for="constraint of constraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
            </ul>
        </span>
        {{ object.name }}
    </td>
</template>

<script setup lang="ts">
import { type Person, type Thesis, type ConstraintMatch } from '@/types/app'
import { ref } from 'vue'

defineProps<{
    object: Person | Thesis
    constraints: ConstraintMatch[]
    hasIndictment: boolean
}>()

const showIndictment = ref<boolean>(false)
</script>

<style scoped>
.indictment-popup {
    background-color: white;
    padding: 15px;
    position: absolute;
    right: 0;
    transform: translateY(calc(-105% - 10px));
    width: 400px;
    box-sizing: border-box;
    border: 1px solid var(--gray);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.indictment-popup ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
}

.indictment-popup p {
    font-weight: bold;
    margin-top: 0;
}

.indictment-text {
    margin-bottom: 5px;
}

.indictment-text:last-child {
    margin-bottom: 0;
}

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

