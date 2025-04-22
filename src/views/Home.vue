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
import { useMouse } from "@vueuse/core";
import HomeBgImage from "@/components/Home/HomeBgImage.vue";
import ScrollPaperTexture from "@/components/Home/ScrollPaperTexture.vue";

const animateExit = ref(false);
const homeVideo = ref(null);
const scrollPaper = ref(null);

const { x, y } = useMouse();

// Rectangle boundaries
const rect = {
  x1: 2500,
  y1: 1280,
  x2: 3400,
  y2: 1460,
};

const startExitAnimation = () => {
  animateExit.value = true;
  homeVideo.value.style.display = 'none';
};

// const handleClickVideo = () => {
//   if (
//     x.value >= rect.x1 &&
//     x.value <= rect.x2 &&
//     y.value >= rect.y1 &&
//     y.value <= rect.y2
//   ) {
//     console.log('check',123)
//     // Inside rectangle → stop video
//     if (homeVideo.value) {
//       // homeVideo.value.pause();
//       // Optionally hide the video
//       homeVideo.value.style.zIndex = 0;
//     }

//     // Call the startAnimation method on the ScrollPaperTexture component
//     if (scrollPaper.value) {
//       // Access the component's startAnimation method
//       // scrollPaper.value.startAnimation();
//     }

//     // This will now be triggered by the ScrollPaperTexture's emitted event
//     // animateExit.value = true;
//   }
// };
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
