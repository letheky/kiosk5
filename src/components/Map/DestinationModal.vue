<template>
  <div class="destination-modal">
    <div
      class="modal-heading d-flex justify-content-between align-items-center"
    >
      <h1>{{ destinationDetail.translations[store.lang].name }}</h1>
      <img src="/image/close-icon.svg" alt="" @click="$emit('close')" />
    </div>
    <div
      class="modal-desc"
      v-html="destinationDetail.translations[store.lang].content"
    ></div>
    <div class="modal-asset">
      <div class="multimedia d-flex justify-content-between align-items-center">
        <div class="asset-media d-flex">
          <h2
            v-if="destinationDetail.image_folder.length > 0"
            :class="{ active: selectedTab === 'image' }"
            @click="selectedTab = 'image'"
          >
            Hình ảnh
          </h2>
          <hr v-if="destinationDetail.video_folder.length > 0" />
          <h2
            v-if="destinationDetail.video_folder.length > 0"
            :class="{ active: selectedTab === 'video' }"
            @click="selectedTab = 'video'"
          >
            Video
          </h2>
        </div>
      </div>
      <div class="asset-list">
        <img
          :src="destinationDetail.thumbnail || destinationDetail.image"
          alt="Asset"
          class="asset-thumbnail"
        />
        <!-- <Swiper
          :slides-per-view="4"
          space-between="20"
          v-if="selectedTab === 'image' && destinationDetail.image_folder.length > 0 "
        >
          <SwiperSlide
            v-for="(image, index) in destinationDetail.image_folder"
            :key="image.id"
          >
            <div>
              <div v-if="!imageLoadStates[index]" class="skeleton-img" />
              <img
                :src="image.thumbnail || image.image"
                alt="Asset"
                @load="handleImageLoaded(index)"
              />
            </div>
          </SwiperSlide>
        </Swiper> -->
        <!-- <Swiper
          :slides-per-view="4"
          space-between="20"
          v-if="selectedTab === 'video' && destinationDetail.video_folder.length > 0"
        >
          <SwiperSlide
            v-for="(video, index) in destinationDetail.video_folder"
            :key="video.id"
          >
            <div>
              <div v-if="!videoLoadStates[index]" class="skeleton-img" />
              <video :src="video.thumbnail || video.image" />
            </div>
          </SwiperSlide>
        </Swiper> -->

        <img :src="destinationDetail.src" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import useStore from "@/store/useStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const store = useStore();
const { destinationDetail } = defineProps(["destinationDetail"]);

const selectedTab = ref("image");

//Handle image load
const imageLoadStates = ref([]);
const currentAssets = computed(() => {
  return selectedTab.value === "image"
    ? destinationDetail.imageData[0]
    : destinationDetail.videoData[0];
});

watch(
  () => destinationDetail.imageData,
  (newImages) => {
    const images = newImages?.[0] || [];
    imageLoadStates.value = new Array(images.length).fill(false);
  },
  { immediate: true }
);

const handleImageLoaded = (index) => {
  imageLoadStates.value[index] = true;
};
</script>

<style lang="scss" scoped>
.destination-modal {
  position: absolute;
  bottom: 4%;
  left: 49%;
  width: 30%;
  height: 35%;
  background-color: #f7ecdf;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .modal-heading {
    h1 {
      font-size: 5rem;
      font-weight: 700;
      color: #1f1b13;
    }
    img {
      width: 4rem;
      height: 4rem;
    }
  }

  .modal-desc {
    font-family: $text-family;
    font-size: 3.2rem;
  }

  .modal-asset {
    overflow: hidden;
    .multimedia {
      margin-bottom: 1rem;
      .asset-media {
        @include flex-center;

        gap: 2rem;
        h2 {
          font-size: 4rem;
          color: #000000;
          font-family: $text-family;
          &.active {
            font-family: $heading-family;
            animation: fade 1s ease-in-out forwards;
          }
        }
        hr {
          width: 0.5rem;
          height: 8rem;
          background-color: #1f1b13;
          margin: 0 2rem;
        }
      }
      .media-360-btn {
        background-color: #78590c;
        padding: 1rem 2rem;
        border: none;
        cursor: pointer;
        h3 {
          font-size: 4rem;
          color: #fff;
          font-family: $text-family;
        }
      }
    }

    .asset-list {
      height: 100%;
      width: 100%;

      
      .swiper {
        width: 100%;
      }
      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .asset-item {
        width: 100%;
        aspect-ratio: 1 / 1;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
          display: block;
        }

        .skeleton-img {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          background: linear-gradient(
            90deg,
            #e0e0e0 25%,
            #f0f0f0 50%,
            #e0e0e0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
      }

      // fake data
      img {
        height: 100%;
        object-fit: contain;
        // margin: 0 auto;
      }
    }
  }
}
p {
  font-size: 3rem !important;
}
.close-ink-btn {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 20rem;
  height: 20rem;
  z-index: $priority-super;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
}
</style>
