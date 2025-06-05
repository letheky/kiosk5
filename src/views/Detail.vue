<template>
  <div class="celeb-detail">
    <div class="detail-bg">
      <div class="repeat-door-bg"></div>
      <img :src="currentCeleb.image" alt="" />
      <div class="floor" src="/image/detail/floor.png" alt="" />
    </div>
    <div class="celeb-detail-context">
      <div
        class="celeb-detail-story"
        style="text-align: justify"
        v-html="processedHtml"
        @click="handleLinkClick"
      />
      <Audio :audioSrc="audioSrc" />
    </div>
    <Nav />
    <router-link to="/timeline">
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
    <ModalLv2
      :isModalOpen="isModalOpen"
      :modalId="modalContentId"
      :closeModal="closeModal"
    >
    </ModalLv2>
  </div>
</template>

<script>
import ModalLv2 from "@/components/ModalLv2.vue";
import Nav from "@/components/Nav.vue";
import Audio from "@/components/Audio.vue";
import { ref, computed } from "vue";
import useStore from "@/store/useStore";
import usePerson from "@/store/usePerson";
import usePersonDetail from "@/store/usePersonDetail";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { fetchPersonById } from "@/api/fetch";
import { useModalLinks } from "@/composables/useModalLink";

export default {
  name: "Detail",
  components: {
    Audio,
  },
};
</script>
<script setup>
const route = useRoute();
const store = useStore();
const personStore = usePerson();
const personDetailStore = usePersonDetail();

const audioSrc = ref(null);

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

// Handle lv2 modal
const {
  isModalOpen,
  modalContentId,
  openModal,
  closeModal,
  convertLinksForModal,
} = useModalLinks();
const handleLinkClick = (event) => {
  const modalLink = event.target.closest(".modal-link");
  if (modalLink) {
    const modalId = modalLink.getAttribute("data-modal-id");
    openModal(modalId);
  }
};

// Use a computed property to ensure the HTML is transformed reactive
const processedHtml = computed(() => {
  if (currentCeleb.value) {
    return convertLinksForModal(
      currentCeleb.value.translations[store.lang].story
    );
  }
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
      width: 85%;
      height: 75%;
      top: 43%;
      left: 56%;
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
  .celeb-detail-context {
    position: absolute;
    top: 4%;
    left: 3%;
    width: 24%;
    height: 85%;
    background: url("/image/detail/scroll-body-vertical.png") no-repeat
      center/cover;
    padding: 13rem 12rem 17rem 9rem;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;

    .celeb-detail-story {
      padding-top: 10rem;
      overflow-y: scroll;
      :deep(p) {
        font-size: 3.4rem;
      }
    }
  }
}
.lv2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000000cc;
  z-index: 10000;
  .lv2-detail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 66.25%;
    height: 83%;
    background-image: url("/image/book/detail-book-bg.png");
    padding: 200px 180px;
  }
  img.close-lv2 {
    width: 266px;
    height: auto;
    position: absolute;
    right: 100px;
    bottom: 100px;
  }
}
</style>
