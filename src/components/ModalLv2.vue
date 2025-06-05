<template>
  <Transition name="fade" mode="out-in">
    <div class="modal-lv2" v-if="isModalOpen">
      <div class="wrapper">
        <div class="body">
          <div class="title">
            <h1>{{ article?.translations?.[store.lang]?.name }}</h1>
          </div>
          <div class="content">
            <div class="content-item">
              <div class="content-item-title" v-html="parsedStory"></div>
            </div>
          </div>
        </div>
        <InkDropButton class="close-ink-btn" @click="closeModal">
          <CloseIcon color="#fff" />
        </InkDropButton>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onUnmounted, watch, computed } from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import InkDropButton from "@/components/InkDropButton.vue";
import { fetchArticleById } from "@/api/fetch";
import useStore from "@/store/useStore";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  modalId: {
    type: String,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});

const store = useStore();
const article = ref(null);

watch(
  () => [props.isModalOpen, props.modalId],
  async ([open, id]) => {
    if (open && id) {
      const res = await fetchArticleById(store, id);
      article.value = res;
    }
  },
  { immediate: true }
);

const transformToFlexLayout = (htmlString) => {
  // Split the HTML by <hr> tags to get sections
  const sections = htmlString.split(/<hr\s*\/?>/i);

  // Calculate number of columns (hr count + 1, max 3)
  const columnCount = Math.min(sections.length, 3);

  // If we have more sections than max columns, merge the excess into the last column
  let finalSections = sections;
  if (sections.length > 3) {
    finalSections = sections.slice(0, 2); // First 2 sections
    // Combine remaining sections into the 3rd column
    const remainingSections = sections.slice(2);
    finalSections.push(remainingSections.join(""));
  }

  // Create flex container with columns
  const flexColumns = finalSections
    .map((section) => {
      // Clean up the section content (remove extra whitespace)
      const cleanSection = section.trim();
      return `<div class="modal-lv2-flex-column">${cleanSection}</div>`;
    })
    .join("\n    ");

  // Create the final flex layout HTML
  const flexHTML = `<div class="modal-lv2-flex-container" style="display: flex; gap: 20px; align-items: flex-start;">
    ${flexColumns}
</div>
`;

  return flexHTML;
};
const parsedStory = computed(() => {
  const parsedImage = article.value.translations[store.lang].content.replace(
    /(<img src=")/g,
    `$1${store.api}`
  );
  return transformToFlexLayout(parsedImage);
});

onUnmounted(() => {
  article.value = null;
});
</script>

<style lang="scss" scoped>
.modal-lv2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: $priority-high;

  .wrapper {
    width: 72%;
    height: 90%;
    background-image: url("/image/book/detail-book-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 18rem 12rem 0 12rem;
    .body {
      .title {
        h1 {
          font-size: 8rem;
          text-align: center;
          margin-bottom: 3rem;
          font-family: $heading-family;
        }
      }
    }
  }
  .close-ink-btn {
    position: absolute;
    bottom: 12%;
    right: 19%;
    cursor: pointer;
    width: 22rem;
    height: 22rem;
    z-index: $priority-high;
  }
}
</style>
