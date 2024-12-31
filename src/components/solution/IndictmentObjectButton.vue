<template>
    <BaseButton :class="{selected: typeShowed}" color="gray" @click="handleClick">{{ objectType.charAt(0).toUpperCase() + objectType.slice(1) }}</BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import useIndictmentsState from '@/composables/useIndictmentsState'
import { ref } from 'vue'

const props = defineProps<{
    objectType: 'person' | 'thesis',
}>()

const { setTypeIndictmentState } = useIndictmentsState()

const typeShowed = ref(false)

const handleClick = () => {
    typeShowed.value = !typeShowed.value
    setTypeIndictmentState(props.objectType, typeShowed.value)
}
</script>

<style scoped>
.selected {
    background-color: darkgray;
}
</style>
