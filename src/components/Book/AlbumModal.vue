<template>
  <div class="book-detail-container">
    <Swiper
      :slides-per-view="1"
      :modules="[Navigation, EffectFade]"
      :navigation="{
        nextEl: '.book-detail-button-next',
        prevEl: '.book-detail-button-prev',
      }"
      :effect="'fade'"
      :fadeEffect="{ crossFade: true }"
      class="book-detail-swiper"
    >
      <SwiperSlide
        v-for="(image, index) in albumList.image_list"
        :key="index"
        class="my-swiper"
      >
        <img
          v-if="image.file || image.thumbnail"
          :src="image.file || image.thumbnail"
          alt="Book cover"
          class="book-detail-image"
        />
      </SwiperSlide>
    </Swiper>
    <div class="book-detail-button-prev">
      <img class="nav-icon-left" src="/image/splash-left-white.svg" alt="" />
    </div>
    <div class="book-detail-button-next">
      <img class="nav-icon-right" src="/image/splash-right-white.svg" alt="" />
    </div>
    <InkDropButton class="close-ink-btn" @click="close">
      <CloseIcon color="#fff" />
    </InkDropButton>
  </div>
</template>

<script>
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectFade } from "swiper/modules";

export default {
  name: "AlbumModal",
  components: {
    InkDropButton,
    CloseIcon,
    Swiper,
    SwiperSlide,
  },
};
</script>

<script setup>
const props = defineProps({
  close: Function,
  albumList: Object,
});
</script>

<style lang="scss" scoped>
.book-detail-container {
  display: flex;
  align-items: center;
  padding: 2rem;
  width: 90%;
  height: 85%;
  margin: 0 auto;
  background: url("/image/book/detail-book-bg.png") no-repeat center center /
    contain;

  .book-detail-swiper {
    width: 100%;
    height: 100%;
    .swiper-slide {
      opacity: 0;
      transition: opacity 0.3s;

      &.swiper-slide-active {
        opacity: 1;
      }
    }
    .my-swiper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .book-detail-image {
        height: 60vh;
        max-width: 68%; /* Instead of padding left/right 16% */
        object-fit: contain;
      }

      .book-detail-info {
        p {
          font-size: 4rem;
        }
      }
    }
  }

  .book-detail-button-prev,
  .book-detail-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;

    &::after {
      display: none; /* Hide default arrows */
    }
  }

  .book-detail-button-prev {
    left: 7%;

    .nav-icon-left {
      width: 10rem;
      height: auto;
    }
  }

  .book-detail-button-next {
    right: 7%;

    .nav-icon-right {
      width: 10rem;
      height: auto;
    }
  }

  .close-ink-btn {
    position: absolute;
    bottom: 12%;
    right: 19%;
    width: 20rem;
    height: 20rem;
    z-index: $priority-medium;
  }
}

.swiper-wrapper {
  display: flex;
  align-items: center;
}
</style>
