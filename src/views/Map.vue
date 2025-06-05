<template>
  <div class="map-detail">
    <div
      ref="mapWrapper"
      class="map-wrapper"
      :class="{ zoomed: zoomLevel > 1 }"
      @wheel.prevent="handleZoom"
    >
      <img
        ref="mapImage"
        class="map-image"
        src="/image/map/vn-map.png"
        alt=""
        :style="mapTransformStyle"
        draggable="false"
      />
      <TransitionGroup name="position-fade">
        <div
          class="marker-position"
          v-for="position in activePositionList"
          :key="position.id"
          :style="getMarkerStyle(position)"
          :class="{ zooming: isZooming }"
          @click.stop="showDestinationModal(position)"
        >
          <CustomMarker
            :color="selectedOption === '1' ? '#BA1A1A' : '#36693E'"
          />
        </div>
      </TransitionGroup>
    </div>

    <div class="radio-group">
      <RadioBtn
        id="1"
        optionText="Đường phố"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
        color="#BA1A1A"
      />
      <RadioBtn
        id="2"
        optionText="Trường học"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
        color="#36693E"
      />
    </div>

    <!-- Zoom Controls -->
    <div class="zoom-controls">
      <button @click="resetZoom" class="zoom-btn reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 21 21"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
          >
            <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
            <path d="M7.5 6.5h-4v-4" />
          </g>
        </svg>
      </button>
    </div>

    <Transition name="modal-fade">
      <DestinationModal
        v-if="clickedPositionId"
        :destinationDetail="
          activePositionList.find((el) => el.id === clickedPositionId)
        "
        @close="clickedPositionId = null; resetZoom()"
      />
    </Transition>

    <Transition name="fade" mode="out-in">
      <div v-if="showNav">
        <Nav />
      </div>
    </Transition>
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

<script>
import Nav from "@/components/Nav.vue";
import RadioBtn from "@/components/RadioBtn.vue";
import DestinationModal from "@/components/Map/DestinationModal.vue";
import CustomMarker from "@/components/CustomMarker.vue";

import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import usePersonDetail from "@/store/usePersonDetail";

export default {
  name: "MapDetail",
  components: {
    RadioBtn,
    DestinationModal,
    CustomMarker,
  },
};
</script>

<script setup>
const route = useRoute();
const personDetailStore = usePersonDetail();

const roadPositionList = ref([]);
const schoolPositionList = ref([]);

const activePositionList = computed(() => {
  if (selectedOption.value === "1") {
    return roadPositionList.value;
  } else {
    return schoolPositionList.value;
  }
});

const clickedPositionId = ref(null);
const selectedOption = ref("2");

// Zoom and pan state
const zoomLevel = ref(1);
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);
const lastPanPoint = ref({ x: 0, y: 0 });
const isZooming = ref(false);

// Zoom configuration
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.2;

// Refs
const mapWrapper = ref(null);
const mapImage = ref(null);

// Add computed properties for map dimensions
const mapDimensions = computed(() => {
  if (!mapWrapper.value || !mapImage.value) return { width: 0, height: 0 };
  return {
    width: mapWrapper.value.clientWidth,
    height: mapWrapper.value.clientHeight,
  };
});

// Add computed property for marker positions
const markerPositions = computed(() => {
  const positions = new Map();

  const calculatePosition = (position) => {
    if (!position?.coordinates) return { x: 0, y: 0 };
    const [xPercent, yPercent] = position.coordinates
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    const x = (xPercent / 100) * mapDimensions.value.width;
    const y = (yPercent / 100) * mapDimensions.value.height;
    return { x, y };
  };

  // Calculate positions for both lists
  [...roadPositionList.value, ...schoolPositionList.value].forEach(
    (position) => {
      positions.set(position.id, calculatePosition(position));
    }
  );

  return positions;
});

// Update the template to use the computed positions
const getMarkerStyle = (position) => {
  const pos = markerPositions.value.get(position.id);
  return {
    top: `${panY.value}px`,
    left: `${panX.value}px`,
    transform: `translate(${pos.x * zoomLevel.value}px, ${
      pos.y * zoomLevel.value
    }px) `,
    transformOrigin: "center",
  };
};

// Computed transform style
const mapTransformStyle = computed(() => ({
  transform: `translate(${panX.value}px, ${panY.value}px) scale(${zoomLevel.value})`,
  transformOrigin: "top left",
  transition: isPanning.value ? "none" : "transform 0.2s ease-out",
}));

// Method to update `selectedOption`
const updateSelectedOption = (value) => {
  selectedOption.value = value;
};

// Zoom methods
const handleZoom = (event) => {
  if (!mapWrapper.value || !mapImage.value) return;

  const rect = mapWrapper.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Calculate the point on the image before zoom
  const imagePointX = (mouseX - panX.value) / zoomLevel.value;
  const imagePointY = (mouseY - panY.value) / zoomLevel.value;

  // Determine zoom direction
  const zoomDirection = event.deltaY > 0 ? -1 : 1;
  const newZoom = Math.max(
    MIN_ZOOM,
    Math.min(MAX_ZOOM, zoomLevel.value + zoomDirection * ZOOM_STEP)
  );

  // Only show animation if we're not at min or max zoom
  if (newZoom !== MIN_ZOOM && newZoom !== MAX_ZOOM) {
    isZooming.value = true;
  }

  // Calculate new pan to keep the mouse point stable
  const newPanX = mouseX - imagePointX * newZoom;
  const newPanY = mouseY - imagePointY * newZoom;

  zoomLevel.value = newZoom;
  panX.value = newPanX;
  panY.value = newPanY;
  clampPan();

  // Reset zooming state after transition
  setTimeout(() => {
    isZooming.value = false;
  }, 200);
};

// const zoomIn = () => {
//   if (!mapWrapper.value) return;

//   const rect = mapWrapper.value.getBoundingClientRect();
//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;

//   const imagePointX = (centerX - panX.value) / zoomLevel.value;
//   const imagePointY = (centerY - panY.value) / zoomLevel.value;

//   const newZoom = Math.min(MAX_ZOOM, zoomLevel.value + ZOOM_STEP);

//   panX.value = centerX - imagePointX * newZoom;
//   panY.value = centerY - imagePointY * newZoom;
//   zoomLevel.value = newZoom;
//   clampPan();
// };

// const zoomOut = () => {
//   if (!mapWrapper.value) return;

//   const rect = mapWrapper.value.getBoundingClientRect();
//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;

//   const imagePointX = (centerX - panX.value) / zoomLevel.value;
//   const imagePointY = (centerY - panY.value) / zoomLevel.value;

//   const newZoom = Math.max(MIN_ZOOM, zoomLevel.value - ZOOM_STEP);

//   panX.value = centerX - imagePointX * newZoom;
//   panY.value = centerY - imagePointY * newZoom;
//   zoomLevel.value = newZoom;
//   clampPan();
// };

const resetZoom = () => {
  zoomLevel.value = 1;
  panX.value = 0;
  panY.value = 0;
  clampPan();
};

// Pan methods - Improved event handling
const startPan = (event) => {
  if (event.type === "mousedown" && event.button !== 0) return; // Only left mouse button
  if (zoomLevel.value <= 1) return; // Only allow pan when zoomed in

  // Check if we're clicking on a marker
  const target = event.target;
  if (target.closest(".marker-position")) {
    return; // Don't start pan if clicking on a marker
  }

  event.preventDefault();
  isPanning.value = true;

  const clientX =
    event.clientX || (event.touches && event.touches[0]?.clientX) || 0;
  const clientY =
    event.clientY || (event.touches && event.touches[0]?.clientY) || 0;

  lastPanPoint.value = { x: clientX, y: clientY };
  document.body.style.cursor = "grabbing";

  // Add global event listeners
  document.addEventListener("mousemove", handlePan, { passive: false });
  document.addEventListener("mouseup", endPan);
  document.addEventListener("touchmove", handlePan, { passive: false });
  document.addEventListener("touchend", endPan);
};

const handlePan = (event) => {
  if (!isPanning.value || zoomLevel.value <= 1) return;

  event.preventDefault();

  const clientX =
    event.clientX || (event.touches && event.touches[0]?.clientX) || 0;
  const clientY =
    event.clientY || (event.touches && event.touches[0]?.clientY) || 0;

  const deltaX = clientX - lastPanPoint.value.x;
  const deltaY = clientY - lastPanPoint.value.y;

  panX.value += deltaX;
  panY.value += deltaY;

  lastPanPoint.value = { x: clientX, y: clientY };
  clampPan();
};

const endPan = (event) => {
  isPanning.value = false;
  document.body.style.cursor = "";

  // Remove global event listeners
  document.removeEventListener("mousemove", handlePan);
  document.removeEventListener("mouseup", endPan);
  document.removeEventListener("touchmove", handlePan);
  document.removeEventListener("touchend", endPan);
};

// Setup event listeners when component mounts
onMounted(async () => {
  schoolPositionList.value =
    personDetailStore.personDetail.position_folder[0].position_list;
  roadPositionList.value =
    personDetailStore.personDetail.position_folder[1].position_list;

  // Add event listeners to the map wrapper
  if (mapWrapper.value) {
    // Mouse events
    mapWrapper.value.addEventListener("mousedown", startPan, {
      passive: false,
    });

    // Touch events for mobile support
    mapWrapper.value.addEventListener("touchstart", startPan, {
      passive: false,
    });
  }
});

const showDestinationModal = (position) => {
  // Get the marker position
  const pos = markerPositions.value.get(position.id);
  if (!pos) return;

  // Set zoom level
  zoomLevel.value = 5;

  // Calculate the center point of the map wrapper
  const wrapperRect = mapWrapper.value.getBoundingClientRect();
  const centerX = wrapperRect.width / 2;
  const centerY = wrapperRect.height / 2;

  // Calculate the new pan position to center the marker
  panX.value = centerX - pos.x * zoomLevel.value;
  panY.value = centerY - pos.y * zoomLevel.value;

  // Ensure pan is clamped within bounds
  clampPan();

  clickedPositionId.value = position.id;
};

watch(
  () => selectedOption.value,
  () => {
    if (clickedPositionId.value) {
      clickedPositionId.value = null;
    }
  }
);

// Clean up event listeners and cursor style on unmount
onUnmounted(() => {
  document.body.style.cursor = "";

  // Remove any remaining global listeners
  document.removeEventListener("mousemove", handlePan);
  document.removeEventListener("mouseup", endPan);
  document.removeEventListener("touchmove", handlePan);
  document.removeEventListener("touchend", endPan);

  // Remove local listeners
  if (mapWrapper.value) {
    mapWrapper.value.removeEventListener("mousedown", startPan);
    mapWrapper.value.removeEventListener("touchstart", startPan);
  }
});

function clampPan() {
  if (!mapWrapper.value || !mapImage.value) return;

  const wrapperRect = mapWrapper.value.getBoundingClientRect();
  const imageWidth = mapImage.value.naturalWidth;
  const imageHeight = mapImage.value.naturalHeight;

  // Calculate scaled image size
  const scaledWidth = imageWidth * zoomLevel.value;
  const scaledHeight = imageHeight * zoomLevel.value;

  // The visible area (wrapper)
  const wrapperWidth = wrapperRect.width;
  const wrapperHeight = wrapperRect.height;

  // Calculate min/max pan values
  const minPanX = Math.min(0, wrapperWidth - scaledWidth);
  const minPanY = Math.min(0, wrapperHeight - scaledHeight);
  const maxPanX = 0;
  const maxPanY = 0;

  panX.value = Math.min(maxPanX, Math.max(minPanX, panX.value));
  panY.value = Math.min(maxPanY, Math.max(minPanY, panY.value));
}

const showNav = computed(() => zoomLevel.value <= 1);
</script>

<style lang="scss" scoped>
.map-detail {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: grab;

    &.zoomed {
      cursor: grab;
    }
  }

  .map-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    touch-action: none; /* Prevent default touch behaviors */
  }

  .marker-position {
    position: absolute;
    transform-origin: center;
    cursor: pointer;
    z-index: 10;
    touch-action: none;
    pointer-events: auto;

    &.zooming {
      opacity: 0;
    }
  }

  .radio-group {
    position: absolute;
    bottom: 3%;
    right: 3%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    font-size: 4rem;
    z-index: 20;
  }

  .zoom-controls {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;

    .zoom-btn {
      width: 6rem;
      height: 6rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      font-size: 4rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;

      &:hover {
        background: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      &:active {
        transform: translateY(0);
      }

      &.reset {
        font-size: 16px;
      }
    }
  }

  .left-ink-btn {
    @include flex-center-vertical;
    position: absolute;
    bottom: 5%;
    left: 3%;
    z-index: 20;

    h3 {
      font-size: 4rem;
    }
  }
}

// Transitions
.position-fade-enter-active,
.position-fade-leave-active {
  transition: all 0.3s ease;
}

.position-fade-enter-from,
.position-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
