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
        optionText="Nơi thờ tự"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
      />
      <RadioBtn
        id="2"
        optionText="Trường học"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
      />
      <RadioBtn
        id="3"
        optionText="Thần sắc, thần phả"
        :selectedOption="selectedOption"
        @update:selectedOption="updateSelectedOption"
      />
    </div>
    <InkDropButtonReverse
      class="left-ink-btn"
      text="Quay lại"
      :path="{ name: 'detail', params: { id: route.params.id } }"
    >
      <LeftIcon color="#fff" />
    </InkDropButtonReverse>
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
import InkDropButtonReverse from "@/components/InkDropButtonReverse.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";
import DestinationModal from "@/components/Map/DestinationModal.vue";
import CustomMarker from "@/components/CustomMarker.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import useStore from "@/store/useStore";
import usePerson from "@/store/usePerson";
import { fetchPersonArticle } from "@/api/fetch";

export default {
  name: "MapDetail",
  components: {
    RadioBtn,
    InkDropButtonReverse,
    DestinationModal,
    CustomMarker,
  },
};
</script>
<script setup>
const route = useRoute();
const store = useStore();
const personStore = usePerson();

const currentCeleb = computed(() => {
  return personStore.personList.find((person) => person.id === route.params.id);
});

const inherritedPositionList = ref([]);
const schoolPositionList = ref([]);
const genealogyPositionList = ref([]);

const activePositionList = computed(() => {
  if (selectedOption.value === "1") {
    return inherritedPositionList.value;
  } else if (selectedOption.value === "2") {
    return schoolPositionList.value;
  } else {
    return genealogyPositionList.value;
  }
});

const clickedPositionId = ref(null);
const selectedOption = ref("2");

// Method to update `selectedOption`
const updateSelectedOption = (value) => {
  selectedOption.value = value;
};

onMounted(async () => {
  inherritedPositionList.value = await fetchPersonArticle(
    store,
    currentCeleb.value.article_topic[0]
  );
  schoolPositionList.value = await fetchPersonArticle(
    store,
    currentCeleb.value.article_topic[1]
  );
  genealogyPositionList.value = await fetchPersonArticle(
    store,
    currentCeleb.value.article_topic[2]
  );
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
    position: absolute;
    top: 75%;
    left: 1%;
  }
}
</style>
