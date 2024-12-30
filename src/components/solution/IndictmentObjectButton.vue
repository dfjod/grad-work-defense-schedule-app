<template>
    <BaseButton :class="{selected: typeShowed}" color="gray" @click="handleClick">{{ objectType.charAt(0).toUpperCase() + objectType.slice(1) }}</BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import emitter from '@/services/mitt';
import { ref } from 'vue';

const props = defineProps<{
    objectType: 'person' | 'thesis',
}>()

const typeShowed = ref(false)

const handleClick = () => {
    typeShowed.value = !typeShowed.value
    console.log(`${props.objectType}`, typeShowed.value)
    emitter.emit(`indictment-toggle-${props.objectType}-type`, typeShowed.value)
}
</script>

<style scoped>
.selected {
    background-color: darkgray;
}
</style>
