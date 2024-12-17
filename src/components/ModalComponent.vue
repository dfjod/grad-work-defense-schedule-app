<script setup lang="ts">
import { onClickOutside, templateRef } from '@vueuse/core'

const emit = defineEmits<{
    closeModal: []
}>()

const target = templateRef('target')
onClickOutside(target, () => emit('closeModal'))
</script>

<template>
    <div class="modal-mask">
        <div class="modal-container" ref="target">
            <slot>default</slot>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  background-color: var(--transparent-dark);
}
.modal-container {
  width: calc(100% - var(--modal-margin-left-right) * 2);
  height: calc(100vh - var(--modal-margin-top-bottom) * 2);
  margin: var(--modal-margin-top-bottom) var(--modal-margin-left-right);
  padding: 20px 30px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px var(--transparent-light-dark);
}
</style>
