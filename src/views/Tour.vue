<template>
  <div class="tour">
    <h1 class="tour-heading">Thờ tự</h1>
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
          @click="openDetailTour(el)"
        />
        <img src="/image/tour/tour-pre.png" alt="" class="tour-pre" />
      </SwiperSlide>
    </Swiper>
    <Transition name="fade">
      <Modal :modelValue="isOpen" @update:modelValue="isOpen = $event">
        <iframe
          :src="iframeSrc"
          width="80%"
          height="80%"
          allow="xr-spatial-tracking; gyroscope; accelerometer; magnetometer; camera; microphone; fullscreen; autoplay"
          allowvr
          mozallowfullscreen
          webkitallowfullscreen
        >
        </iframe>
        <InkDropButton class="close-ink-btn" @click="close">
          <CloseIcon color="#fff" />
        </InkDropButton>
      </Modal>
    </Transition>
    <Nav />
    <router-link :to="{ name: 'detail', params: { id: route.params.id } }">
      <img
        style="
          position: absolute;
          bottom: 0px;
          left: 120px;
          width: 260px;
          height: auto;
        "
        src="/image/detail/back.png"
        alt=""
        class="floor"
      />
    </router-link>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import Modal from "@/components/Modal.vue";
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import usePersonDetail from "@/store/usePersonDetail";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import useModal from "@/composables/useModal";

const route = useRoute();
const { isOpen, open, close } = useModal();
const personDetailStore = usePersonDetail();
const iframeSrc = ref(null);

const computedTourList = computed(() => {
  const result = personDetailStore.personDetail.tour_folder[0].tour_list.reduce(
    (acc, curr) => {
      acc.push(curr);
      return acc;
    },
    []
  );
  return result;
});

const openDetailTour = (tour) => {
  open();
  iframeSrc.value = tour.link;
};

</script>

<style lang="scss" scoped>
.tour {
  width: 100%;
  height: 100%;
  background: url("/image/yellow-background.png") no-repeat center/cover;
  padding: 10rem;

  .tour-heading {
    font-family: $primary-heading-family;
    font-size: 16rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .tour-swiper {
    width: 100%;
    height: 100%;

    .tour-slide {
      width: 100%;
      height: 100%;
      display: flex;
      .tour-pre {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10rem;
        height: 10rem;
        z-index: 9;
        background: url("/image/tour/tour-pre.png") no-repeat center/contain;
      }

      .tour-item {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: relative;

        padding: 6rem;
        background: url("/image/book/detail-book-bg.png") no-repeat
          center/contain;
      }
    }
  }

  .left-ink-btn {
    @include flex-center-vertical;
    position: absolute;
    bottom: 5%;
    left: 3%;
    z-index: $priority-medium;
    img {
      width: 88%;
      height: 100%;
      object-fit: contain;
    }
    h3 {
      font-size: 4rem;
    }
  }

  .close-ink-btn {
    position: absolute;
    bottom: 0;
    left: 5%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 20rem;
    height: 20rem;
  }
}
</style>
