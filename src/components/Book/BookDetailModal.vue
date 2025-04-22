<template>
  <div class="book-detail-container">
    <Swiper
      :slides-per-view="1"
      :initial-slide="selectedBookIndex"
      :modules="[Navigation]"
      :navigation="{
        nextEl: '.book-detail-button-next',
        prevEl: '.book-detail-button-prev',
      }"
      class="book-detail-swiper"
    >
      <SwiperSlide
        v-for="(book, index) in computedDocumentList"
        :key="index"
        class="my-swiper"
      >
        <img
          v-if="book.thumbnail"
          :src="book.thumbnail"
          alt="Book cover"
          class="book-detail-image"
          @click="openFlipBook"
        />
        <div class="book-detail-info">
          <p>{{ book.translations[store.lang].des }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="book-detail-button-prev">
      <img class="nav-icon-left" src="/image/splash-left-white.svg" alt="" />
    </div>
    <div class="book-detail-button-next">
      <img class="nav-icon-right" src="/image/splash-right-white.svg" alt="" />
    </div>
    <InkDropButton class="close-ink-btn" text="Đóng" @click="close">
      <CloseIcon color="#fff" />
    </InkDropButton>
  </div>
  <Transition name="fade">
    <Modal
      v-if="
        computedDocumentList[selectedBookIndex]?.link ||
        computedDocumentList[selectedBookIndex]?.file
      "
      :modelValue="isOpenFlipBook"
      @update:modelValue="isOpenFlipBook = $event"
    >
      <FlipBook
        v-if="computedDocumentList[selectedBookIndex]?.link"
        :close="closeFlipBook"
        :link="computedDocumentList[selectedBookIndex]?.link"
      />
      <FlipBook
        v-else
        :close="closeFlipBook"
        :link="computedDocumentList[selectedBookIndex]?.file"
      />
    </Modal>
  </Transition>
</template>

<script>
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import FlipBook from "./FlipBook.vue";
import Modal from "@/components/Modal.vue";

import useStore from "@/store/useStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import useModal from "@/composables/useModal";

export default {
  name: "BookDetailModal",
  components: {
    InkDropButton,
    CloseIcon,
    Modal,
    FlipBook,
    Swiper,
    SwiperSlide,
  },
};
</script>

<script setup>
const store = useStore();
const {
  isOpen: isOpenFlipBook,
  open: openFlipBook,
  close: closeFlipBook,
} = useModal();

const props = defineProps({
  close: Function,
  selectedBookIndex: Number,
  computedDocumentList: Array,
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
    // pointer-events: none;
    .my-swiper {
      display: flex;
      align-items: center;
      padding-left: 16%;
      padding-right: 16%;
      gap: 10rem;

      .book-detail-image {
        height: 60vh;
        width: 100%;
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
    width: 25rem;
    height: 25rem;
    z-index: $priority-medium;
  }
}

.swiper-wrapper {
  display: flex;
  align-items: center;
}
</style>
