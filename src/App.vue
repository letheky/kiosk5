<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import useStore from "@/store/useStore.js";
import Menu from "./components/menu.vue";

const store = useStore();
const status = ref(false);

function get_config() {
  axios
    .get("config/config.json")
    .then((res) => {
      store.api = res.data.api;
      status.value = true;
      getData();
    })
    .catch((err) => console.log(err));
}

function getData() {
  axios
    .get(
      `${store.api}/api/app_kiosk/page-folder/?kiosk=78711305-6d94-453c-b7d0-b4e892c2818c`
    )
    .then((res) => {
      if (res.data.results.length > 0) {
        store.page = res.data.results[0].page_list;
      }
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  get_config();
});
</script>

<template>
  <div class="main" @contextmenu.prevent>
    <Transition name="fade" mode="out-in">
      <template v-slot:default>
        <router-view></router-view>
      </template>
    </Transition>
  </div>
  <Menu :status="status"></Menu>
</template>

<style scoped lang="scss">

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.main {
  width: 100%;
  height: 100%;
}
</style>
