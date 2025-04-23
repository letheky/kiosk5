<template>
  <div class="tour">
    <Swiper
      :slides-per-view="3"
      navigation
      :modules="[Navigation]"
      class="tour-swiper"
    >
      <SwiperSlide
        v-for="(el, index) in computedTourList"
        :key="index"
        class="tour-slide"
      >
        <img
          class="tour-item"
          :src="el.thumbnail"
          alt=""
          @click="openBookDetail(index)"
        />
      </SwiperSlide>
    </Swiper>
    <div class="left-ink-btn" @click="handleNavigate">
      <img src="/image/map/back-reverse.svg" />
      <h3>Quay lại</h3>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import usePersonDetail from "@/store/usePersonDetail";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const personDetailStore = usePersonDetail();

const computedTourList = computed(() => {
  return personDetailStore.personDetail.image_folder;
})

const handleNavigate = () => {
  router.push({ name: "detail", params: { id: route.params.id } });
};
</script>

<style lang="scss" scoped>
.tour {
  width: 100%;
  height: 100%;
  background: url("/image/yellow-background.png") no-repeat center/cover;



  .left-ink-btn {
    @include flex-center-vertical;
    position: absolute;
    bottom: 5%;
    right: 3%;
    img {
      width: 88%;
      height: 100%;
      object-fit: contain;
    }
    h3 {
      font-size: 4rem;
    }
  }
}
</style>
