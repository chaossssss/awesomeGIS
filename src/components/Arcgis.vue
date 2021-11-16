<template>
  <div id="viewDiv" class="viewDiv">
    <div id="infowin">
      <div id="close" onClick="closeInfoWin()">X</div>
      <div id="title"></div>
      <div id="content"></div>
      <div id="arrow"></div>
    </div>
  </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";

var isWindowShow = 0;
var closeInfoWin = function (evt) {
  infowin = document.getElementById("infowin");
  infowin.style.display = "none";
  isWindowShow = 0;
};
var view
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
        basemap: "topo-vector", // Basemap layer service
      });
      view = new MapView({
        map: map,
        center: [120.755623, 30.746814], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv", // Div element
      });

      view.popup.autoOpenEnabled = false;
      view.on("click", (event) => {
        // Get the coordinates of the click on the view
        // around the decimals to 3 decimals
        const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;


        view.popup.open({
          // Set the popup's title to the coordinates of the clicked location
          title: "Reverse geocode: [" + lon + ", " + lat + "]",
          location: event.mapPoint, // Set the location of the popup to the clicked location
        });
      });
        this.info()

      // 创建多边形
      const polygon = {
        type: "polygon",
        rings: [
          [120.737681, 30.765013],
          [120.689616, 30.711897],
          [120.837932, 30.711897],
        ],
      };
      const fillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 0, 0],
          width: 1,
        },
      };
      const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
      });
      view.graphics.addMany([polygonGraphic]);
      // 销毁
      // setTimeout(function(){
      //   view.graphics.removeMany([polygonGraphic])
      // },2000)

      const point1 = new Point({
        longitude: 120.737681,
        latitude: 30.765013,
      });
      // Create a symbol for drawing the point
      const textSymbol = {
        type: "text", // autocasts as new TextSymbol()
        color: "#7A003C",
        text: "\ue61c", // esri-icon-map-pin 加个u!!!!
        font: {
          // autocasts as new Font()
          size: 36,
          family: "CalciteWebCoreIcons",
        },
      };

      // Create a graphic and add the geometry and symbol to it
      const pointGraphic1 = new Graphic({
        geometry: point1,
        symbol: textSymbol,
      });
      view.graphics.addMany([pointGraphic1]);

    },
    info() {
      //对话框
      var infowin, colse, title, content;
      var width = 400,
        height = 237,
        offset = 30;
      var beforePoint;
      var beforeMapPoint;

      infowin = document.getElementById("infowin");
      colse = document.getElementById("close");
      title = document.getElementById("title");
      content = document.getElementById("content");

      function showinfowindow(x, y) {
        infowin.style.left = x - width / 2 + "px";
        infowin.style.top = y - height - offset + "px";
        infowin.style.position = "absolute";
        infowin.style.width = width + "px";
        infowin.style.height = height + "px";
        infowin.style.display = "block";
      }

      function leftClick(evt) {
        infowin.style.display = "none";
        var strtitle = "城市名称";
        var strcontent =
          "名称：1111111<br><br>年代：1991<br><br>省份：balabala<br><br>历史沿革：不详";
        title.innerHTML = strtitle;
        content.innerHTML = strcontent;
        var screenpoint = view.toScreen(evt.mapPoint);
        beforeMapPoint = evt.mapPoint;
        beforePoint = screenpoint;
        showinfowindow(screenpoint.x, screenpoint.y);
        isWindowShow = 1;
      }

      //鼠标单击
      view.on("click", leftClick);
      view.on("pan", function (pan) {
        if (beforePoint != null && isWindowShow == 1) {
          var movePoint = pan.delta;
          showinfowindow(
            beforePoint.x + movePoint.x,
            beforePoint.y + movePoint.y
          );
        }
      });
      view.on("pan-end", function (panend) {
        if (beforePoint != null && isWindowShow == 1) {
          var movedelta = panend.delta;
          beforePoint.x = beforePoint.x + movedelta.x;
          beforePoint.y = beforePoint.y + movedelta.y;
        }
      });
      view.on("zoom", function () {
        if (beforePoint != null && isWindowShow == 1) {
          infowin.style.display = "none";
        }
      });
      view.on("zoom-end", function () {
        if (beforePoint != null && isWindowShow == 1) {
          var zoomPoint = view.toScreen(beforeMapPoint);
          showinfowindow(zoomPoint.x, zoomPoint.y);
          beforePoint = zoomPoint;
        }
      });
    },
  },
};
</script>

<style>
@import "@arcgis/core/assets/esri/themes/light/main.css";
@import "../assets/iconfont/iconfont.css";
.viewDiv {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

#infowin {
  height: 237px;
  width: 400px;
  display: none;
  z-index: 10000;
}

#close {
  float: right;
  padding-top: 10px;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  /*
    border: #000 1px solid;
    */
  height: 30px;
  width: 30px;
  text-align: center;
}

#close:hover {
  cursor: pointer;
}

#title {
  background-color: #1097ff;
  padding: 10px;
  font-weight: bold;
  font-size: 12px;
}

#content {
  padding-left: 10px;
  padding-top: 10px;
  background-color: #ffffff;
  height: 200px;
  color: #000000;
}

#arrow {
  position: absolute;
  width: 0px;
  height: 0px;
  line-height: 0px;
  border-top: 30px solid #ffffff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  left: 190px;
  bottom: -30px;
}
</style>