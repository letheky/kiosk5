import { defineStore } from "pinia";

const usePerson = defineStore("person", {
  state: () => ({
    personList: [], // Default state
  }),
  actions: {
    setPersonList(list) {
      if (Array.isArray(list)) {
        this.personList = list;
      } else {
        console.error("Invalid list provided to setPersonList");
      }
    },
    removePerson(id) {
      this.personList = this.personList.filter((person) => person.id !== id);
    },
    clearPersonList() {
      this.personList = [];
    },
  },
  getters: {
    personById: (state) => (id) => state.personList.find((person) => person.id === id),
  },
  persist: {
    storage: sessionStorage,
    pick: ["personList"], // Ensure only `personList` is persisted
  },
});

export default usePerson;