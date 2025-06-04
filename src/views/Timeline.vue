<template>
  <div class="timeline">
    <img
      :class="isFirst && 'fade'"
      src="/image/timeline/right.svg"
      alt=""
      @click="goPrevious"
    />
    <div class="timeline-item-list">
      <div class="timeline-item" v-for="celeb in celebList" :key="celeb.id">
        <CelebCard
          ref="celebRef"
          :id="celeb.id"
          :name="celeb.translations[store.lang].name"
          :image="celeb.image"
          :activeId="activeId"
          :setActiveId="setActiveId"
        />
      </div>
    </div>
    <img
      :class="isLast && 'fade'"
      src="/image/timeline/right.svg"
      alt=""
      @click="goNext"
    />
    <img src="/image/timeline/time-line.png" alt="" />
    <Transition name="timeline" appear>
      <div class="timeline-detail">
        <div
          class="timeline-detail-item"
          :class="activeId !== celeb.id && 'deactive'"
          v-for="celeb in personStore.personList"
          :key="celeb.id"
          @click="setActiveId(celeb.id)"
        >
          <h2>{{ celeb.translations[store.lang].name }}</h2>
          <p>{{ celeb.birth }} - {{ celeb.death }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import CelebCard from "@/components/Timeline/CelebCard.vue";
import { ref, onMounted, watch, computed } from "vue";
import useStore from "@/store/useStore";
import usePerson from "@/store/usePerson";
import { fetchPersonInfo } from "@/api/fetch";
import {
  getThreeSequenceElements,
  getThreeElementsAfterIndex,
  getThreeElementsBeforeIndex,
} from "@/utils/utils";

export default {
  name: "Timeline",
};
</script>
<script setup>
const store = useStore();
const personStore = usePerson();

const activeId = ref(false);
const setActiveId = (id) => {
  activeId.value = id;
};

const celebList = ref([]);
const timelineDetails = ref([]);

const isNavigating = ref(false);
const isFirst = computed(
  () => celebList?.value[0]?.id === personStore.personList[0]?.id
);
const isLast = computed(
  () => celebList?.value?.at(-1)?.id === personStore.personList?.at(-1)?.id
);

const celebRef = ref(null);

onMounted(async () => {
  try {
    // Fetch data from API or store
    await fetchPersonInfo(store, personStore);

    const allPersons = personStore.personList;
    // Initialize celebList with the first 3 elements
    celebList.value = allPersons.slice(0, 3);

    // Initialize timelineDetails with the first 5 elements
    timelineDetails.value = allPersons;
  } catch (error) {
    console.error("Failed to fetch person info:", error);
  }
});

/**
 * ! This solution require celebList length always equal to 3
 * *Navigate elements
 */
const goNext = () => {
  // Check if the last element is the same as the third element in celeb list
  if (personStore.personList.at(-1).id === celebList.value[2].id) return;

  isNavigating.value = true;
  isNavigating.value = false;
  handleNavigate(celebList.value[2].id, getThreeElementsAfterIndex);
};

const goPrevious = () => {
  // Check if the first element is the same as the first element in celeb list
  if (celebList.value[0].id === personStore.personList[0].id) return;

  isNavigating.value = true;
  isNavigating.value = false;
  handleNavigate(celebList.value[0].id, getThreeElementsBeforeIndex);
};

/**
 * * Watch activeId to focus on active element at both celebList & detailTimeLine
 */
watch(activeId, (newActiveId) => {
  //This solution require celebList length always equal to 3
  const isExisted = celebList.value.map((el) => el.id).includes(newActiveId);
  const currentIndex = personStore.personList.findIndex(
    (el) => el.id === newActiveId
  );

  // Check if the newActiveId is not in the celebList
  if (!isExisted) {
    celebList.value = getThreeSequenceElements(
      personStore.personList,
      currentIndex
    );
  }
});

//Reuseable function for handle navigate by click right or left button
const handleNavigate = (id, callback) => {
  const currentIndex = personStore.personList.findIndex((el) => el.id === id);
  celebList.value = callback(personStore.personList, currentIndex);
};
</script>

<style lang="scss" scoped>
.timeline {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  background: url("/image/hoang-thanh-bg.png") no-repeat center/cover;
  gap: 1rem;

  img {
    width: 20rem;
    position: absolute;
    &.fade {
      opacity: 0.5;
    }
    &:nth-of-type(1) {
      top: 54%;
      left: 2rem;
      z-index: 999;
      animation: rotatePrevious 1s ease-in-out forwards;
    }
    &:nth-of-type(2) {
      top: 54%;
      right: 2rem;
      
      animation: rotateNext 1s ease-in-out forwards;
    }
    &:nth-of-type(3) {
      width: 95%;
      position: absolute;
      top: 93%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .timeline-item-list {
    height: 87vh;
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0 10rem;

    .timeline-item {
      width: 100%;
    }
  }

  .timeline-detail {
    width: 79%;
    position: absolute;
    top: 93%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 8rem;
    align-items: center;
    overflow: scroll;

    .timeline-detail-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4rem;
      text-wrap-mode: nowrap;

      h2 {
        font-family: $heading-family;
        font-size: 6rem;
        text-align: center;
      }

      p {
        font-family: $heading-family;
        font-size: 5rem;
        text-align: center;
      }
      &.deactive {
        opacity: 0.5;
      }
    }
  }
}

@keyframes rotatePrevious {
  0% {
    transform: translateY(-50%) rotateX(0deg) rotateZ(0deg);
  }
  100% {
    transform: translateY(-50%) rotateX(180deg) rotateZ(180deg);
  }
}

@keyframes rotateNext {
  0% {
    transform: translateY(-50%) rotateX(-180deg) rotateZ(-180deg);
  }
  100% {
    transform: translateY(-50%) rotateX(0deg) rotateZ(0deg);
  }
}

</style>
