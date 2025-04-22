<template>
  <div class="d-flex">
    <div
      class="scroll-container"
      :class="{
        collapse: animationState === 'collapsing',
        rotate: animationState === 'rotating',
        expand: animationState === 'expanding',
      }"
    >
      <img
        class="rolling-paper-top"
        src="/image/home/rolling-paper-top.png"
        alt=""
      />
      <img class="rolling-paper-body" src="/image/home/scrollbody.png" alt="" />
      <img
        class="rolling-paper-bottom"
        src="/image/home/rolling-paper-bottom.png"
        alt=""
      />
      <div class="scroll-texture">
        <img src="/image/home/vignettetop.png" alt="" />
        <h1>Nho sĩ Thăng Long</h1>
        <Button dynamicClass="btn-home" @click="startAnimation"
          >Khám phá</Button
        >
        <img src="/image/home/vignettebot.png" alt="" />
      </div>
      <div class="background-image"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "ScrollPaperTexture",
  components: {
    Button,
  },
});
</script>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["trigger-exit"]);

const router = useRouter();

// Animation states: 'idle', 'collapsing', 'rotating', 'expanding', 'revealing'
const animationState = ref("idle");

const startAnimation = () => {
  animationState.value = "collapsing";
  emit("trigger-exit");

  setTimeout(() => {
    animationState.value = "rotating";

    setTimeout(() => {
      animationState.value = "expanding";

      setTimeout(() => {
        setTimeout(() => {
          router.push("/timeline");
        }, 1000);
      }, 1500);
    }, 1500);
  }, 2000);
};
defineExpose({
  startAnimation,
});
</script>

<style lang="scss" scoped>
// Original collapse animations
@keyframes collapseTop {
  to {
    top: 46%;
    transform: translateY(-50%);
  }
}

@keyframes collapseBottom {
  to {
    bottom: 45%;
    transform: translateY(50%);
  }
}

@keyframes collapseBody {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(50% 0% 50% 0%);
  }
}

// Rotation animation
@keyframes rotateScroll {
  0% {
    left: 57.2%;
    top: 0%;
    transform-origin: top;
  }
  100% {
    transform: rotate(-90deg);
    left: 29%;
    top: 0;
    transform-origin: center;
  }
}

// Expansion animation
@keyframes expandScroll {
  0% {
    clip-path: inset(50% 0% 50% 0%);
    transform: rotate(-90deg) scale(1);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: rotate(-90deg) scale(2.5);
  }
}
@keyframes expandScrollTop {
  0% {
    left: 29%;
    transform: scale(1) rotate(-90deg);
  }
  100% {
    left: -29%;
    transform: scale(3) rotate(-90deg) translateY(-100%);
  }
}
@keyframes expandScrollBottom {
  0% {
    left: calc(29% + 180px);
    transform: scale(1) rotate(-90deg);
  }
  100% {
    left: calc(90% - 302px);
    transform: scale(3) rotate(-90deg) translateY(100%);
  }
}

// Background reveal animation (commented out for now)
@keyframes revealBackground {
  0% {
    opacity: 0;
    background: url("/image/hoang-thanh-bg.png") no-repeat center center / cover;
    z-index: 1000;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    background: url("/image/hoang-thanh-bg.png") no-repeat center center / cover;
    z-index: 1000;
    transform: scale(1);
  }
}

// Animation for positioning the expanded scroll

.scroll-container {
  position: relative;
  height: 100vh;
  margin-left: auto;
  display: flex;
  align-items: center;
  transition: width 2s ease-in-out, height 2s ease-in-out;
  z-index: $priority-high;

  .rolling-paper-top {
    position: absolute;
    top: 0;
    left: -2%;
    height: 14vh;
    aspect-ratio: 1334 / 284;
    z-index: 11110;
    transition: opacity 0.5s ease-in-out;
  }

  .rolling-paper-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 15vh;
    aspect-ratio: 1420 / 309;
    z-index: 11110;
    transition: opacity 0.5s ease-in-out;
  }

  .rolling-paper-body {
    position: relative;
    z-index: 1;
    display: block;
    height: 90vh;
    transition: height 2s ease-in-out, width 2s ease-in-out;
  }

  .scroll-texture {
    position: absolute;
    top: 10%;
    left: 12%;
    width: 71%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: $priority-three;
    transition: opacity 1s ease-in-out;

    h1 {
      font-size: 20rem;
      color: $light-dark-color;
      font-family: $primary-heading-family;
      text-align: center;
      text-transform: uppercase;
    }

    img {
      filter: contrast(0.3);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;

      &:nth-of-type(1) {
        -webkit-mask-image: linear-gradient(to top, transparent, black);
        mask-image: linear-gradient(to top, transparent, black);
      }

      &:nth-of-type(2) {
        -webkit-mask-image: linear-gradient(to bottom, transparent, black);
        mask-image: linear-gradient(to bottom, transparent, black);
      }
    }
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/image/home/scrollbody.png");
    background-size: cover;
    background-position: center;
    opacity: 0;
    z-index: 0;
  }

  // Collapsing state
  &.collapse {
    .rolling-paper-top {
      animation: collapseTop 2s forwards;
    }

    .rolling-paper-bottom {
      animation: collapseBottom 2s forwards;
    }

    .rolling-paper-body {
      animation: collapseBody 2s forwards;
    }

    .scroll-texture {
      animation: collapseBody 2s forwards;
    }
  }

  // Rotating state
  &.rotate {
    position: absolute;
    animation: rotateScroll 1.5s forwards;
    animation-delay: 0s; // Start immediately after being applied

    // Keep the same dimensions during rotation
    .rolling-paper-body {
      // Preserve the collapsed state
      clip-path: inset(50% 0% 50% 0%);
    }

    .scroll-texture {
      // Preserve the collapsed state
      clip-path: inset(50% 0% 50% 0%);
    }

    .rolling-paper-top,
    .rolling-paper-bottom {
      // Maintain the collapsed position
      &:nth-of-type(1) {
        top: 46%;
        transform: translateY(-50%);
      }

      &:nth-of-type(3) {
        bottom: 45%;
        transform: translateY(50%);
      }
    }
  }

  // Expanding state
  &.expand {
    position: absolute;
    width: 100%;

    .rolling-paper-body {
      animation: expandScroll 1.8s forwards;
      // animation-timing-function: ease-in-out;
    }
    .rolling-paper-top {
      animation: expandScrollTop 2.5s forwards;
    }

    .rolling-paper-bottom {
      animation: expandScrollBottom 2.5s forwards;
    }

    .rolling-paper-top,
    .rolling-paper-bottom {
      &:nth-of-type(1) {
        top: 46%;
        left: 29%;
        width: unset;
        transform: rotate(-90deg);
      }

      &:nth-of-type(3) {
        top: 45%;
        left: 29%;
        width: unset;
        transform: rotate(-90deg);
      }
    }

    .scroll-texture {
      display: none;
    }

    .background-image {
      animation: revealBackground 2s forwards;
      z-index: 1;
    }
  }

  // &.reveal {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   transform: none;

  //   .rolling-paper-body {
  //     transform: rotate(-90deg) scale(2.5);
  //   }
  //   .scroll-texture,
  //   .rolling-paper-top,
  //   .rolling-paper-bottom {
  //     display: none;
  //   }

  //   .background-image {
  //     animation: revealBackground 1s forwards;
  //   }
  // }
}
</style>
