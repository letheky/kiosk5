<template>
  <div class="book-shelf">
    <img src="/image/book/book-shelf.png" alt="" />
    <div class="book-shelf-content">
      <div class="radio-group">
        <RadioBtn
          id="1"
          optionText="Tác phẩm của nhân vật"
          :selectedOption="selectedOption"
          @update:selectedOption="updateSelectedOption"
        />
        <RadioBtn
          id="2"
          optionText="Tác phẩm về nhân vật"
          :selectedOption="selectedOption"
          @update:selectedOption="updateSelectedOption"
        />
      </div>
      <Transition name="bookshelf-fade">
        <div v-if="selectedOption === '1'" class="book-shelf__img">
          <Swiper
            :slides-per-view="3"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :modules="[Navigation]"
            class="book-swiper"
          >
            <SwiperSlide
              v-for="(book, index) in computedDocumentList.document_list"
              :key="index"
              class="book-slide"
            >
              <img
                class="book-shelf-item"
                :src="book.thumbnail"
                alt=""
                @click="openBookDetail(book, index)"
              />
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button-prev">
            <img class="nav-icon-left" src="/image/splash-left.svg" alt="" />
          </div>
          <div class="swiper-button-next">
            <img class="nav-icon-right" src="/image/splash-right.svg" alt="" />
          </div>
        </div>
        <div v-else class="book-shelf__img">
          <Swiper
            :slides-per-view="3"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :modules="[Navigation]"
            class="book-swiper"
          >
            <SwiperSlide
              v-for="(book, index) in computedDocumentList.document_list"
              :key="index"
              class="book-slide"
            >
              <img
                class="book-shelf-item"
                :src="book.thumbnail"
                alt=""
                @click="openBookDetail(book, index)"
              />
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button-prev">
            <img class="nav-icon-left" src="/image/splash-left.svg" alt="" />
          </div>
          <div class="swiper-button-next">
            <img class="nav-icon-right" src="/image/splash-right.svg" alt="" />
          </div>
        </div>
      </Transition>
    </div>
    <InkDropButton
      class="right-ink-btn"
      text="Giới thiệu"
      :path="{ name: 'detail', params: { id: personDetailStore.id } }"
    >
      <RightIcon color="#fff" />
    </InkDropButton>
    <Transition name="fade">
      <Modal
        :modelValue="isBookDetailModal"
        @update:modelValue="isBookDetailModal = $event"
      >
        <BookDetailModal
          :close="closeBookDetailModal"
          :selectedBookIndex="selectedBookIndex"
          :computedDocumentList="computedDocumentList.document_list"
        />
      </Modal>
    </Transition>
  </div>
</template>

<script>
import RadioBtn from "@/components/RadioBtn.vue";
import InkDropButton from "@/components/InkDropButton.vue";
import RightIcon from "@/components/icons/RightIcon.vue";
import Modal from "@/components/Modal.vue";
import BookDetailModal from "@/components/Book/BookDetailModal.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import useStore from "@/store/useStore";
import usePersonDetail from "@/store/usePersonDetail";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import { fetchPersonDocument } from "@/api/fetch";
import useModal from "@/composables/useModal";

export default {
  name: "Book",
  components: {
    RadioBtn,
    InkDropButton,
    RightIcon,
    Modal,
    Swiper,
    SwiperSlide,
  },
};
</script>

<script setup>
const route = useRoute();
const store = useStore();
const personDetailStore = usePersonDetail();
const {
  isOpen: isBookDetailModal,
  open: openBookDetailModal,
  close: closeBookDetailModal,
} = useModal();

const workOfDocumentlist = ref([]); // Tác phẩm của nhân vật
const aboutDocumentlist = ref([]); // Tác phẩm về nhân vật

const selectedOption = ref("1");
const selectedBookIndex = ref(0);

// Method to update `selectedOption`
const updateSelectedOption = (value) => {
  selectedOption.value = value;
};

const computedDocumentList = computed(() => {
  if (selectedOption.value === "1") {
    return personDetailStore.personDetail.document_folder[0];
  } else {
    return personDetailStore.personDetail.document_folder[1];
  }
});

const openBookDetail = (book, index) => {
  selectedBookIndex.value = index;
  openBookDetailModal();
};
</script>

<style lang="scss" scoped>
.book-shelf {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/image/yellow-background.png");
  background-repeat: no-repeat;
  background-size: cover;

  > img {
    width: 95%;
    object-fit: contain;
    position: absolute;
    mix-blend-mode: darken;
    top: 46%;
    left: 0;
  }

  .book-shelf-content {
    position: relative;
    top: 50%;
    left: 10%;
    z-index: 999;

    .radio-group {
      font-size: 5rem;

      div:nth-of-type(1) {
        margin-bottom: 5rem;
      }
    }

    .book-shelf__img {
      width: 40%;
      height: 50rem;
      position: absolute;
      top: 0;
      left: 30%;
      transform: translateY(-27%);

      .book-swiper {
        width: 100%;
        height: 100%;
        .book-slide {
          display: flex;
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        top: 60%;
        transform: translateY(-50%);
        z-index: 10;
        cursor: pointer;

        &::after {
          display: none; /* Hide default arrows */
        }
      }

      .swiper-button-prev {
        left: -5%;

        .nav-icon-left {
          width: 10rem;
          height: auto;
        }
      }

      .swiper-button-next {
        right: -5%;

        .nav-icon-right {
          width: 10rem;
          height: auto;
        }
      }
    }
  }

  .right-ink-btn {
    position: absolute;
    top: 80%;
    right: 0;
  }
}

.bookshelf-fade-enter-active,
.bookshelf-fade-leave-active {
  transition: opacity 0.5s ease;
}

.bookshelf-fade-enter-from,
.bookshelf-fade-leave-to {
  opacity: 0;
}
.slide-animation {
  animation: slideBookChange 1s ease-in-out;
}

@keyframes slideBookChange {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(-100px);
    opacity: 0;
  }
  51% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
