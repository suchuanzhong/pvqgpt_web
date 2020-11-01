<template>
  <div id="map" ref="maps">

  </div>
</template>
<script>
  import "ol/ol.css";
  import { get as getProjection } from "ol/proj";
  import { getWidth } from "ol/extent";
  import View from "ol/View";
  import Map from "ol/Map";
  import TileLayer from "ol/layer/Tile";
  import VectorLayer from "ol/layer/Vector";
  import Feature from "ol/Feature";
  import Point from "ol/geom/Point";
  import { Fill, Text, Style, Stroke } from "ol/style";
  import { Vector as VectorSource, XYZ } from "ol/source";
  import ADLayer from "openlayers_echart";
  import elementResizeDetectorMaker from "element-resize-detector";
  import ZoomToExtent from 'ol/control/ZoomToExtent';
  const edm = elementResizeDetectorMaker();
  export default {
    name: "OlMap",
    props: {
      visible: {
        type: Boolean,
        required: false
      },


    
      PowerData:{
      default: function() {
          return [];
        }
      } ,


    },
    data() {
      return {
        map: null,
        view: null,
        vectorSource: null
      };
    },
    mounted() {
      //渲染地图

      var projection = getProjection("EPSG:4326");
      var projectionExtent = projection.getExtent();
      var size = getWidth(projectionExtent) / 256;
      var resolutions = new Array(18);
      var matrixIds = new Array(18);
      for (var z = 1; z < 19; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }
      //设置显示地图的视图
      this.view = new View({
        center: [117.944269,33.270502],
        projection: projection,
        zoom: 7 ,
        minZoom: 5, //最小缩放比例
        maxZoom: 16 //最大缩放比例
      });

      //   初始化地图
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                      "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
            })
          })
        ],
        target: "map",
        view: this.view
      });
      //监听地图页面高度
      edm.listenTo(document.querySelector("#map"), () => {
        this.map.updateSize();
      });

      let result= this.PowerData;
      this.getPowerStation(result);

    },
    watch: {
      PowerData(result){
     
        this.getPowerStation(result);
      }

    },
    methods: {
      //数字档案电站
      getPowerStation(result){
      
        var feas=[] ;
        let xList=[]; let yList=[];
        for ( var i =0; i<result.length;i++) {
          var newFeature = new Feature({
            geometry: new Point([result[i].x, result[i].y]),
            name: result[i].stationName,
            data: result[i]
          });
          var option={
            series:[{
                type: 'effectScatter',
                zlevel: 2,
              data: [{
                name: result[i].stationName,
                value: [result[i].x, result[i].y]
              }],
              rippleEffect: {
                period: 6,
                scale:3,
                brushType: 'fill'
              },
              itemStyle: {
                normal: {
                  color: '#1BAC6B'//修改圆圈颜色
                }
              }
            }]
          };
          var oe = new ADLayer(option, this.map, this.$echarts);
          oe.render();
          //设置样式
          newFeature.setStyle(createStyle(newFeature));
          feas.push(newFeature) ;
          if(Number( result[i].x)>0&&Number( result[i].y)>0)
          {xList.push(Number( result[i].x));
          yList.push(Number( result[i].y));}
        }
        var vectorSour = new VectorSource({
          features: feas
        });
        //初始化矢量图层
        var vectorLayers = new VectorLayer({
          // zIndex: 9999,
          // distance: 500,
          source:vectorSour
        });
        xList=xList.sort(mySort)
        yList=yList.sort(mySort)
        function mySort(a, b) {
          if (a > b) return 1
          else return -1
        }
        let xMin=xList[0];
        let yMin=yList[0];
        let xMax = Number(xList[xList.length - 1]);
        let yMax = Number(yList[yList.length - 1]);

        let absX = Math.abs(xMax - xMin)/2;
        let absY = Math.abs(yMax - yMin)/2;
        xMin=xMin-  absX;
        yMin=yMin-  absY;
        xMax=xMax+  absX;
        yMax=yMax+  absY;
        let zoomToExent=new  ZoomToExtent ({
          extent:[xMin,yMin,xMax,yMax]
        });

        //将矢量图层添加到map
        this.map.addLayer(vectorLayers);
        this.map.addControl(zoomToExent);
        if (result.length > 0) {
          setTimeout(()=>{
            document.getElementsByClassName("ol-zoom-extent")[0].children[0].click();
          },300)
        }

        //创建标注的样式
        function createStyle() {
          //返回一个样式
          return new Style({
            // image: new olstyleIcon({
            //   opacity: 1,
            //   scale: 1,
            //   src: "/img/cluster/闪烁点.gif"
            // }),
            text: new Text({
              text: result[i].stationName,
              offsetY: -28,
              font: 'normal 16px 微软雅黑',
              textAlign: 'center',
              backgroundStroke:new Stroke({
                color:'rgba(27,172,107,1)',
                width:1
              }),
              //标签的背景填充                                                  
              backgroundFill:new Fill({
                color:'rgba(255,255,255,0.8)'
              }),
              fill: new Fill({
                color: "rgba(27,172,107,1)"
              }),
              stroke: new Stroke({
                // 文字描边
                color: "#fff",
                width: 4
              }),
              
            })
          });

        }
      }
     


    }
  };
</script>

<style lang="scss">
  .ol-overlaycontainer-stopevent {
    display: none;
  }
</style>
<style lang="scss" scoped>
  /*#map{*/
  /*  cursor: pointer;*/
  /*}*/
  #mouse-position {
    float: right;
    position: absolute;
    right: 3px;
    width: 200px;
    height: 20px;
    /* 将z-index设置为显示在地图上层 */
    z-index: 20;
  }
  /* 显示鼠标信息的自定义样式设置 */
  .custom-mouse-position {
    color: black;
    font-size: 16px;
    font-family: "Arial";
  }
  

</style>
