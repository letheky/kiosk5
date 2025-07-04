<template>
  <div class="player">
    <!-- Play/Pause Button -->
    <div class="play-button" @click="togglePlay">
      <Transition name="fade">
        <template v-if="isPlaying">
          <img src="/image/pause-circle-rounded.svg" alt="" />
        </template>
        <template v-else>
          <img src="/image/play-circle-rounded.svg" alt="" />
        </template>
      </Transition>
    </div>

    <!-- Progress Bar -->
    <div
      class="audio-progress-bar"
      :style="{
        '--progressPercent': `${progressPercentage}%`,
      }"
      @click="onProgressBarClick"
      ref="progressBarRef"
    >
      <img class="played-audio" src="/image/audio-progress-full.svg" alt="" />
      <img class="unplayed-audio" src="/image/audio-progress.svg" alt="" />
    </div>
    <!-- Time Display -->
    <div class="time-display">
      <!-- {{ formatTime(currentTime) }} / {{ formatTime(duration) }} -->
      {{ formatTime(duration) }}
    </div>

    <!-- Hidden audio element -->
    <audio
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onAudioEnded"
    >
      <!-- Replace this with your actual audio file source -->
      <source :src="resolvedAudioSrc" type="audio/mp3" />
    </audio>
  </div>
</template>
<script>
import { formatTime } from "@/utils/utils.js"; // Assuming you have a utility function for formatting time
export default {
  name: "CustomAudio",
};
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

const audioRef = ref(null);
const progressBarRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const resolvedAudioSrc = ref(""); // Resolved audio source

const { audioSrc } = defineProps(["audioSrc"]);

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// Watch for changes to audioSrc prop and update resolvedAudioSrc
watch(
  () => audioSrc,
  async (newAudioSrc) => {
    if (newAudioSrc) {
      try {
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

// Handle audio finishing
const onAudioEnded = () => {
  isPlaying.value = false; // Set play state to false
  audioRef.value.currentTime = 0;
  currentTime.value = 0;
};

// Handle click on progress bar to seek to specific time
const onProgressBarClick = (event) => {
  if (!audioRef.value || !progressBarRef.value || duration.value === 0) return;

  const rect = progressBarRef.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const progressBarWidth = rect.width;
  const clickPercentage = clickX / progressBarWidth;
  
  // Calculate the new time based on click position
  const newTime = clickPercentage * duration.value;
  
  // Set the audio current time
  audioRef.value.currentTime = newTime;
  currentTime.value = Math.floor(newTime);
};
</script>

<style lang="scss" scoped>
$text-color: #444;
$unplayed-color: #e7d7cf; // Your current track color

.player {
  display: flex;
  width: 100%;
  height: 12rem;
  margin-top: 2rem;
  gap: 1rem;
  align-items: center;

  .play-button {
    position: relative;
    img {
      width: 8rem;
      position: absolute;
      top: 0;
      transform: translateY(-50%);
    }
  }

  .audio-progress-bar {
    position: relative;
    width: 100%;
    height: 4rem;
    margin-left: 10rem;
    cursor: pointer; // Add cursor pointer to indicate clickable area

    .unplayed-audio {
      position: absolute;
      clip-path: inset(0 0 0 var(--progressPercent));
    }
    .played-audio {
      position: absolute;
    }
  }

  .time-display {
    font-size: 3rem;
  }
}
</style>