<template>
  <div class="detail-navbar">
    <span v-for="path in pathArr" :key="path">
      <RouterLink
        v-if="path.id !== 4"
        :to="path.path"
        style="color: #fff"
        :class="
          checkActivePath(path)
            ? 'heading-font link-active'
            : 'small-heading-font '
        "
      >
        {{ path.name }}
      </RouterLink>
      
      <!-- Special handling for tour navigation -->
      <a
        v-else
        @click="handleTourNavigation"
        style="color: #fff; cursor: pointer"
        :class="
          checkActivePath(path)
            ? 'heading-font link-active'
            : 'small-heading-font '
        "
      >
        {{ path.name }}
      </a>
    </span>
  </div>

  <!-- Iframe Modal -->
  <div v-if="showIframeModal" class="tour-overlay" @click="closeModal">
    <div class="tour-content" @click.stop>
      
      <iframe
        :src="singleTourUrl"
        frameborder="0"
        class="tour-iframe"
        allowfullscreen
      ></iframe>
      <button @click="closeModal">
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
    </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import usePersonDetail from "@/store/usePersonDetail";

const route = useRoute();
const router = useRouter();
const personDetailStore = usePersonDetail();

const showIframeModal = ref(false);
const singleTourUrl = ref("");

const checkActivePath = (path) => {
  return route.path.includes(path.path.name);
};

const handleTourNavigation = () => {
  const tours = personDetailStore.personDetail?.tour_folder?.[0]?.tour_list;
  
  if (!tours || tours.length === 0) {
    // No tours available
    console.warn("No tours available");
    return;
  }
  
  if (tours.length === 1) {
    // Open single tour in iframe modal
    singleTourUrl.value = tours[0].url || tours[0].link || ""; // Adjust property name as needed
    showIframeModal.value = true;
  } else {
    // Navigate to tour page with multiple tours
    router.push({ name: "tour", params: { id: route.params.id } });
  }
};

const closeModal = () => {
  showIframeModal.value = false;
  singleTourUrl.value = "";
};

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
</script>

<style lang="scss" scoped>
.detail-navbar {
  position: absolute;
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15rem;
  z-index: $priority-medium;
  background: url("/image/detail/nav-bg.png") no-repeat center/cover;
  span {
    .active {
      color: $primary-color;
    }
  }
}

.heading-font {
  font-family: $heading-family;
  font-size: 5.8rem;
}

.small-heading-font {
  font-family: $small-heading-family;
  opacity: 0.7;
  font-size: 4.9rem;
}

.link-active {
  opacity: 1;
  font-weight: bold;
}

/* Modal Styles */
.tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  z-index: 9999;
}

.tour-content {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}



.tour-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>