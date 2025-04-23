<template>
  <div class="book-shelf">
    <!-- <img src="/image/book/book-shelf.png" alt="" /> -->
    <div class="media-content">
      <div v-if="selectedOption === '1' && computedDocumentList">
        <h3 class="media-title">Thư viện ấn phẩm</h3>
        <Swiper
          :slides-per-view="3"
          navigation
          :modules="[Navigation]"
          class="media-swiper"
        >
          <SwiperSlide
            v-for="(el, index) in computedDocumentList"
            :key="index"
            class="media-slide"
          >
            <img
              class="book-shelf-item"
              :src="el.thumbnail"
              alt=""
              @click="openBookDetail(index)"
            />
          </SwiperSlide>
          <SwiperSlide
            v-for="(el, index) in computedDocumentList"
            :key="index"
            class="media-slide"
          >
            <img
              class="book-shelf-item"
              :src="el.thumbnail"
              alt=""
              @click="openBookDetail(index)"
            />
          </SwiperSlide>
          <SwiperSlide
            v-for="(el, index) in computedDocumentList"
            :key="index"
            class="media-slide"
          >
            <img
              class="book-shelf-item"
              :src="el.thumbnail"
              alt=""
              @click="openBookDetail(index)"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div v-else-if="selectedOption === '2'">
        <h3 class="media-title">Thư viện hình ảnh</h3>
        <Swiper
          :slides-per-view="3"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :modules="[Navigation]"
          class="media-swiper"
        >
          <!-- <template    v-for="(image_folder, index) in personDetailStore.personDetail.image_folder"
            :key="index"> -->

          <SwiperSlide
            v-for="(el, index) in personDetailStore.personDetail.image_folder"
            :key="index"
            class="media-slide"
          >
            <div
              class="d-flex flex-column justify-content-center align-items-center album-image"
            >
              <img
                class="book-shelf-album"
                :src="
                  el.image || el.thumbnail || '/image/yellow-background.png'
                "
                alt=""
                @click="openAlbumDetail(index)"
              />
              <h3>{{ el.translations[store.lang].name }}</h3>
            </div>
          </SwiperSlide>
          <!-- </template> -->
        </Swiper>
        <div class="swiper-button-prev">
          <img class="nav-icon-left" src="/image/splash-left.svg" alt="" />
        </div>
        <div class="swiper-button-next">
          <img class="nav-icon-right" src="/image/splash-right.svg" alt="" />
        </div>
      </div>
      <div v-else>
        <h3 class="media-title">Thư viện video</h3>
        <!-- :audioSrc="
          personDetailStore.personDetail.audio_folder[0].audio_list[0]
            .translations[store.lang].file
        " -->
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
            v-for="(el, index) in computedAudiolist"
            :key="index"
            class="media-slide"
          >
            <div
              class="d-flex flex-column justify-content-center align-items-center album-image"
            >
              <video
                class="book-shelf-video"
                alt=""
                @click="openVideoDetail(index)"
              >
                Your browser does not support the video tag.
                <source
                  :src="el.translations[store.lang].file"
                  type="video/mp4"
                />
              </video>
              <h3>{{ el.translations[store.lang].name }}</h3>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="swiper-button-prev">
          <img class="nav-icon-left" src="/image/splash-left.svg" alt="" />
        </div>
        <div class="swiper-button-next">
          <img class="nav-icon-right" src="/image/splash-right.svg" alt="" />
        </div>
        <!-- <VideoModal :close="closeVideo" /> -->
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
    </div>
    <Transition name="fade">
      <Modal
        :modelValue="isOpenFlipBook"
        @update:modelValue="isOpenFlipBook = $event"
      >
        <FlipBookHardcode
          :close="closeFlipBook"
          :link="
            computedDocumentList[selectedBookIndex]?.file
              ? computedDocumentList[selectedBookIndex]?.file
              : computedDocumentList[selectedBookIndex]?.link
          "
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
          :albumList="
            personDetailStore.personDetail.image_folder[selectedAlbumIndex]
          "
        />
      </Modal>
    </Transition>
    <Transition name="fade">
      <Modal
        :modelValue="isVideoAlbum"
        @update:modelValue="isVideoAlbum = $event"
      >
        <VideoModal
          :close="closeVideoAlbum"
          :name="
            computedAudiolist[selectedVideoIndex].translations[store.lang].name
          "
          :audioSrc="
            computedAudiolist[selectedVideoIndex].translations[store.lang].file
          "
        />
      </Modal>
    </Transition>
    <div class="left-ink-btn" @click="handleNavigate">
      <img src="/image/map/back.svg" />
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
import FlipBookHardcode from "@/components/Book/FlipBookHardcode.vue";
import VideoModal from "@/components/Book/VideoModal.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store/useStore";
import usePersonDetail from "@/store/usePersonDetail";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

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
const router = useRouter();
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

const {
  isOpen: isVideoAlbum,
  open: openVideoAlbum,
  close: closeVideoAlbum,
} = useModal();

const selectedOption = ref("1");
const selectedBookIndex = ref(0);
const selectedAlbumIndex = ref(0);
const selectedVideoIndex = ref(0);

// Method to update `selectedOption`
const updateSelectedOption = (value) => {
  selectedOption.value = value;
};
// const computedDocumentList = computed(() => {
//   const totalDocumentList = [
//     ...(personDetailStore.personDetail.document_folder[0]?.document_list || []),
//     ...(personDetailStore.personDetail.document_folder[1]?.document_list || []),
//   ];

//   const newComputedDocumentList = totalDocumentList.filter(
//     (el) => el.link || el.file
//   );

//   const extraItem =
//     personDetailStore.personDetail.document_folder[1]?.document_list?.[4];
//   if (extraItem) {
//     newComputedDocumentList.push(extraItem);
//   }

//   return newComputedDocumentList;
// });

const computedDocumentList = computed(() => {
  const totalDocumentList = [
    ...personDetailStore.personDetail.document_folder[0]?.document_list,
    // ...personDetailStore.personDetail.document_folder[1]?.document_list,
  ];
  const newComputedDocumentList = totalDocumentList.filter(
    (el) => el.link || el.file
  );
  newComputedDocumentList.push(
    personDetailStore.personDetail.document_folder[0].document_list[4]
  );
  return newComputedDocumentList;
});

const computedAudiolist = computed(() => {
  return personDetailStore.personDetail.video_folder[0].video_list;
});

const openBookDetail = (index) => {
  selectedBookIndex.value = index;
  openFlipBook();
};
const openAlbumDetail = (index) => {
  selectedAlbumIndex.value = index;
  openImageAlbum();
};
const openVideoDetail = (index) => {
  selectedVideoIndex.value = index;
  openVideoAlbum();
};
const closeVideo = () => {
  selectedOption.value = "1";
};
const handleNavigate = () => {
  router.push({ name: "detail", params: { id: route.params.id } });
};
console.log();
</script>

<style lang="scss" scoped>
.book-shelf {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/image/yellow-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  .media-title {
    font-family: $primary-heading-family;
    font-size: 14rem;
    text-align: center;
    margin-bottom: 30rem;
  }
  .media-content {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: fit-content;
    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 75%;
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
    .album-image {
      h3 {
        text-align: center;
        font-family: $heading-family;
        font-size: 3rem;
        margin-top: 2rem;
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
  left: 3%;
  img {
    width: 88%;
    height: 100%;
    object-fit: contain;
  }
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
