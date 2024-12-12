<template>
    <button>
        <slot>default</slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { color = "gray" } = defineProps<{
    color?: string
}>()

const hoverColor = computed(() => {
    return `var(--${color})`
})

const baseColor = computed(() => {
    return `var(--light-${color})`
})
</script>

<style scoped>
button {
    width: 100%;
    min-width: 100px;
    padding: 10px;
    background-color: v-bind(baseColor);
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: v-bind(hoverColor);
    cursor: pointer;
}
</style>
