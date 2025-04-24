<template>
  <div class="book-modal" v-if="modelValue">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function emitClose() {
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.book-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: $priority-high;
}
</style>
