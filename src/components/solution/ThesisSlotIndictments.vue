<template>
    <span
        class="indictment-popup"
        v-if="showObjectIndictments && (showHardConstraints || showMediumConstraints || showSoftConstraints)"
    >
        <p>Indictments</p>
        <div v-if="showHardConstraints || showMediumConstraints || showSoftConstraints">
            <div v-show="showHardConstraints">
                <p>Hard</p>
                <ul>
                    <li v-for="constraint of hardConstraints" :key="constraint.name" class="indictment-text">{{
                        constraint.name }}</li>
                </ul>
            </div>
            <div v-show="showMediumConstraints">
                <p>Medium</p>
                <ul>
                    <li v-for="constraint of mediumConstraints" :key="constraint.name" class="indictment-text">{{
                        constraint.name }}</li>
                </ul>
            </div>
            <div v-show="showSoftConstraints">
                <p>Soft</p>
                <ul>
                    <li v-for="constraint of softConstraints" :key="constraint.name" class="indictment-text">{{
                        constraint.name }}</li>
                </ul>
            </div>
        </div>
        <div v-if="hasTimeConstraints">
            <p>Time constraints</p>
            <ul>
                <li v-for="constraint of timeConstraints" :key="constraint.id" class="indictment-text">{{ formatTime(constraint.from) }} - {{ formatTime(constraint.to) }}</li>
            </ul>
        </div>
    </span>
</template>

<script setup lang="ts">
import type { ConstraintMatch, TimeConstraint } from '@/types/app'
import useSolutionState from '@/composables/useSolutionState'
import { ref, computed, watch } from 'vue'
import useIndictmentsState from '@/composables/useIndictmentsState'
import usePersonState from '@/composables/usePersonState'
import { formatTime } from '@/services/utils'

const props = defineProps<{
    objectId: number
    objectType: 'person' | 'thesis'
}>()

const emit = defineEmits<{
    activeIndictments: [hasActiveIndictments: boolean]
}>()

const { solution } = useSolutionState()
const { getTypeIndictmentState, getLevelIndictmentState } = useIndictmentsState()
const { getPersonById } = usePersonState()

const constraints = computed<ConstraintMatch[]>(() => {
    console.log('Getting constraints')
    const indictmetns = props.objectType === 'person' ? solution.personIndictments : solution.thesesIndictments
    const filtered = indictmetns.filter(indictment => indictment.id === props.objectId)
    const constraints = filtered.flatMap(indictment => indictment.constraintMatches)
    return constraints

})
const hardConstraints = computed<ConstraintMatch[]>(() => constraints.value.filter(constraint => constraint.score.hard < 0))
const mediumConstraints = computed<ConstraintMatch[]>(() => constraints.value.filter(constraint => constraint.score.medium < 0))
const softConstraints = computed<ConstraintMatch[]>(() => constraints.value.filter(constraint => constraint.score.soft < 0))

const showHardConstraints = computed(() => hardConstraints.value.length > 0 && getLevelIndictmentState('hard'))

const showMediumConstraints = computed(() => mediumConstraints.value.length > 0 && getLevelIndictmentState('medium'))

const showSoftConstraints = computed(() => softConstraints.value.length > 0 && getLevelIndictmentState('soft'))

const showObjectIndictments = computed(() => getTypeIndictmentState(props.objectType))

const timeConstraints = ref<TimeConstraint[] | undefined>(props.objectType === 'person' ? getPersonById(props.objectId)?.timeConstraints : undefined)
const hasTimeConstraints = computed(() => {
    if (props.objectType === 'person' && timeConstraints.value) {
        return timeConstraints.value && timeConstraints.value.length > 0
    }
    return undefined
})

// Emit state of active indictments for current component in order to color it red
watch(
    () => ({
        showHard: showHardConstraints.value,
        showMedium: showMediumConstraints.value,
        showSoft: showSoftConstraints.value,
        showObjectIndictments: showObjectIndictments.value,
        constraints: constraints.value,
    }),
    ({ showHard, showMedium, showSoft, showObjectIndictments }) => {
        const hasActiveIndictments = showObjectIndictments && (showHard || showMedium || showSoft )

        emit('activeIndictments', hasActiveIndictments)
    },
    { immediate: true }
)
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
