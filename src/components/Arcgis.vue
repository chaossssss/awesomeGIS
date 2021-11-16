<template>
  <div id="viewDiv" class="viewDiv"></div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView.js"
import esriConfig from "@arcgis/core/config.js";
export default {
  name: "Arcgis",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      esriConfig.apiKey =
        "AAPK8053643d98d74415a58117a1061b6dafibilKp3QCvHt-X1f0_rkQor1MEABBfqdJLXMsalfF_GeVVPRCk5OpVBt6TGfeUjF";
      const map = new Map({
        basemap: "arcgis-topographic", // Basemap layer service
      });
      const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv", // Div element
      });
    },
  },
};
</script>

<style>
@import "@arcgis/core/assets/esri/themes/light/main.css";

.viewDiv {
  width: 800px;
  height: 600px;
}
</style>