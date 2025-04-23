<template>
  <div class="player">
    <video
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
    >
      <!-- Replace this with your actual audio file source -->
      <source :src="resolvedAudioSrc" type="audio/mp4" />
    </video>
    <p style="color:#fff">{{ name }}</p>
    <div class="my-progress-bar">
      <div
        class="play-button"
        :class="{ playing: isPlaying }"
        @click="togglePlay"
      >
        <img v-if="!isPlaying" :src="PlayIcon" alt="Play" />
        <img v-else :src="PauseIcon" alt="Pause" />
      </div>

      <div class="slider-container">
        <div
          class="slider-progress"
          :style="{ width: progressPercentage + '%' }"
        ></div>
        <input
          type="range"
          min="0"
          :max="duration"
          step="1"
          v-model="currentTime"
          @input="onInputChange"
        />
      </div>
      <div class="time-display">
        <!-- {{ formatTime(currentTime) }} / {{ formatTime(duration) }} -->
        {{ formatTime(duration) }}
      </div>
    </div>

    <!-- Hidden audio element -->
    <InkDropButton class="close-ink-btn" @click="close">
      <CloseIcon color="#fff" />
    </InkDropButton>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

import PlayIcon from "/image/book/play.svg";
import PauseIcon from "/image/book/pause.svg";

const audioRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const props = defineProps({
  close: Function, // Change from closeVideo to close
  audioSrc: String,
  name: String,
});

const resolvedAudioSrc = ref(""); // Resolved audio source
// Watch for changes to audioSrc prop and update resolvedAudioSrc
watch(
  () => props.audioSrc,
  async (newAudioSrc) => {
    if (newAudioSrc) {
      try {
        console.log("chekc", newAudioSrc);
        resolvedAudioSrc.value = await newAudioSrc; // Resolve the promise
        if (audioRef.value) {
          audioRef.value.load(); // Reload the audio element with the new source
        }
      } catch (error) {
        console.error("Error resolving audioSrc:", error);
      }
    }
  },
  { immediate: true } // Run the watcher immediately to handle initial value
);

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

onMounted(() => {
  // Ensure audio element is available
  if (audioRef.value) {
    audioRef.value.addEventListener("loadedmetadata", onLoadedMetadata);
    audioRef.value.addEventListener("timeupdate", onTimeUpdate);
  }
});
// Cleanup event listeners when component is unmounted
onBeforeUnmount(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener("loadedmetadata", onLoadedMetadata);
    audioRef.value.removeEventListener("timeupdate", onTimeUpdate);
  }
});

// When metadata is loaded (e.g., audio duration)
const onLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = Math.floor(audioRef.value.duration);
  }
};

// Update currentTime as audio plays
const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = Math.floor(audioRef.value.currentTime);
  }
};

// Toggle play/pause
const togglePlay = () => {
  if (!audioRef.value) return;

  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play();
    isPlaying.value = true;
  }
};

// Handle manual slider (range input) change
const onInputChange = () => {
  if (audioRef.value) {
    audioRef.value.currentTime = currentTime.value;
  }
};

// Utility to format time in mm:ss
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
</script>

<style lang="scss" scoped>
$text-color: #444;
$unplayed-color: #e7d7cf; // Your current track color

.player {
  display: flex;
  align-items: center;
  padding: 5% 10%;
  gap: 2rem;
  justify-content: center;
  position: relative;
  flex-direction: column;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: $priority-max;
  backdrop-filter: blur(2rem);

  .my-progress-bar {
    position: relative;
    flex: 1;
    width: 74%;
    display: flex;
    align-items: center;
    gap: 3rem;
    border-radius: 4rem;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.3);
    margin-top: 1rem;
    .play-button {
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        img {
          filter: brightness(0.9);
        }
      }

      img {
        width: 10rem;
        height: 10rem;
      }
    }

    // This wrapper provides positioning context
    .slider-container {
      position: relative;
      height: 4rem;
      border-radius: 4rem;
      background: #e7d7cf;
      width: 100%;

      // This is the colored fill that shows progress
      .slider-progress {
        position: absolute;
        height: 100%;
        background: #ffd9e3;
        left: 0;
        top: 0;
        pointer-events: none; // Let clicks pass through to the slider
        border-top-left-radius: 4rem; //corner radius for colored fill
        border-bottom-left-radius: 4rem; //corner radius for colored fill
        z-index: 1; // Ensure it appears above the track
      }

      input[type="range"] {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-appearance: none;

        background: transparent;
        cursor: pointer;
        margin: 0;

        &::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          height: 100%;
          background: transparent; // Track is now transparent
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 6rem;
          width: 2rem;
          border: none;
          border-radius: 1rem;
          background: #fff;
          box-shadow: 0 0 1rem -0.25rem #00000040;
          margin-top: -1rem;
          transition: background-color 0.3s;
          position: relative;
          z-index: 2;

          &:hover {
            background: #f2f2f2;
          }
        }
      }
    }
    .time-display {
      font-size: 3rem;
      font-weight: 400;
      text-align: right;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  }

  video {
    width: 80%;
    // height: 90%;
  }

  .close-ink-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 20rem;
    height: 20rem;
  }
}
</style>
