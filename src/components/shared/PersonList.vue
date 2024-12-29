<template>
    <div class="wrapper">
        <div class="person-search">
            <input type="text" v-model="search" placeholder="Search for a person" />
        </div>
        <div class="person-list">
            <PersonListSlot v-for="person of matchingPersons" :person="person" :key="person.id" :color-function="colorFunction"
                @person-clicked="handleClickEvent" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Person } from '@/types/app'
import PersonListSlot from '@/components/shared/PersonListSlot.vue'
import usePersonState from '@/composables/usePersonState'
import { computed, ref } from 'vue'
import fuzzysort from 'fuzzysort'

defineProps<{
    handleClickEvent?: (person: Person) => void
    colorFunction?: (person: Person) => string | null
}>()

const { persons } = usePersonState()

const search = ref('')

const matchingPersons = computed(() => {
    if (!search.value) {
        return persons.value
    } else {
        return fuzzysort.go(search.value, persons.value, { key: 'name' }).map(result => result.obj)
    }
})
</script>

<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

.person-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
</style>
