<template>
  <div class="celeb-card">
    <div class="scroll-container">
      <img
        class="rolling-paper-top"
        src="/image/home/rolling-paper-top.png"
        alt=""
      />
      <div class="scroll-texture">
        <img src="/image/home/vignettetop.png" alt="" />
        <h1>{{ name }}</h1>
        <Button
          dynamicClass="btn-home"
          :path="{ name: 'detail', params: { id } }"
          >Tìm hiểu</Button
        >
        <img src="/image/home/vignettebot.png" alt="" />
      </div>
      <img
        class="rolling-paper-bottom"
        src="/image/home/rolling-paper-bottom.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
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
});
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
    align-items: center;
    z-index: $priority-high;

    .rolling-paper-top {
      position: absolute;
      bottom: 12%;
      left: 3%;
      width: 90%;
      z-index: $priority-max;
    }

    .rolling-paper-bottom {
      position: absolute;
      top: 12%;
      left: 3%;
      z-index: $priority-max;
      width: 90%;
    }

    .scroll-texture {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: url("/image/home/scrollbody.png") no-repeat center
        center/contain;
      height: 100%;
      width: 100%;

      h1 {
        font-size: 12rem;
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
        position: absolute;
        width: 80%;

        &:nth-of-type(1) {
          top: 20%;
          left: 8%;
          -webkit-mask-image: linear-gradient(to top, transparent, black);
          mask-image: linear-gradient(to top, transparent, black);
        }

        &:nth-of-type(2) {
          bottom: 20%;
          left: 8%;
          -webkit-mask-image: linear-gradient(to bottom, transparent, black);
          mask-image: linear-gradient(to bottom, transparent, black);
        }
      }
    }
  }
}
</style>
