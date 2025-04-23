<template>
  <div class="map-detail">
    <!-- <img src="/image/map/vietnam-map.png" alt="" /> -->
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
        <CustomMarker />
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
      <!-- <RadioBtn
        id="3"
        optionText="Thần sắc, thần phả"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
      /> -->
    </div>
    <div class="left-ink-btn" @click="handleNavigate">
      <img src="/image/map/back.svg" />
      <h3>Quay lại</h3>
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
  </div>
</template>
<script>
import RadioBtn from "@/components/RadioBtn.vue";
import DestinationModal from "@/components/Map/DestinationModal.vue";
import CustomMarker from "@/components/CustomMarker.vue";

import { ref, onMounted, computed, watch } from "vue";
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
    personDetailStore.personDetail.article_topic[0].article_list;
  schoolPositionList.value =
    personDetailStore.personDetail.article_topic[1].article_list;
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

// Handle navigate
const handleNavigate = () => {
  router.push({ name: "detail", params: { id: route.params.id } });
};
</script>

<style lang="scss" scoped>
.map-detail {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/image/map/vn-map.png");
  background-repeat: no-repeat;
  background-size: cover;

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
