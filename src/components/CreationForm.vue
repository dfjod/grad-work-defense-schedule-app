<template>
    <modal-component>
        <div class="form-wrapper">
            <h3>Solution Data</h3>
            <form @submit.prevent="submit">
                <div class="field json-editor-container">
                    <json-editor class="json-editor" mode="tree" :main-menu-bar="false" :navigation-bar="true"
                        v-model="form" />
                </div>
                <div class="field">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </modal-component>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue';
import JsonEditor from 'vue3-ts-jsoneditor'
import { ref } from 'vue'
import type { Solution } from '@/types/app';

const emit = defineEmits<{
    (e: 'submit', solution: Solution): void
}>()

const form = ref<Solution>({
    id: null,
    name: '',
    score: '',
    sessions: [],
    persons: [],
    theses: [],
    indictments: [],
})

const submit = () => {
    emit('submit', form.value)
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
  height: 0;
}

.json-editor-container {
  flex-grow: 1;
  overflow: auto;
}

.json-editor {
  height: 100%;
}
</style>
