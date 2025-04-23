<template>
  <div class="celeb-detail">
    <div class="detail-bg">
      <div class="repeat-door-bg"></div>
      <img :src="currentCeleb.image" alt="" />
      <div class="floor" src="/image/detail/floor.png" alt="" />
    </div>
    <div class="celeb-detail-context">
      <h3
        style="
          font-family: Ong-do-gia;
          font-size: 120px;
          margin-top: 48px;
          text-align: center;
        "
      >
        {{ currentCeleb.translations[store.lang].name }}
      </h3>
      <p
        style="text-align: justify"
        v-if="currentCeleb.id === 'db2e1edb-3bf3-4d7c-aa78-48e4b100f2bc'"
      >
        <!-- <span v-html="currentCeleb.translations[store.lang].story"></span> -->
        Chu Văn An (1292–1370), tự Linh Triệt, hiệu Tiều Ẩn, đỗ
        <span
          style="
            fontfont-weight: bold !important;
            font-family: 'Myriad-pro-bold';
          "
          @click="showLv2DetailInfo('thaihocsinh')"
          >Thái học sinh</span
        >
        triều Trần nhưng không ra làm quan mà về quê ở
        <span
          style="font-weight: bold !important; font-family: 'Myriad-pro-bold'"
          @click="showLv2DetailInfo('quequan')"
          >làng Quang Liệt, Thanh Đàm (Thanh Liệt, Thanh Trì, Hà Nội)
        </span>
        mở trường dạy học. Vào thời vua Trần Minh Tông (1314-1329), ông giữ chức
        <span
          style="
            fontfont-weight: bold !important;
            font-family: 'Myriad-pro-bold';
          "
          @click="showLv2DetailInfo('tunghiep')"
        >
          Tư nghiệp Quốc Tử Giám</span
        >
        tại Thăng Long, trực tiếp giảng dạy và đào tạo nhân tài. Đến thời vua
        Trần Dụ Tông (1341-1369), ông dâng
        <span
          style="
            fontfont-weight: bold !important;
            font-family: 'Myriad-pro-bold';
          "
          @click="showLv2DetailInfo('thattramso')"
          >“Thất trảm sớ”</span
        >, xin chém 7 gian thần. Không được chấp thuận, ông từ quan về ở ẩn tại
        <span
          style="font-weight: bold !important; font-family: 'Myriad-pro-bold'"
          @click="showLv2DetailInfo('nuiphuonghoang')"
          >núi Phượng Hoàng</span
        >. Khi mất, ông được thờ tại Văn Miếu – Quốc Tử Giám, Đình thờ danh nhân
        Tiên Triết Chu Văn An (Thanh Liệt, Thanh Trì, Hà Nội), Đền thờ thầy Chu
        Văn An (Chí Linh, Hải Dương) và nhiều nơi trên cả nước. Chu Văn An được
        xem là biểu tượng mẫu mực của nhà giáo, của trí thức sống có lý tưởng,
        đạo đức và trách nhiệm với dân tộc.  
      </p>
      <p
        style="text-align: justify"
        v-else
        v-html="currentCeleb.translations[store.lang].story"
      ></p>
      <Audio :audioSrc="audioSrc" />
    </div>
    <div class="detail-navbar">
      <span v-for="path in pathArr" :key="path">
        <RouterLink
          :to="path.path"
          style="color: #fff"
          :class="
            path.id === activePathId ? 'heading-font link-active' : 'small-heading-font ' 
          "
        >
          {{ path.name }}
        </RouterLink>
      </span>
    </div>
    <div class="lv2" v-if="nameLv2Detail">
      <div class="lv2-detail">
        <div
          v-if="nameLv2Detail === 'thaihocsinh'"
          style="width: 100%; height: 100%; display: flex; align-items: center"
        >
          <p style="font-size: 50px; font-family: Myriad-pro">
            Thái học sinh là một chức danh trong hệ thống giáo dục của triều
            đình phong kiến Việt Nam, thường được dùng để chỉ các học trò xuất
            sắc hoặc các học viên cao cấp trong hệ thống Quốc Tử Giám.
          </p>
          <br />
        </div>
        <div
          v-if="nameLv2Detail === 'quequan'"
          style="
            width: 100%;
            height: 100%;
          "
        >
          <p style="font-size: 50px; font-family: Myriad-pro">
            Làng Quang Liệt, huyện Thanh Đàm (Nay là thôn Văn, xã Thanh Liệt,
            huyện Thanh Trì, thành phố Hà Nội).
          </p>
          <br />
          <img
            style="height: 80%; width: 100%; object-fit: cover"
            src="/image/detail/lv2/map.png"
            alt=""
          />
        </div>
        <div
          v-if="nameLv2Detail === 'tunghiep'"
          style="
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <p style="font-size: 50px; font-family: Myriad-pro">
            "Tư nghiệp" là một chức danh quan trong hệ thống giáo dục Nho học
            xưa, có nghĩa là người quản lý công việc học hành, giảng dạy và đào
            tạo nhân tài tại Quốc Tử Giám.
          </p>
        </div>
        <div
          v-if="nameLv2Detail === 'thattramso'"
          style="
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <p style="font-size: 50px; font-family: Myriad-pro">
            Thất trảm sớ (七斬疏) là tờ sớ do Chu Văn An soạn và dâng lên vua
            Trần Dụ Tông để đề nghị chém 7 người mà ông cho là nịnh thần.
          </p>
          <br />
          <img
            style="height: 80%; width: auto; object-fit: cover"
            src="/image/detail/lv2/thattramso.png"
            alt=""
          />
        </div>
        <div
          v-if="nameLv2Detail === 'nuiphuonghoang'"
          style="
            width: 100%;
            height: 100%;
          "
        >
          <p style="font-size: 50px; font-family: Myriad-pro">
            Núi Phượng Hoàng nằm ở Chí Linh, tỉnh Hải Dương - là nơi Chu Văn An
            lui về ở ẩn sau khi từ quan.
          </p>
          <br />

          <img
            style="height: auto; width: 100%; object-fit: cover"
            src="/image/detail/lv2/map2.jpg"
            alt=""
          />
        </div>
        <img
          class="close-lv2"
          @click="hideLv2DetailInfo()"
          src="/image/detail/lv2/close-lv2.png"
          alt=""
        />
      </div>
    </div>
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
const nameLv2Detail = ref(null);

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

function showLv2DetailInfo(name) {
  console.log("name");
  console.log(name);
  nameLv2Detail.value = name;
}
function hideLv2DetailInfo() {
  nameLv2Detail.value = null;
}

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
    padding: 13rem 12rem 14rem 9rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      overflow-y: scroll;
      font-size: 3rem;
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
    background-image: url("/image/detail/lv2/bg-lv2-detail.png");
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

.heading-font {
  font-family: $heading-family;
}
.small-heading-font {
  font-family: $small-heading-family;
  opacity: 0.7;
}
.link-active {
  opacity: 1; font-weight: bold;
}
</style>
