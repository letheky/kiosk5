<template>
  <div class="home-page-banner">
    <!-- Moves down -->
    <img
      class="general"
      src="/image/home/General.png"
      alt="General"
      :class="{ 'exit-down': animateExit }"
    />
    <img
      class="kid1"
      src="/image/home/Kid1.png"
      alt="Kid1"
      :class="{ 'exit-down': animateExit }"
    />
    <img
      class="kid2"
      src="/image/home/Kid2.png"
      alt="Kid2"
      :class="{ 'exit-down': animateExit }"
    />
    <img
      class="people"
      src="/image/home/People.png"
      alt="People"
      :class="{ 'exit-down': animateExit }"
    />
    <img
      class="hoang-thanh"
      src="/image/home/HoangThanhBanner.png"
      alt="Hoang Thanh"
      :class="{ 'exit-down': animateExit }"
    />

    <!-- Moves up -->
    <img
      class="cloud-right"
      src="/image/home/cloud-right.png"
      alt="Cloud Right"
      :class="{ 'exit-up': animateExit }"
    />
    <img
      class="cloud-left"
      src="/image/home/cloud-left.png"
      alt="Cloud Left"
      :class="{ 'exit-up': animateExit }"
    />

    <!-- Moves left -->
    <img
      class="top-left-flag"
      src="/image/home/TopLeftFlag.png"
      alt="Top Left Flag"
      :class="{ 'exit-left': animateExit }"
    />

    <!-- Moves right -->
    <img
      class="bottom-left-icon"
      src="/image/home/BottomLeftIcon.png"
      alt="Bottom Left Icon"
      :class="{ 'exit-right': animateExit }"
    />
  </div>
</template>

<script setup>
defineProps({
  animateExit: Boolean,
});
</script>

<style lang="scss" scoped>
.home-page-banner {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("/image/home/YellowBg.png") no-repeat center/cover;
  background-color: #e3d9cc;
  overflow: hidden;

  img {
    transition: transform 1s ease, opacity 1s ease;
    position: absolute;
  }

  // Specific positions
  .general {
    top: 32%;
    left: 12%;
    width: 23%;
    z-index: $priority-two;
  }

  .kid1 {
    bottom: 0;
    left: 0%;
    width: 16%;
    z-index: $priority-four;
  }

  .kid2 {
    bottom: -1%;
    left: 11%;
    width: 14%;
    z-index: $priority-three;
  }

  .people {
    bottom: 10%;
    left: 32%;
    width: 20%;
    z-index: $priority-four;
  }

  .hoang-thanh {
    top: 8%;
    left: 0;
    width: 80%;
    z-index: $priority-one;
  }

  .cloud-left {
    top: 0%;
    left: 0;
    width: 60%;
    mix-blend-mode: luminosity;
  }

  .cloud-right {
    top: 0%;
    right: 0;
    width: 60%;
    mix-blend-mode: luminosity;
  }

  .top-left-flag {
    top: 0;
    left: 0;
    width: 18%;
  }

  .bottom-left-icon {
    bottom: 0;
    right: 0;
    width: 18%;
  }

  // Animations
  .exit-left {
    transform: translateX(-100%);
    opacity: 0;
  }

  .exit-right {
    transform: translateX(100%);
    opacity: 0;
  }

  .exit-down {
    transform: translateY(100%);
    opacity: 0;
  }

  .exit-up {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
