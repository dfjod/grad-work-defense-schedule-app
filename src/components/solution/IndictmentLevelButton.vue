<template>
    <BaseButton :class="{selected: levelShowed}" color="gray" @click="handleClick">{{ level.charAt(0).toUpperCase() + level.slice(1) }} ({{ score }})</BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import useIndictmentsState from '@/composables/useIndictmentsState'
import { ref } from 'vue'

const props = defineProps<{
    level: "hard" | "medium" | "soft"
    score: number
}>()

const { setLevelIndictmentState } = useIndictmentsState()

const levelShowed = ref(false)

const handleClick = () => {
    levelShowed.value = !levelShowed.value
    setLevelIndictmentState(props.level, levelShowed.value)
}
</script>

<style scoped>
.selected {
    background-color: darkgray;
}
</style>
