<template>
  <div class="book-shelf">
    <div v-if="selectedOption === '3'" style="height: 100%">
      <VideoModal :close="closeVideo" />
    </div>
    <!-- <img src="/image/book/book-shelf.png" alt="" /> -->
    <div class="media-content">
      <div v-if="selectedOption === '1'">
        <Swiper
          :slides-per-view="3"
          navigation
          :modules="[Navigation]"
          class="media-swiper"
        >
          <SwiperSlide
            v-for="(el, index) in book"
            :key="index"
            class="media-slide"
          >
            <img
              class="book-shelf-item"
              :src="el.thumbnail"
              alt=""
              @click="openBookDetail(book, index)"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div v-else-if="selectedOption === '2'">
        <Swiper
          :slides-per-view="3"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :modules="[Navigation]"
          class="media-swiper"
        >
          <SwiperSlide
            v-for="(el, index) in album"
            :key="index"
            class="media-slide"
          >
            <img
              class="book-shelf-album"
              :src="el.image_list[0]"
              alt=""
              @click="openAlbumDetail(el, index)"
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
    </div>
    <div class="book-shelf-content">
      <div class="radio-group">
        <RadioBtn
          id="1"
          optionText="Ấn phẩm"
          :selectedOption="selectedOption"
          @update:selectedOption="updateSelectedOption"
        />
        <RadioBtn
          id="2"
          optionText="Hình ảnh"
          :selectedOption="selectedOption"
          @update:selectedOption="updateSelectedOption"
        />
        <RadioBtn
          id="3"
          optionText="Video"
          :selectedOption="selectedOption"
          @update:selectedOption="updateSelectedOption"
        />
      </div>
      <!-- <Transition name="bookshelf-fade">
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
      </Transition> -->
    </div>
    <Transition name="fade">
      <Modal
        :modelValue="isOpenFlipBook"
        @update:modelValue="isOpenFlipBook = $event"
      >
        <FlipBookHardcode
          :close="closeFlipBook"
          :link="book[selectedBookIndex].file"
        />
      </Modal>
    </Transition>
    <Transition name="fade">
      <Modal
        :modelValue="isImageAlbum"
        @update:modelValue="isImageAlbum = $event"
      >
        <AlbumModal
          :close="closeImageAlbum"
          :albumList="album[selectedAlbumIndex]"
        />
      </Modal>
    </Transition>
    <div class="left-ink-btn" @click="handleNavigate">
      <h3>Quay lại</h3>
    </div>
  </div>
</template>

<script>
import RadioBtn from "@/components/RadioBtn.vue";
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import RightIcon from "@/components/icons/RightIcon.vue";
import Modal from "@/components/Modal.vue";
import AlbumModal from "@/components/Book/AlbumModal.vue";
import { book, album, video } from "@/data/book";
import FlipBookHardcode from "@/components/Book/FlipBookHardcode.vue";
import VideoModal from "@/components/Book/VideoModal.vue";

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
    RightIcon,
    Swiper,
    SwiperSlide,
    FlipBookHardcode,
    AlbumModal,
    VideoModal,
  },
};
</script>

<script setup>
const route = useRoute();
const store = useStore();
const personDetailStore = usePersonDetail();
const {
  isOpen: isOpenFlipBook,
  open: openFlipBook,
  close: closeFlipBook,
} = useModal();
const {
  isOpen: isImageAlbum,
  open: openImageAlbum,
  close: closeImageAlbum,
} = useModal();

const workOfDocumentlist = ref([]); // Tác phẩm của nhân vật
const aboutDocumentlist = ref([]); // Tác phẩm về nhân vật

const selectedOption = ref("1");
const selectedBookIndex = ref(0);
const selectedAlbumIndex = ref(0);

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
  openFlipBook();
};
const openAlbumDetail = (album, index) => {
  selectedAlbumIndex.value = index;
  openImageAlbum();
};
const closeVideo = () => {
  selectedOption.value = "1";
};
const handleNavigate = () => {
  router.push({ name: "detail", params: { id: route.params.id } });
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
  .media-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 40%;
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
    .media-swiper {
      @include flex-center;
      margin: 0px 14rem;
      gap: 5rem;
      .media-slide {
        @include flex-center;
      }
    }
  }

  > img {
    width: 95%;
    object-fit: contain;
    position: absolute;
    mix-blend-mode: darken;
    top: 46%;
    left: 0;
  }

  .book-shelf-content {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    z-index: 999;

    .radio-group {
      font-size: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-around;

      // div:nth-of-type(1) {
      //   margin-bottom: 5rem;
      // }
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

img {
  width: 15vw;
}
img.book-shelf-album {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.left-ink-btn {
    @include flex-center-vertical;
    position: absolute;
    bottom: 5%;
    right: 3%;
    h3 {
      font-size: 4rem;
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
