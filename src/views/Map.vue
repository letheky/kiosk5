<template>
  <div ref="mapContainer" class="map-detail">
    <img ref="mapImage" class="map-image" src="/image/map/vn-map.png" alt="" />
    <TransitionGroup name="position-fade">
      <div
        class="marker-position"
        v-for="position in activePositionList"
        :key="position.id"
        :style="{
          '--xCoordinate': `${position?.coordinates.split(',')[0].trim()}%`,
          '--yCoordinate': `${position?.coordinates.split(',')[1].trim()}%`,
        }"
        @click="showDestinationModal(position)"
      >
        <CustomMarker :color="selectedOption === '1' ? '#BA1A1A' : '#36693E'" />
      </div>
    </TransitionGroup>
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

    <Transition name="modal-fade">
      <DestinationModal
        v-if="clickedPositionId"
        :destinationDetail="
          activePositionList.find((el) => el.id === clickedPositionId)
        "
        @close="clickedPositionId = null"
      />
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
<script>
import Nav from "@/components/Nav.vue";
import RadioBtn from "@/components/RadioBtn.vue";
import DestinationModal from "@/components/Map/DestinationModal.vue";
import CustomMarker from "@/components/CustomMarker.vue";

import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
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
const router = useRouter();
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

// Method to update `selectedOption`
const updateSelectedOption = (value) => {
  selectedOption.value = value;
};

onMounted(async () => {
  roadPositionList.value =
    personDetailStore.personDetail.position_folder[0].position_list;
  schoolPositionList.value =
    personDetailStore.personDetail.position_folder[1].position_list;
});

const showDestinationModal = (position) => {
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


</script>

<style lang="scss" scoped>
.map-detail {
  position: relative;
  width: 100%;
  height: 100%;

  .map-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .marker-position {
    position: absolute;
    transform: translate(-50%, -50%);
    left: var(--xCoordinate);
    top: var(--yCoordinate);
  }

  img {
    width: 88%;
    height: 100%;
    object-fit: contain;
  }

  .radio-group {
    position: absolute;
    bottom: 3%;
    right: 3%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    font-size: 4rem;
  }
  .left-ink-btn {
    @include flex-center-vertical;
    position: absolute;
    bottom: 5%;
    left: 3%;
    h3 {
      font-size: 4rem;
    }
  }
}
</style>
