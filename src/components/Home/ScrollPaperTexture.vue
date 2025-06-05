<template>
  <div class="d-flex">
    <div
      class="scroll-container"
      :class="{
        collapse: animationState === 'collapsing',
        rotate: animationState === 'rotating',
        expand: animationState === 'expanding',
        collapseSecond: animationState === 'collapseSecond',
        goDown: animationState === 'goDown',
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
      <div class="scroll-new-texture">
        <h1>Giới thiệu</h1>
        <div
          class="article-content"
          v-html="processedHtml"
          @click="handleLinkClick"
        ></div>
        <div class="audio-container">
          <Audio :audioSrc="introduceArticle?.audioLink" />
        </div>
        <div class="btn-container">
          <Button dynamicClass="btn-home" @click="navigate">Tiếp tục</Button>
        </div>
      </div>
    </div>
    <ModalLv2
      :isModalOpen="isModalOpen"
      :modalId="modalContentId"
      :closeModal="closeModal"
    >
    </ModalLv2>
  </div>
</template>

<script>
import Audio from "@/components/Audio.vue";
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import ModalLv2 from "@/components/ModalLv2.vue";

export default defineComponent({
  name: "ScrollPaperTexture",
  components: {
    Button,
  },
});
</script>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { fetchIntroduceArticle } from "@/api/fetch";
import useStore from "@/store/useStore";
import { useModalLinks } from "@/composables/useModalLink";

const router = useRouter();
const emit = defineEmits(["trigger-exit"]);
const store = useStore();
// Animation states: 'idle', 'collapsing', 'rotating', 'expanding', 'revealing'
const animationState = ref("idle");
const introduceArticle = ref(null);
onMounted(async () => {
  const res = await fetchIntroduceArticle(store);
  introduceArticle.value = res;
});

const startAnimation = () => {
  animationState.value = "collapsing";
  emit("trigger-exit");

  setTimeout(() => {
    animationState.value = "rotating";

    setTimeout(() => {
      animationState.value = "expanding";
    }, 1500);
  }, 2000);
};

const navigate = () => {
  animationState.value = "collapseSecond";
  setTimeout(() => {
    animationState.value = "goDown";
    setTimeout(() => {
      router.push("/timeline");
    }, 2000);
  }, 2000);
};
defineExpose({
  startAnimation,
});

// Define the initial HTML string
const {
  isModalOpen,
  modalContentId,
  openModal,
  closeModal,
  convertLinksForModal,
} = useModalLinks();
const handleLinkClick = (event) => {
  const modalLink = event.target.closest(".modal-link");
  if (modalLink) {
    const modalId = modalLink.getAttribute("data-modal-id");
    openModal(modalId);
  }
};

// Use a computed property to ensure the HTML is transformed reactive
const processedHtml = computed(() => {
  if (introduceArticle.value) {
    return convertLinksForModal(
      introduceArticle.value.translations[store.lang].content
    );
  }
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
    left: 57.32%;
    top: 0%;
    transform-origin: center;
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
    clip-path: inset(45% 0% 45% 0%);
    transform: rotate(-90deg) scaleY(1);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: rotate(-90deg) scaleY(1.5);
  }
}
@keyframes expandScrollTop {
  0% {
    left: 29%;
    transform: rotate(-90deg);
  }
  100% {
    left: -3.5%;
    transform: rotate(-90deg);
  }
}
@keyframes expandScrollBottom {
  0% {
    left: 29%;
    transform: rotate(-90deg) translateY(50%);
  }
  100% {
    left: 61.5%;
    transform: rotate(-90deg) translateY(50%);
  }
}

@keyframes collapseSecondTop {
  0% {
    top: 0;
    left: -3.5%;
  }
  100% {
    top: 29%;
    left: 0;
    transform: translateY(70%);
  }
}

@keyframes collapseSecondBottom {
  0% {
    bottom: 0;
    left: 0;
  }
  100% {
    bottom: 29%;
    left: 0;
    transform: translateY(-70%);
  }
}

@keyframes collapseSecondBody {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(50% 0% 50% 0%);
  }
}

@keyframes displayNewTexture {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes goDown {
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(-90deg) translateX(-110%);
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
    z-index: $priority-four;
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
  .scroll-new-texture {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: $priority-three;
    transition: opacity 1s ease-in-out;
    opacity: 0;
    h1 {
      font-size: 26rem;
      color: $light-dark-color;
      font-family: $primary-heading-family;
      text-align: center;
      text-transform: uppercase;
    }
    .article-content {
      font-size: 4rem;
      color: $light-dark-color;
      font-family: $small-heading-family;
      text-align: center;
    }
    .audio-container {
      position: relative;
      margin-top: 2rem;
      width: 52rem;
      height: 5rem;
    }
    .btn-container {
      position: absolute;
      bottom: 20%;
      right: 0;
    }
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
      animation: expandScroll 2s forwards;
      // animation-timing-function: ease-in-out;
    }
    .rolling-paper-top {
      animation: expandScrollTop 2s forwards;
    }

    .rolling-paper-bottom {
      animation: expandScrollBottom 2s forwards;
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
    .scroll-new-texture {
      animation: displayNewTexture 1s forwards 2s;
    }

    .scroll-texture {
      display: none;
    }
  }

  &.collapseSecond {
    position: absolute;
    transform: rotate(-90deg);
    left: 29%;
    top: 0;
    transform-origin: center;

    .scroll-texture {
      display: none;
    }
    .scroll-new-texture {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    .rolling-paper-top {
      top: 0;
      left: -3.5%;
      animation: collapseSecondTop 2s forwards;
    }

    .rolling-paper-bottom {
      animation: collapseSecondBottom 2s forwards;
    }

    .rolling-paper-body {
      animation: collapseSecondBody 2s forwards;
    }
  }
  &.goDown {
    position: absolute;
    left: 29%;
    top: 0;
    transform: rotate(-90deg) translateY(-50%);

    .scroll-texture {
      display: none;
    }

    .rolling-paper-top {
      top: 29%;
      left: 0;
      transform: translateY(70%);
    }

    .rolling-paper-bottom {
      bottom: 29%;
      left: 0;
      transform: translateY(-70%);
    }

    .rolling-paper-body {
      clip-path: inset(50% 0% 50% 0%);
    }

    animation: goDown 2s forwards;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  text-align: center;
}
</style>
