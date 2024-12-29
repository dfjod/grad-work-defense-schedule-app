<template>
    <BaseButton :class="{selected: levelShowed}" color="gray" @click="handleClick">{{ level }} ({{ score }})</BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import useEventsBus from '@/composables/useEventBus'
import { ref } from 'vue'

const props = defineProps<{
    level: string
    score: number
}>()

const { emit } = useEventsBus()

const levelShowed = ref(false)

const handleClick = () => {
    levelShowed.value = !levelShowed.value
    console.log(`${props.level}`, levelShowed.value)
    emit(`toggle-score-${props.level.toLowerCase()}`, levelShowed.value)
}
</script>

<style scoped>
.selected {
    background-color: darkgray;
}
</style>
