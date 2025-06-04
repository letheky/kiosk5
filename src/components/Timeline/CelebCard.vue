<template>
  <div class="celeb-card">
    <div class="scroll-container">
      <div
        class="scroll-body"
        :class="{
          active: activeId === id,
          inactive: clicked && activeId !== id,
        }"
        @click="handleClick"
      >
        <img
          class="pattern-img"
          src="/image/timeline/pattern-left.png"
          alt=""
        />
        <img
          class="pattern-img"
          src="/image/timeline/pattern-right.png"
          alt=""
        />
        <div class="celeb-image-container">
          <img
            class="celeb-image"
            :src="image"
            :style="{ display: image ? 'block' : 'none' }"
            alt=""
          />
        </div>
        <h1>{{ name }}</h1>
        <Button
          class="celeb-button"
          dynamicClass="btn-home"
          :path="{ name: 'detail', params: { id } }"
          style="z-index: 3"
        >
          Tìm hiểu
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  activeId: {
    type: [Boolean, String],
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  setActiveId: {
    type: Function,
    required: true,
  },
});

const clicked = ref(false);

const handleClick = () => {
  clicked.value = true;
  props.setActiveId(props.id);
};
</script>

<style lang="scss">
.celeb-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .scroll-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: $priority-high;

    .scroll-body {
      width: 90%;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      background: url("/image/timeline/scroll-paper.png") no-repeat center/cover;
      transition: all 1s ease-in-out;
      animation: slideDown 1s ease-in-out;

      .pattern-img {
        position: absolute;
        width: fit-content;
        height: 39%;
        // opacity: 0;
        transition: all 1s ease-in-out;
        &:nth-of-type(1) {
          left: 12%;
          transform: rotateY(90deg);
        }
        &:nth-of-type(2) {
          right: 14%;
          transform: rotateY(90deg);
        }
      }

      h1 {
        font-size: 12rem;
        color: $light-dark-color;
        font-family: $primary-heading-family;
        text-align: center;
        z-index: $priority-three;
      }

      .inactive-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: $priority-one;
      }
      .celeb-image-container {
        width: 60%;
        height: 66%;
        z-index: $priority-two;

        .celeb-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 40%,
            black 60%,
            transparent
          );
        }
      }

      .celeb-button {
        opacity: 0;
        transform: scale(0);
        transition: all 1s ease-in-out;
        pointer-events: none;
      }

      &.active {
        background: url("/image/timeline/scroll-paper-active.png") no-repeat
          center/cover;
        width: 100%;
        height: 100%;
        .celeb-button {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
        .pattern-img {
          opacity: 1;
        }
        .pattern-img:nth-of-type(1) {
          transform: rotateY(0deg);
        }
        .pattern-img:nth-of-type(2) {
          transform: rotateY(0deg);
        }
      }
      &.inactive {
        background: url("/image/timeline/scroll-paper.png") no-repeat center
          center/cover;

        .celeb-image-container {
          .celeb-image {
            filter: grayscale(100%);
            opacity: 0.5;
          }
        }
      }
    }
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
