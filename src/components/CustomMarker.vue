<template>
  <div class="parent-element">
    <div
      class="rounded-element"
      :style="{
        '--color': `${color}`,
      }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "#36693e",
  },
});
</script>

<style lang="scss" scoped>
.rounded-element {
  width: 5rem;
  aspect-ratio: 1 / 1;
  background-color: var(--color);
  border-radius: 50%;
  position: relative;
  border: 0.3rem solid #fff;
  pointer-events: auto; // Ensure the element itself is clickable

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 0.3rem solid var(--color);
    border-radius: 50%;
    animation: wave 2s infinite ease-out;
    pointer-events: none; // Prevent pseudo-elements from blocking clicks
  }

  &::before {
    transform: translate(-50%, -50%) scale(1.5);
    animation-delay: -1s;
  }

  &::after {
    transform: translate(-50%, -50%) scale(2);
  }
}

@keyframes wave {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}
</style>
