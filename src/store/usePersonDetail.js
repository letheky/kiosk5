import { defineStore } from "pinia";

const usePersonDetail = defineStore("personDetail", {
  state: () => ({
    personDetail: {}, // Default state
  }),
  actions: {},
  getters: {},
  persist: {
    storage: sessionStorage,
    pick: ["personDetail"], // Ensure only `personList` is persisted
  },
});

export default usePersonDetail;
