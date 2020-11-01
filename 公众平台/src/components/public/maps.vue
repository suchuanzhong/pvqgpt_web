<template>

    <div id="map" ref="rootmap">
        <div id="mouse-position"></div>


  
        <component
                :is="dialogName"
                :digitalArchivesList="detailData"
        ></component>
    </div>

</template>
<script>
    import { getFormatDate } from "@/utils/auth";
    import "ol/ol.css";
    import { get as getProjection } from "ol/proj";
    import {boundingExtent,getCenter, getWidth } from 'ol/extent';
    import View from "ol/View";
    import Map from "ol/Map";
    import TileLayer from "ol/layer/Tile";
    import VectorLayer from "ol/layer/Vector";
    import Feature from "ol/Feature";
    import Point from "ol/geom/Point";
    import olStyle from "ol/style/Style";
    import { Fill, Text, Style, Stroke } from "ol/style";
    import { Cluster, Vector as VectorSource, XYZ } from "ol/source";
    import olstyleIcon from "ol/style/Icon";
    import ol3Echarts from "ol-echarts";
    import OlStyleStroke from "ol/style/Stroke";
    import EsriJSON from "ol/format/EsriJSON";
    import $ from "jquery";
    import Overlay from 'ol/Overlay';
    import elementResizeDetectorMaker from "element-resize-detector";
    let features = [];
    const edm = elementResizeDetectorMaker();
    let currentFeature = null;

    let areaLineLayer = null;
    let geoCoordArr  = [];
    let  geoCoordMap = {};

    import BaseShow from '../../views/page/digitalArchives/dialog/Number-base'
    // let istanbul = fromLonLat([103.067378, 36.288785]);
    // import VectorImageLayer from 'ol/layer/VectorImage';
    // import {defaults as defaultControls} from 'ol/control'
    // import MousePosition from 'ol/control/MousePosition'
    // import {createStringXY} from 'ol/coordinate'
    export default {
        name: "OlMap",
        props: {
            visible: {
                type: Boolean,
                required: false
            },

            initMap: {
                default: function() {
                    return [];
                }
            },

            // getMapPoint: {
            //   default: function() {
            //     return [];
            //   }
            // },
            markerData: {
                default: function() {
                    return [];
                }
            },
            targetPoint: function() {
                return [];
            }
        },
        data() {
            return {
                detailData:[],
                dialogName: "",
                titleName: "",
                map1: null,
                view: null,
                vectorSource: null ,
                mappop:null,
                digitalArchivesList: {},
            };
        },
        components:{
            BaseShow,
        },
        filters: {
            toUpperCase(text) {
                return text.toUpperCase();
            },
            dateFormat(date) {
                return getFormatDate("yyyy-MM-dd hh:mm:ss", date);
            }
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
                center: [103.067378, 36.288785],
                projection: projection,
                zoom: 6, //地图初始的缩放比例
                minZoom:5, //最小缩放比例
                maxZoom: 16 //最大缩放比例
            });
            this.mappop = new Overlay({
                element: document.getElementById("mappop"),
                positioning: "bottom-center",
                offset: [0, -15]
            });
            //   初始化地图
            this.map1 = new Map({
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
                        })
                    })
                ],
                target: "map",
                view: this.view  ,
                overlays: [this.mappop]
            });

            this.mappop.setPosition(null);
            //监听地图页面高度
            edm.listenTo(document.querySelector("#map"), () => {
                this.map1.updateSize();
            });
            // debugger
            let data = this.initMap;
            console.log(data)
            this.stationMarker(data)

            this.addMarker();
            this.styleClear();

        },
        watch: {

            initMap(data) {
                this.stationMarker(data)
            },
            markerData() {
                if (this.vectorLayer) {
                    this.map1.removeLayer(this.vectorLayer);
                }
                this.styleClear();
                this.addMarker();
            },
            targetPoint(n) {
                this.vectorSource.clear();
                this.view.animate({
                    center: [n.x, n.y],
                    duration: 1000,
                    zoom: 12
                });
            },
            // getMapPoint(t) {
            //   this.vectorSource.clear();
            //   this.stationMarker(t.name, t.lon, t.lat);
            //   this.view.animate({
            //     center: [t.lon, t.lat],
            //     duration: 1000,
            //     zoom: 12
            //   });
            // }
        },
        methods: {

            //tree
            styleClear(province) {
                features.forEach(feature => {
                    if(feature.values_.NAME === province) {
                        if (null != currentFeature) {
                            currentFeature.setStyle(this.getDefaultStyle());
                        }
                        currentFeature = feature;
                        feature.setStyle(this.getHighlightStyle());
                        this.view.setCenter(feature.values_.geometry.flatCoordinates);
                    }
                })

            },
            addMarker() {
                //边界线
                var style = new Style({
                    fill: new Fill({
                        color: "rgba(255,0,0,0)"
                    }),
                    stroke: new Stroke({
                        color: "#319FD3",
                        width: 1
                    }),
                    text: new Text()
                });
                var _this = this;

                var features0;
                $.ajax({
                    type: "get",
                    url: "json/shengjie.json",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: response => {
                        features0 = new EsriJSON().readFeatures(response);
                        var features1 = [];
                        features0.forEach(t => {
                            if (provinces.indexOf(t.values_.NAME) > -1) {
                                t["myTypeName"] = "省份";
                                t["myType"] = 2;
                                t["myValue"] = t.values_.NAME;
                                t.values_.Shape_Area;
                                t.values_.Shape_Length;

                                features1.push(t);
                            }
                        });

                        features = features1;

                        areaLineLayer = new VectorLayer({
                            source: new VectorSource({
                                features: features1
                            }),

                            style: style
                        });
                        _this.map1.addLayer(areaLineLayer);
                    },
                    error: err => {
                        console.log(err);
                    }
                });
                //鼠标移上去地图边界线高亮
                // var highlightStyle = new Style({
                //   stroke: new Stroke({
                //     color: "#f00",
                //     width: 1
                //   }),
                //   fill: new Fill({
                //     color: "rgba(255,0,0,0.1)"
                //   }),
                //   text: new Text({
                //     font: "12px Calibri,sans-serif",
                //     fill: new Fill({
                //       color: "#000"
                //     }),
                //     stroke: new Stroke({
                //       color: "#f00",
                //       width: 3
                //     })
                //   })
                // });

                var featureOverlay = new VectorLayer({
                    zIndex: 2000,
                    source: new VectorSource(),
                    map: _this.map1,
                    style: function() {
                    //   // highlightStyle.getText().setText(feature.get('NAME'));
                      return highlightStyle;
                    }
                });
                var highlight;

                var displayFeatureInfo = function(pixel) {
                    var feature = _this.map1.forEachFeatureAtPixel(pixel, function(
                        feature
                    ) {
                        return feature;
                    });
                    if (feature !== highlight) {
                        if (highlight) {
                            featureOverlay.getSource().removeFeature(highlight);
                        }
                        if (feature) {
                            featureOverlay.getSource().addFeature(feature);
                        }
                        highlight = feature;
                    }
                };

                _this.map1.on("pointermove", function(evt) {

                    if (evt.dragging) {
                        return;
                    }
                    // var pixel = _this.map1.getEventPixel(evt.originalEvent);
                    displayFeatureInfo(evt.pixel);
                });

                _this.map1.on("click", function(evt) {
                    _this.map1.forEachFeatureAtPixel(evt.pixel, function(feature) {
                        if (feature.myTypeName) {
                            if (null != currentFeature) {
                                currentFeature.setStyle(style);
                            }
                            currentFeature = feature;
                            // feature.setStyle(highlightStyle);
                            // debugger
                            _this.view.setCenter(feature.values_.geometry.flatCoordinates);
                            _this.$emit("station-change", {
                                type: feature.myType,
                                value: feature.myValue
                            });
                            _this.$parent.mapTreelId(feature.myValue);
                            _this.$parent.setFromMap({ type: feature.myType,
                                value: feature.myValue});

                        } else if (feature.values_.features[0].myType) {

                            // _this.view.setCenter(feature.values_.geometry.flatCoordinates); //点击基地坐标居中
                            _this.$emit("station-change", {
                                type: feature.values_.features[0].myType,
                                value: feature.values_.features[0].myValue,
                            });
                            _this.$parent.mapTreelId(feature.values_.features[0].myValue);
                            feature.setStyle(new olStyle({
                                image: new olstyleIcon({
                                    opacity: 1,
                                    scale: 1,
                                    src: "/img/cluster/third-baseActive.png"
                                }),
                                text: new Text({
                                    text:feature.values_.features[0].values_.name,
                                    offsetY: -30,
                                    font: "14px Calibri,sans-serif",
                                    fill: new Fill({
                                        // src: "/img/cluster/third-baseActive.png",
                                        color: "rgba(58,146,255,1)"
                                    }),
                                    stroke: new OlStyleStroke({
                                        // 文字描边
                                        color: "#fff",
                                        width: 4
                                    })
                                })
                            }))
                            var   myProvinces2 = feature.values_.features[0].values_.provinces;
                            _this.$parent.setFromMap({
                                type: feature.values_.features[0].myType,
                                value: feature.values_.features[0].values_.name,

                            })
                            areaLineLayer.getSource().featuresRtree_.rbush_.data.children.forEach(t=>{
                                if(t.value.myValue==myProvinces2)  {
                                    // t.value.setStyle(highlightStyle);
                                }
                                else{
                                    t.value.setStyle(_this.getDefaultStyle());
                                }
                            })
                        }
                        if (feature.values_.geometry.flatCoordinates.length>2) {
                            var extent = new boundingExtent(feature.getGeometry().getCoordinates()[0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
                            var center1 = new getCenter(extent);   //获取边界区域的中心位置
                            _this.view.animate({
                                center: center1 ,
                                duration: 2000,
                                zoom:8
                            });

                        }else{
                            _this.view.animate({
                                center: feature.values_.geometry.flatCoordinates ,
                                duration: 2000,
                                zoom:6
                            });
                        }
                        return feature;
                    });

                    displayFeatureInfo(evt.pixel);

                });


                let n = this.markerData;
                var fs = [];
                var provinces = [];
                for (var i = 0; i < n.length; i++) {
                    var newFeature = new Feature(new Point([n[i].x, n[i].y])); //设置样式
                    console.log('3',newFeature)
                    newFeature.setProperties(n[i]);
                    newFeature["myTypeName"] = "基地";
                    newFeature["myType"] = 3;
                    newFeature["myValue"] = n[i].id;
                    fs.push(newFeature);


                    if (provinces.indexOf(n[i].provinces) == -1)
                        //判断A省是否加入，未加入则添加A省，否则跳过

                        provinces.push(n[i].provinces);
                }
                var vectorSource = new VectorSource({
                    features: fs
                });


                var styleCache = {};
                var clusterSource = new Cluster({
                    distance: 120,
                    source: vectorSource
                });

                // //初始化矢量图层
                this.vectorLayer = new VectorLayer({
                    source: clusterSource,
                    zIndex: 9999,
                    style: function(feature) {
                        // debugger
                        var size = feature.get("features").length;
                        if (size > 1) {
                            var _color = "red";
                            var _src = "";
                            if (1 < size && size < 4) {
                                _color = "rgba(84,182,255,1)";
                                _src = "/img/cluster/c11-50.png";
                            } else if (4 < size && size < 6) {
                                _color = "rgba(84,182,255,1)";
                                _src = "/img/cluster/c51-100.png";
                            } else {
                                _color = "rgba(84,182,255,1)";
                                _src = "/img/cluster/c101-200.png";
                            }

                            var style = styleCache[size];
                            if (!style) {
                                style = new olStyle({
                                    image: new olstyleIcon({
                                        opacity: 1,
                                        scale: 1,
                                        src: _src
                                    }),
                                    text: new Text({
                                        text: size.toString(),
                                        fill: new Fill({
                                            color: _color
                                        }),
                                        stroke: new OlStyleStroke({
                                            // 文字描边
                                            color: _color,
                                            width: 1
                                        })
                                    })
                                });
                                styleCache[size] = style;
                            }
                            return style;
                        } else {
                            // var src='';
                            var fe = feature.get("features")[0];
                            var name = fe.get("name");
                            var style1 = new olStyle({
                                image: new olstyleIcon({
                                    opacity: 1,
                                    scale: 1,
                                    src: "/img/cluster/third-base.png"
                                }),
                                text: new Text({
                                    text: name,
                                    offsetY: -30,
                                    font: "14px Calibri,sans-serif",
                                    fill: new Fill({
                                        color: "rgba(58,146,255,1)"
                                    }),
                                    stroke: new OlStyleStroke({
                                        // 文字描边
                                        color: "#fff",
                                        width: 4
                                    })
                                })
                            });
                            return style1;
                        }
                    }
                });
                //将矢量图层添加到map
                this.map1.addLayer(this.vectorLayer);
            },
            getDefaultStyle(){
                return new Style({
                    fill: new Fill({
                        color: "rgba(255,0,0,0)"
                    }),
                    stroke: new Stroke({
                        color: "#319FD3",
                        width: 1
                    }),
                    text: new Text()
                });
            },
            //tree点击后选中面颜色
            getHighlightStyle() {
                return new Style({
                    stroke: new Stroke({
                        color: "#f00",
                        width: 1
                    }),
                    fill: new Fill({
                        color: "rgba(255,0,0,0.1)"
                    }),
                    text: new Text({
                        font: "12px Calibri,sans-serif",
                        fill: new Fill({
                            color: "#000"
                        }),
                        stroke: new Stroke({
                            color: "#f00",
                            width: 3
                        })
                    })
                });
            },

            //数字光伏
            stationMarker(data) {

                var marke=[];
                // debugger
                for (var s = 0; s < data.length; s++) {
                    var newFeatureMap = new Feature({
                        geometry: new Point([data[s].x, data[s].y]),
                        name:data[s].name,
                        data: data[s]
                    });
                    marke.push(newFeatureMap)
                }
                //初始化矢量图层
                var vectorSource = new VectorLayer({
                    makes:marke //this.vectorSour
                });
                //将当前要素加入矢量数据源
                this.map1.addLayer(vectorSource);

                this.addmovelayer(data);

            },
            addmovelayer(passArr) {
                var textlayer = new VectorLayer({
                    zIndex: 11,
                    source: new VectorSource({
                        makes:[]
                    }),
                    style: function(feature) {
                        let attr = feature.get("attr");
                        return new Style({
                            text:new Text({
                                text:attr.name,
                                offsetY: -30,
                                font: "14px Calibri,sans-serif",
                                fill: new Fill({
                                    color: "rgba(58,146,255,1)"
                                }),
                                stroke: new Stroke({
                                    // 文字描边
                                    color: "#fff",
                                    width: 4
                                })
                            })
                        })
                    }
                });
                this.map1.addLayer(textlayer);
                $($("#map .ol-overlaycontainer")).attr("id", "myol-overlaycontainer");
                var echartslayer = new ol3Echarts(null, {
                    hideOnMoving: true,
                    hideOnZooming: true,
                    target: "#myol-overlaycontainer",
                    polyfillEvents:true
                });
                echartslayer.appendTo(this.map1);
                let BJData = [];
                if(passArr.length>0){
                    passArr.map(t =>{
                        geoCoordArr.push({
                            [t.name]:{coord:[t.x,t.y],id:t.id}

                        }) ;
                        BJData.push([{
                            name:t.name
                        }])

                    })
                }
                geoCoordArr.forEach(item =>{

                    geoCoordMap[Object.keys(item)[0]] = Object.values(item)[0]
                }) ;


                var color = ['#0AF3FF', '#25dd59', '#ff0', '#04FDB8', '#ffff46', '#27bbfe'];
                var convertData = function(data) {

                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = geoCoordMap[dataItem[0].name];
                        var toCoord = [113.58934, 37.867604];
                        if (fromCoord && toCoord) {
                            res.push([
                                {
                                    coord: fromCoord.coord,
                                    value: 10
                                },
                                {
                                    coord: toCoord,
                                }
                            ]);
                        }
                    }
                    return res;
                };

                // var color = ["#fc3a3b", "#32bf00", "#ff8d00", '#27bbfe'];


                var series = [];
                [["国家可再生能源管理信息中心", BJData]].forEach(function(item,i) {
                    series.push({
                            type: "lines",
                            zlevel:3,
                            effect: {
                                show: true,
                                period: 4,
                                trailLength: 0.5,//特效尾迹长度[0,1]值越大，尾迹越长重
                                // color: '#fff',
                                symbol: 'arrow', //箭头图标
                                symbolSize: 7, //图标大小
                                // shadowBlur: 8,
                            },
                            lineStyle: {
                                normal: {
                                    // color: color[i],
                                    width:2, //尾迹线条宽度
                                    opacity: 1, //尾迹线条透明度
                                    curveness:.2, //尾迹线条曲直度
                                }
                            },
                            data: convertData(item[1])
                        },
                        {
                            type: "effectScatter",
                            zlevel:4,
                            coordinateSystem: 'geo',
                            // symbol: "emptyCircle",
                            symbolSize:12,
                            hoverAnimation: true,
                            rippleEffect: {
                                period: 15,
                                scale: 4,
                                brushType: 'fill'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "right", //显示位置
                                    offset: [5, 0], //偏移设置
                                    formatter: function(params) {
                                        //圆环显示文字
                                        return params.data.name;
                                    },
                                    fontSize: 14,
                                    // color: color[i],
                                },
                                emphasis: {
                                    show: true
                                }

                            },
                            // symbolSize: function(val) {
                            //   return 6+ val[2] / 4; //圆环大小
                            // },

                            itemStyle: {
                                normal: {
                                    shadowBlur: 20,
                                    // shadowColor: '#f337363',
                                    color: color[i],
                                },
                            },
                            data: item[1].map(function(dataItem) {
                                return {
                                    name: dataItem[0].name,
                                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                                };
                            })
                        });
                });

                
                var option = {
                    // title: {},
                    tooltip: {
                        show: true,
                        trigger: "item",
                    },
                    // visualMap: { //图例值控制
                    //   calculable: true,
                    //   show: false,
                    //   min: 0,
                    //   max: 1000,
                    //   color: color,
                    //
                    //   textStyle: {
                    //     color: '#fff'
                    //   },
                    // },
                    geo: {
                        map: '国家可再生能源管理信息中心',
                        // roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#4487d5',
                                borderColor: '#3B5077' ,
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: '#2a333d',
                                borderWidth: 0
                            }
                        }
                    },
                    series: series
                };

                echartslayer.setChartOptions(option);

                var chart =echartslayer.$chart;
                var _this=this

                chart.on('click', function(params){
                    // _this.dialogName = "BaseShow";
                    // _this.titleName = params.data.name;
                    _this.$fetch("/MtrBase/GetMtrDetQuery", {
                        id:geoCoordMap[params.data.name].id
                    }).then(res => {
                        debugger
                        _this.detailData=res.data;
                        var position=[params.value[0],params.value[1]];//地图中心点-经纬度坐标
                        //经纬度转至xy
                        // m_center =new proj.transform(m_center,'EPSG:4326', 'EPSG:3857' );
                        _this.mappop.setPosition([position]);
                        _this.map1.addOverlay(_this.mappop);
                    });
                });

            },
            closer () {
                _this.mappop.setPosition(undefined);
                closer.blur()
                return false
                // _this.currentCoordinate = null

            },
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

    .infWin {
        display: inline-block;
        min-width: 168px;
        height: 69px;
        background: url("/img/index/base-line.png") no-repeat;
        border-radius: 2px;
        position: absolute;
        margin-left: 200px;
        bottom: 200px;
        /*right: 40px;*/
        padding: 6px;
        z-index: 2;
        box-sizing: border-box;
        border: 1px solid #1bac6b;
        /*background: rgba(#113564, 0.5);*/
        cursor: pointer;
        width: max-content;
    }
    small {
        font-size: 14px;
        font-style: italic;
        color: #000000;
        position: relative;
        left: 6px;
        top: -7px;
        text-align: center;
    }
    .unit {
        position: absolute;
        right: 9px;
        font-size: 14px;
        color: #666;
    }

    p {
        margin-top: 6px;
        text-align: center;
        color: #666;
        font-size: 14px;
        box-sizing: border-box;
    }
    label {
        /*padding-left: 22px;*/
        color: #1bac6b;
        font-size: 16px;
        font-family: "euro_regular";
    }
    .mapPop {
        position: absolute;
        min-width: 200px;
        /*padding:20px 0px 10px 0px;*/
        vertical-align: middle;
        background-color: #fff;
        border-radius: 8px;
        font-size: 18px;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        transition: all 0.5s;
        backface-visibility: hidden;
        z-index: 2;
        /*position: absolute;*/
        top: 20px;
        left: 255px;

        .title {
            color: #303133;
            border-bottom: 1px solid #D1D1D1;
            height: 35px;
            border-radius: 8px 8px 0 0;
            padding-left: 12px;
            line-height: 32px;
        }
        .el-icon-close{
            padding-right: 10px;
            float: right;
            padding-top: 6px;
        }
        .angle-wrapper {
            content: "";
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-left-color: #fff;

            transform: rotate(90deg);
            position: absolute;
            left: calc(50% - 15px);
            top: 100%;
        }
        .popContain {
            padding: 8px;
            min-width: 310px;
            box-sizing: border-box;
            p {
                padding: 3px 0;
                font-size: 14px;
                color: #555;
                label {
                    display: inline-block;
                    width: 200px;
                }

            }
        }
    }

</style>
