<template>
  <div class="ink-drop-btn" @animationend="resetAnimation">
    <RouterLink 
      class="ink-drop-btn"
      :class="{ animated: isAnimating }"
      :to="path"
      @click="triggerAnimation"
    >
      <slot></slot>
      <p class="text">{{ text }}</p>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "InkDropButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    path: {
      type: [String, Object],
    },
  },
  data() {
    return {
      isAnimating: false, // Tracks animation state
    };
  },
  methods: {
    triggerAnimation() {
      this.isAnimating = true; // Start animation
    },
    resetAnimation() {
      this.isAnimating = false; // Reset animation after it ends
    },
  },
};
</script>

<script setup></script>

<style lang="scss" scoped>
.ink-drop-btn {
  @include flex-center-vertical;
  width: 40rem;
  height: 40rem;
  background: url("/image/mask-group-reverse.png") no-repeat center/contain;
  transition: transform 0.3s ease;

  &.animated {
    animation: ink-drop-animation 0.5s forwards; // Add animation class
  }

  p {
    font-size: 4rem;
    color: #fff;
    margin-left: 0.5rem;
  }
}

/* Keyframes for the animation */
@keyframes ink-drop-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2); /* Slightly enlarge */
  }
  100% {
    transform: scale(1); /* Return to original size */
  }
}
</style>