<template>
  <div class="home-page">
    <HomeBgImage :animateExit="animateExit" />
    <ScrollPaperTexture ref="scrollPaper" @trigger-exit="startExitAnimation" />
    <video
      ref="homeVideo"
      class="home-banner-video"
      src="/audio/home-banner-no-button.mp4"
      autoplay
      loop
      muted
      @click="handleClickVideo"
    ></video>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeBgImage from "@/components/Home/HomeBgImage.vue";
import ScrollPaperTexture from "@/components/Home/ScrollPaperTexture.vue";

const animateExit = ref(false);
const homeVideo = ref(null);
const scrollPaper = ref(null);

const startExitAnimation = () => {
  animateExit.value = true;
  homeVideo.value.style.display = "none";
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100%;

  .home-banner-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: $priority-medium;
  }
}
</style>
