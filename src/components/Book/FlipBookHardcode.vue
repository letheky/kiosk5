<template>
  <div class="flipbook">
    <iframe
      v-if="linkType === 'ebook'"
      :src="link"
      width="100%"
      height="100%"
    />
    <iframe
      v-else
      :src="`/ebook/index.html?id=${pdfLink}`"
      width="100%"
      height="100%"
    />

    <InkDropButton class="close-ink-btn" text="Đóng" @click="close">
      <CloseIcon color="#fff" />
    </InkDropButton>
  </div>
</template>

<script>
import InkDropButton from "@/components/InkDropButton.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { computed } from "vue";

export default {
  name: "FlipBookModal",
  components: {
    InkDropButton,
    CloseIcon,
  },
};
</script>

<script setup>
// const pdfLink = ref("");

const props = defineProps({
  close: Function,
  link: String,
});

const pdfLink = new URLSearchParams(props.link).toString();
const linkType = computed(() => {
  if (props.link) {
    return props.link.includes(".pdf") ? "pdf" : "ebook";
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
