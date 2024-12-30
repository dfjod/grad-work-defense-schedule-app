<template>
    <span class="indictment-popup">
        <p>Indictments</p>
        <div v-if="hardConstraintShowed && hardConstraints.length > 0">
            <p>Hard</p>
            <ul>
                <li v-for="constraint of hardConstraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
            </ul>
        </div>
        <div v-if="mediumConstraintShowed && mediumConstraints.length > 0">
            <p>Medium</p>
            <ul>
                <li v-for="constraint of mediumConstraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
            </ul>
        </div>
        <div v-if="softConstraintShowed && softConstraints.length > 0">
            <p>Soft</p>
            <ul>
                <li v-for="constraint of softConstraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
            </ul>
        </div>
        <ul v-if="noneSelected && constraints.length > 0">
            <li v-for="constraint of constraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
        </ul>
    </span>
</template>

<script setup lang="ts">
import type { ConstraintMatch } from '@/types/app'
import useSolutionState from '@/composables/useSolutionState';
import { computed, ref } from 'vue'
import emitter from '@/services/mitt';

const props = defineProps<{
    objectId: number
    objectType: 'person' | 'thesis'
}>()

const { getObjectConstraints, getTypeOfConstraints } = useSolutionState()

// Selection
const hardConstraintShowed = ref(false)
const mediumConstraintShowed = ref(false)
const softConstraintShowed = ref(false)
const noneSelected = computed(() => !hardConstraintShowed.value && !mediumConstraintShowed.value && !softConstraintShowed.value)

const constraints = ref<ConstraintMatch[]>(getObjectConstraints(props.objectId, props.objectType))
const hardConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('hard', constraints.value))
const mediumConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('medium', constraints.value))
const softConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('soft', constraints.value))

emitter.on(`toggle-score-hard`, (val) => {
    console.log('hardConstraintShowedBus', val)
    hardConstraintShowed.value = val
})

emitter.on(`toggle-score-medium`, (val) => {
    console.log('mediumConstraintShowedBus', val)
    mediumConstraintShowed.value = val
})

emitter.on(`toggle-score-soft`, (val) => {
    console.log('softConstraintShowedBus', val)
    softConstraintShowed.value = val
})
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
</style>
