<template>
    <span
        class="indictment-popup"
        v-if="showObjectIndictments && (showHardConstraints || showMediumConstraints || showSoftConstraints || showAllConstraints)"
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
        <ul v-if="showAllConstraints">
            <li v-for="constraint of constraints" :key="constraint.name" class="indictment-text">{{ constraint.name }}
            </li>
        </ul>
    </span>
</template>

<script setup lang="ts">
import type { ConstraintMatch } from '@/types/app'
import useSolutionState from '@/composables/useSolutionState'
import { ref, computed, watch } from 'vue'
import useIndictmentsState from '@/composables/useIndictmentsState'

const props = defineProps<{
    objectId: number
    objectType: 'person' | 'thesis'
}>()

const emit = defineEmits<{
    activeIndictments: [hasActiveIndictments: boolean]
}>()

const { getObjectConstraints, getTypeOfConstraints } = useSolutionState()
const { getTypeIndictmentState, getLevelIndictmentState } = useIndictmentsState()

const constraints = ref<ConstraintMatch[]>(getObjectConstraints(props.objectId, props.objectType))
const hardConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('hard', constraints.value))
const mediumConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('medium', constraints.value))
const softConstraints = ref<ConstraintMatch[]>(getTypeOfConstraints('soft', constraints.value))

const showHardConstraints = computed(() => hardConstraints.value.length > 0 && getLevelIndictmentState('hard'))
const showMediumConstraints = computed(() => mediumConstraints.value.length > 0 && getLevelIndictmentState('medium'))
const showSoftConstraints = computed(() => softConstraints.value.length > 0 && getLevelIndictmentState('soft'))

const showObjectIndictments = computed(() => getTypeIndictmentState(props.objectType))

const showAllConstraints = computed(() => {
    return getLevelIndictmentState('hard') === false
        && getLevelIndictmentState('medium') === false
        && getLevelIndictmentState('soft') === false
})

// Emit state of active indictments for current component in order to color it red
watch(
    () => [showHardConstraints.value, showMediumConstraints.value, showSoftConstraints.value, showObjectIndictments.value, showAllConstraints.value],
    ([newShowHard, newShowMedium, newShowSoft, newShowObjectIndictments, newShowAllConstraints]: boolean[]) => {
        const hasActiveIndictments = newShowObjectIndictments && (newShowHard || newShowMedium || newShowSoft || newShowAllConstraints);
        emit('activeIndictments', hasActiveIndictments);
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
