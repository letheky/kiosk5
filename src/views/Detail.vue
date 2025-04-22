<template>
  <div class="celeb-detail">
    <div class="detail-bg">
      <div class="repeat-door-bg"></div>
      <img src="/image/detail/chu-van-an-full.png" alt="" />
      <!-- <img :src="currentCeleb.image" alt="" /> -->
      <div class="floor" src="/image/detail/floor.png" alt="" />
    </div>
    <div class="celeb-detail-context">
      <p>
        <!-- {{ currentCeleb.translations[store.lang].story }} -->
        <!-- <span v-html="currentCeleb.translations[store.lang].story"></span> -->
        Chu Văn An (1292–1370), tự Linh Triệt, hiệu Tiều Ẩn, đỗ Thái học sinh
        triều Trần nhưng không ra làm quan mà về quê ở làng Quang Liệt, Thanh
        Đàm (Thanh Liệt, Thanh Trì, Hà Nội) mở trường dạy học. Vào thời vua Trần
        Minh Tông (1314-1329), ông giữ chức Tư nghiệp Quốc Tử Giám tại Thăng
        Long, trực tiếp giảng dạy và đào tạo nhân tài. Đến thời vua Trần Dụ Tông
        (1341-1369), ông dâng “Thất trảm sớ”, xin chém 7 gian thần. Không được
        chấp thuận, ông từ quan về ở ẩn tại núi Phượng Hoàng. Khi mất, ông được
        thờ tại Văn Miếu – Quốc Tử Giám, Đình thờ danh nhân Tiên Triết Chu Văn
        An (Thanh Liệt, Thanh Trì, Hà Nội) , Đền thờ thầy Chu Văn An (Chí Linh,
        Hải Dương) và nhiều nơi trên cả nước. Chu Văn An được xem là biểu tượng
        mẫu mực của nhà giáo, của trí thức sống có lý tưởng, đạo đức và trách
        nhiệm với dân tộc.  
      </p>
      <!-- <Audio :audioSrc="audioSrc" /> -->
      <Audio audioSrc="/audio/music.mp3" />
    </div>
    <div class="detail-navbar">
      <span v-for="path in pathArr">
        <RouterLink
          :to="path.path"
          style="color: #fff"
          :class="
            path.id === activePathId ? 'heading-font' : 'small-heading-font'
          "
        >
          {{ path.name }}
        </RouterLink>
      </span>
    </div>
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

const pathArr = [
  {
    id: 1,
    name: "Tiểu sử",
    path: { name: "detail", params: { id: route.params.id } },
  },
  {
    id: 2,
    name: "Lưu danh",
    path: { name: "map", params: { id: route.params.id } },
  },
  {
    id: 3,
    name: "Di sản",
    path: { name: "book", params: { id: route.params.id } },
  },
  {
    id: 4,
    name: "Thờ tự",
    path: { name: "tour", params: { id: route.params.id } },
  },
];

const activePathId = ref(1);
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
      height: 77%;
      top: 42%;
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
    top: 11%;
    left: 3%;
    width: 24%;
    height: 85%;
    background: url("/image/detail/scroll-body-vertical.png") no-repeat
      center/cover;
    padding: 13rem 12rem 14rem 9rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      overflow-y: scroll;
    }
  }
  .detail-navbar {
    position: absolute;
    position: absolute;
    bottom: 5%;
    left: 32%;
    /* transform: translateX(-50%); */
    width: 50%;
    height: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 15rem;
    z-index: $priority-max;
    background: url("/image/detail/nav-bg.png") no-repeat center/cover;
    span {
      .active {
        color: $primary-color;
      }
    }
  }
}
.heading-font {
  font-family: $heading-family;
}
.small-heading-font {
  font-family: $small-heading-family;
}
</style>
