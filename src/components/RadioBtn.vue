<template>
  <div>
    <input type="radio" :id="`radio${id}`" :value="id" />
    <label :for="`radio${id}`" class="custom-radio" @click="updateOption">
      <img
        v-if="selectedOption === id"
        src="/image/radio-checked.svg"
        :alt="optionText"
      />
      <img v-else src="/image/radio-uncheck.svg" :alt="optionText" />
      <p>{{ optionText }}</p>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  optionText: {
    type: String,
    default: "Tác phẩm của nhân vật",
  },
  selectedOption: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selectedOption"]);

const updateOption = () => {
  if (props.selectedOption === props.id) {
    return; // Do nothing if the same option is clicked
  }
  emit("update:selectedOption", props.id); // Emit the updated selected option
};
</script>

<style lang="scss" scoped>
/* Hide default radio buttons */
input[type="radio"] {
  display: none;
}

/* Custom radio button styling */
.custom-radio {
  display: inline-flex;
  align-items: center;
  font-size: inherit;
  p {
    font-size: inherit; /* Adjust font size */
  }
  & img {
    width: 10rem; /* Adjust size */
    height: 10rem;
    margin-right: 2rem;
  }
}
</style>
