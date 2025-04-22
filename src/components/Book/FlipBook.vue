<template>
  <div class="flipbook">
    <iframe
      v-if="linkType === 'ebook'"
      :src="link"
      width="100%"
      height="100%"
    />
    <iframe v-else :src="pdfLink" width="100%" height="100%" />

    <InkDropButton class="close-ink-btn" text="Đóng" @click="close">
      <CloseIcon color="#fff" />
    </InkDropButton>
  </div>
</template>

<script>
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { ref, onMounted } from "vue";

export default {
  name: "FlipBookModal",
  components: {
    InkDropButton,
    CloseIcon,
  },
};
</script>

<script setup>
const linkType = ref("");
const pdfLink = ref("");

const props = defineProps({
  close: Function,
  link: String,
});

onMounted(() => {
  if (props.link) {
    linkType.value = props.link.includes(".pdf") ? "pdf" : "ebook";
    const params = new URLSearchParams(props.link).toString();
    pdfLink.value = `/ebook/index.html?id=${params}`;
  }
});
</script>

<style lang="scss" scoped>
.flipbook {
  width: 90%;
  height: 85%;
  margin: 0 auto;
  z-index: $priority-high;

  .close-ink-btn {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 20rem;
    height: 20rem;
    z-index: $priority-super;
  }
}
</style>
