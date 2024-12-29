<template>
    <div class="person" @click="handleClick">
        {{ person.name }}
    </div>
</template>

<script setup lang="ts">
import type { Person } from '@/types/app';
import { computed } from 'vue';

const emit = defineEmits<{
    (e: 'person-clicked', person: Person): void
}>()

const props = defineProps<{
    person: Person
    colorFunction?: (person: Person) => string | null
}>()

const color = computed(() => {
    if (props.colorFunction) {
        const color = props.colorFunction(props.person)
        return color ? `var(--${color})` : 'var(--gray)'
    } else {
        return 'var(--gray)'
    }
})

const handleClick = () => {
    emit('person-clicked', props.person)
}
</script>

<style scoped>
.person {
    padding: 10px;
    background-color: v-bind(color);
    border-radius: 10px;
}

.person:hover {
    cursor: pointer;
}
</style>
