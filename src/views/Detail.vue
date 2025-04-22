<template>
  <div class="celeb-detail">
    <div class="detail-bg">
      <div class="repeat-door-bg"></div>
      <img :src="currentCeleb.image" alt="" />
      <div class="floor" src="/image/detail/floor.png" alt="" />
    </div>
    <Transition name="moveToLeft" mode="in-out">
      <img
        :class="['cebleb-context-header']"
        src="/image/detail/scroll-left.png"
        alt=""
      />
    </Transition>
    <div class="celeb-detail-context">
      <p>
        {{ currentCeleb.translations[store.lang].story }}
      </p>
      <Audio :audioSrc="audioSrc" />
    </div>
    <img
      class="cebleb-context-footer"
      src="/image/detail/scroll-right.png"
      alt=""
    />
    <InkDropButton class="down-btn" text="Thoát" path="/timeline">
      <DownIcon color="#fff" />
    </InkDropButton>
    <InkDropButtonReverse
      class="left-btn"
      text="Di sản để lại"
      :path="{ name: 'book', params: { id: route.params.id } }"
    >
      <LeftIcon color="#fff" />
    </InkDropButtonReverse>
    <InkDropButton class="right-btn" text="Lưu danh" :path="{ name: 'map' }">
      <RightIcon color="#fff" />
    </InkDropButton>
  </div>
</template>

<script>
import Audio from "@/components/Audio.vue";
import InkDropButton from "@/components/InkDropButton.vue";
import InkDropButtonReverse from "@/components/InkDropButtonReverse.vue";
import DownIcon from "@/components/icons/DownIcon.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";
import RightIcon from "@/components/icons/RightIcon.vue";

import { ref, computed } from "vue";
import useStore from "@/store/useStore";
import usePerson from "@/store/usePerson";
import usePersonDetail from "@/store/usePersonDetail";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { fetchPersonById } from "@/api/fetch";

export default {
  name: "Detail",
  components: {
    Audio,
    InkDropButtonReverse,
    InkDropButton,
    DownIcon,
    LeftIcon,
    RightIcon,
  },
};
</script>
<script setup>
const route = useRoute();
const store = useStore();
const personStore = usePerson();
const personDetailStore = usePersonDetail();

const audioSrc = ref(null);
const isNavigating = ref(null);

const currentCeleb = computed(() => {
  return personStore.personList.find((person) => person.id === route.params.id);
});

onMounted(async () => {
  const currentPerson = await fetchPersonById(store, route.params.id);
  personDetailStore.personDetail = currentPerson;
  audioSrc.value =
    personDetailStore.personDetail.audio_folder[0].audio_list[0].translations[
      store.lang
    ].file;
});
</script>

<style lang="scss" scoped>
.celeb-detail {
  position: relative;
  width: 100%;
  height: 100%;
  .detail-bg {
    position: relative;
    width: 100%;
    height: 100%;
    .repeat-door-bg {
      background-image: url("/image/detail/door-bg.png");
      background-repeat: repeat;
      background-size: contain;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60%;
      z-index: -1;
    }
    img {
      position: absolute;
      object-fit: contain;
      width: 60%;
      height: 60%;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .floor {
      background-image: url("/image/detail/floor.png");
      background-repeat: repeat;
      background-size: contain;
      position: absolute;
      top: 59%;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
  .cebleb-context-header {
    position: absolute;
    top: 26%;
    left: 47%;
    width: 4%;
    height: 100%;
    animation: moveToLeft 1.6s ease-in-out forwards 0.26s;
    z-index: 1;
  }
  .cebleb-context-footer {
    position: absolute;
    top: 26%;
    left: 48%;
    width: 4%;
    height: 100%;
    animation: moveToRight 1.6s ease-in-out forwards 0.23s;
  }
  .celeb-detail-context {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 55%;
    height: 30%;
    background: url("/image/detail/scroll-body.png") no-repeat center/cover;
    padding: 9rem 7rem 5rem 7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: horizontalCollapse 2s ease-out forwards;

    p {
      overflow-y: scroll;
    }
  }
  .down-btn {
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 93%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .left-btn {
    position: absolute;
    top: 54%;
    left: 0;
  }
  .right-btn {
    position: absolute;
    top: 54%;
    right: 0;
  }
}

@keyframes horizontalCollapse {
  0% {
    clip-path: inset(0% 80% 0% 80%);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}
@keyframes moveToLeft {
  0% {
    left: 47%;
  }
  100% {
    left: 20%;
  }
}
@keyframes moveToRight {
  0% {
    left: 48%;
  }
  100% {
    left: 75%;
  }
}
</style>
