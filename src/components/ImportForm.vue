<template>
    <modal-component>
        <div class="form-wrapper">
            <h3>Import Solution as JSON</h3>
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

const form = ref<Solution>(JSON.parse(`{"id":1,"name":"Solution 1","score":"-1hard/0medium/-56soft","sessions":[{"id":1,"startDate":"2025-01-02T09:00:00","slotDuration":30,"theses":[{"id":2,"title":"Programmatūras kvalitātes dzirnavas","author":9,"supervisor":2,"reviewer":3,"indictments":[]},{"id":5,"title":"Mazā Anduļa datu noliktavas","author":12,"supervisor":6,"reviewer":5,"indictments":[]},{"id":8,"title":"Billes datu noliktavas","author":15,"supervisor":6,"reviewer":4,"indictments":[]},{"id":3,"title":"Kiberfizikālās sistēmas Silmačos","author":10,"supervisor":3,"reviewer":4,"indictments":[]}],"room":"13"},{"id":2,"startDate":"2025-01-02T09:00:00","slotDuration":30,"theses":[{"id":6,"title":"Tīklplēsis","author":13,"supervisor":7,"reviewer":3,"indictments":[]},{"id":7,"title":"Neironu skartie","author":14,"supervisor":7,"reviewer":1,"indictments":[]},{"id":4,"title":"Datizrace būrī","author":11,"supervisor":5,"reviewer":1,"indictments":[]},{"id":1,"title":"Baltā kvantu kriptogrāfija","author":8,"supervisor":1,"reviewer":2,"indictments":[]}],"room":"16"}],"persons":[{"id":3,"name":"prof. Leo Seļavo","timeConstraints":[{"id":2,"from":"2025-01-02T09:30:00","to":"2025-01-02T23:59:59"}],"indictments":[]},{"id":1,"name":"prof. Andris Ambainis","timeConstraints":[{"id":1,"from":"2025-01-02T10:45:00","to":"2025-01-02T23:59:59"}],"indictments":[]},{"id":2,"name":"prof. Juris Borzovs","timeConstraints":[],"indictments":[]},{"id":5,"name":"prof. Karlis Podnieks","timeConstraints":[],"indictments":[]},{"id":4,"name":"doc. Agris Šostaks","timeConstraints":[{"id":3,"from":"2025-01-02T08:45:00","to":"2025-01-02T09:59:59"}],"indictments":[]},{"id":6,"name":"prof. Laila Niedrīte","timeConstraints":[{"id":4,"from":"2025-01-02T09:30:00","to":"2025-01-02T10:00:00"}],"indictments":[]},{"id":7,"name":"prof. Guntis Bārzdiņš","timeConstraints":[{"id":5,"from":"2025-01-02T10:15:00","to":"2025-01-02T23:59:59"}],"indictments":[]},{"id":8,"name":"Jānis Jaunsudrabiņš","timeConstraints":[],"indictments":[]},{"id":9,"name":"Kārlis Skalbe","timeConstraints":[],"indictments":[]},{"id":10,"name":"Rūdolfs Blaumanis","timeConstraints":[],"indictments":[]},{"id":11,"name":"Alberts Bels","timeConstraints":[],"indictments":[]},{"id":12,"name":"Vilis Plūdons","timeConstraints":[],"indictments":[]},{"id":13,"name":"Andrejs Pumpurs","timeConstraints":[],"indictments":[]},{"id":14,"name":"Aleksandrs Čaks","timeConstraints":[],"indictments":[]},{"id":15,"name":"Vizma Belševica","timeConstraints":[],"indictments":[]}],"theses":[],"indictments":[]}`))

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
