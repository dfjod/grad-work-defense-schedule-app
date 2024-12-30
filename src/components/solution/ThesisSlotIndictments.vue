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
        <!-- <ul>
            <li v-for="constraint of constraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}</li>
        </ul> -->
    </span>
</template>

<script setup lang="ts">
import type { ConstraintMatch } from '@/types/app'
import useEventsBus from '@/composables/useEventBus'
import useSolutionState from '@/composables/useSolutionState';
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    objectId: number
    objectType: 'person' | 'thesis'
}>()

const { bus } = useEventsBus()
const { getObjectConstraints, getTypeOfConstraints } = useSolutionState()

const showIndictment = ref(false)

// Selection
const hardConstraintShowed = ref(false)
const mediumConstraintShowed = ref(false)
const softConstraintShowed = ref(false)

const constraints = ref<ConstraintMatch[]>([])
const hardConstraints = ref<ConstraintMatch[]>([])
const mediumConstraints = ref<ConstraintMatch[]>([])
const softConstraints = ref<ConstraintMatch[]>([])

const indictments = computed(() => {
    const indictments = []
    if (hardConstraintShowed.value) {
        indictments.push(...hardConstraints.value)
    }
    if (mediumConstraintShowed.value) {
        indictments.push(...mediumConstraints.value)
    }
    if (softConstraintShowed.value) {
        indictments.push(...softConstraints.value)
    }
    return indictments
})

const hasIndictment = computed(() => indictments.value.length > 0)

watch(() => bus.value.get('toggle-score-hard'), (val) => {
    const [hardConstraintShowedBus] = val ?? []
    console.log('hardConstraintShowedBus', hardConstraintShowedBus)
    hardConstraintShowed.value = hardConstraintShowedBus
})

watch(() => bus.value.get('toggle-score-medium'), (val) => {
    const [mediumConstraintShowedBus] = val ?? []
    console.log('mediumConstraintShowedBus', mediumConstraintShowedBus)
    mediumConstraintShowed.value = mediumConstraintShowedBus
})

watch(() => bus.value.get('toggle-score-soft'), (val) => {
    const [softConstraintShowedBus] = val ?? []
    console.log('softConstraintShowedBus', softConstraintShowedBus)
    softConstraintShowed.value = softConstraintShowedBus
})

watch(() => bus.value.get('indictments-loaded'), (val) => {
    const [showIndictmentBus] = val ?? []
    console.log('indictments loaded', showIndictmentBus)
    constraints.value = getObjectConstraints(props.objectId, props.objectType)
    hardConstraints.value = getTypeOfConstraints('hard', constraints.value)
    mediumConstraints.value = getTypeOfConstraints('medium', constraints.value)
    softConstraints.value = getTypeOfConstraints('soft', constraints.value)
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
