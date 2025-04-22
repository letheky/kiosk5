import { defineStore } from "pinia";

const useMarker = defineStore("marker", {
  state: () => ({
    markers: [],
  }),
  actions: {
    setMarkers(markers) {
      this.markers = markers;
    },
    removeMarker(id) {
      this.markers = this.markers.filter((marker) => marker.id !== id);
    },
    clearMarkers() {
      this.markers = [];
    },
  },
  getters: {
    getMarkerById: (state) => {
      return (id) => state.markers.find((marker) => marker.id === id);
    },
  },
  // Enable persistence using sessionStorage
  persist: {
    storage: sessionStorage,
    pick: ["markers"],
  },
});

export default useMarker;
