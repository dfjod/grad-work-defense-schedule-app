<script setup lang="ts">
import type Thesis from '@/types/Thesis';

defineProps<{
    thesis: Thesis
}>()
</script>

<template>
    <tr>
        <td>{{ thesis.author }}</td>
        <td>{{ thesis.title }}</td>
        <td>{{ thesis.supervisor }}</td>
        <td>{{ thesis.reviewer }}</td>
    </tr>
</template>
