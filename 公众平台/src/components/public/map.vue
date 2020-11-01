<template>
    <!--  <div>-->


    <div id="map" ref="rootmap">
        
        <div id="popup" class="ol-popup">

            <div id="popup-title" class="popup-title">{{detailData.basename}}
                <i id="popup-closer" class="ol-popup-closer"></i>
            </div>
            <div id="popup-content" class="popup-content">
                <p>
                    <label>批次:</label>
                    <span>{{detailData.batchName}}</span>
                </p>
                <p>
                    <label>建设时间:</label>
                    <span>{{detailData.buildtime|timeFilter}}</span>
                </p>
                <p>
                    <label>并网容量（MW）:</label>
                    <span>{{detailData.gridsCale}}</span>
                </p>
                <p>
                    <label>占地面积（亩）:</label>
                    <span>{{detailData.area}}</span>
                </p>
                <p>
                    <label>年均辐射量（kWh/m²）:</label>
                    <span>{{detailData.radiation}}</span>
                </p>
                <p>
                    <label>省份:</label>
                    <span>{{detailData.province}}</span>
                </p>
                <p>
                    <label>并网时间:</label>
                    <span>{{detailData.gridtime |timeFilter}}</span>
                </p>
                <p>
                    <label>总投资（亿元）:</label>
                    <span>{{detailData.invest}}</span>
                </p>
                <p>
                    <label>资源区:</label>
                    <span>{{detailData.sourcearea}}</span>
                </p>
                <p>
                    <label>年均发电量（万kWh）:</label>
                    <span>{{detailData.power}}</span>
                </p>
            </div>
        </div>
        
    </div>
</template>
<script>
    import {getFormatDate} from "@/utils/auth";
    import "ol/ol.css";
    import {get as getProjection} from "ol/proj";
    import {boundingExtent, getCenter, getWidth} from 'ol/extent';
    import View from "ol/View";
    import Map from "ol/Map";
    import TileLayer from "ol/layer/Tile";
    import VectorLayer from "ol/layer/Vector";
    import Feature from "ol/Feature";
    import Point from "ol/geom/Point";
    import olStyle from "ol/style/Style";
    import {Fill, Text, Style, Stroke} from "ol/style";
    import {Cluster, Vector as VectorSource, XYZ} from "ol/source";
    import olstyleIcon from "ol/style/Icon";
    import ol3Echarts from "ol-echarts";
    import OlStyleStroke from "ol/style/Stroke";
    import EsriJSON from "ol/format/EsriJSON";
    import $ from "jquery";
    import Overlay from 'ol/Overlay';
    import elementResizeDetectorMaker from "element-resize-detector";
    import router from "../../router";

    let features = [];
    let pointfeatures = [];
    const edm = elementResizeDetectorMaker();
    let currentFeature = null;

    let areaLineLayer = null;
    let geoCoordArr = [];
    let geoCoordMap = {};

    // import BaseShow from '../../views/page/digitalArchives/dialog/Number-base'
    // let istanbul = fromLonLat([103.067378, 36.288785]);
    // import VectorImageLayer from 'ol/layer/VectorImage';
    // import {defaults as defaultControls} from 'ol/control'
    // import MousePosition from 'ol/control/MousePosition'
    // import {toStringHDMS } from 'ol/coordinate'
    export default {
        name: "OlMap",
        props: {
            visible: {
                type: Boolean,
                required: false
            },

            initMap: {
                default: function () {
                    return [];
                }
            },

            // getMapPoint: {
            //   default: function() {
            //     return [];
            //   }
            // },
            markerData: {
                default: function () {
                    return [];
                }
            },
            targetPoint: function () {
                return [];
            }
        },
        data() {
            return {
                detailData: [],
                dialogName: "",
                titleName: "",
                map1: null,
                view: null,
                vectorSource: null,
                mappop: null,
                digitalArchivesList: {},
                 showPoint:false ,
            };
        },
        components: {
            // BaseShow,
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
                minZoom: 4, //最小缩放比例
                maxZoom: 16 //最大缩放比例
            });
            this.mappop = new Overlay({
                //设置弹出框的容器
                element: document.getElementById('popup'),
                stopEvent: false, //是否停止鼠标事件穿透弹出框
                offset: [-162, -340],
                //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
                autoPan: true,
                autoPanAnimation: {
                    duration: 250,
                },
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
                view: this.view,
                overlays: [this.mappop]
            });

            // this.mappop.setPosition(null);

            //监听地图页面高度
            edm.listenTo(document.querySelector("#map"), () => {
                this.map1.updateSize();
            });
           
             if (this.$route.path != "/") {
                // this.stationMarker()
                 this.addMarker();
           }else {
                 this.stationMarker()
             }
       
           
            //
            // this.styleClear();
            // this.closer()
            // var _this=this;
            // // 地图拖动事件
            // this.map1.on("moveend", function (evt) {
            //   _this.updateMappop();
            //
            // });


        },

        watch: {

            initMap() {
                this.stationMarker()
            },
            markerData() {

                if (this.vectorLayer) {
                    this.map1.removeLayer(this.vectorLayer);
                }
                // this.styleClear();
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
        },
        methods: {

            setMapZoom(){
                this.showPoint=true
                this.view.animate({
                    center: [108.620487,36.414357],
                    duration: 1000,
                    zoom: 5
                });
             
            },

            //tree
            styleClear(batchName, name) {
                // debugger
                console.log('jie', name)
                var source = this.vectorLayer.getSource();
                // if(source instanceof Vector) {
                var features = source.getFeatures();
                if (features.length > 0) {
                    for (var j = 0; j < features.length; j++) {
                        var fe = features[j].get("features")[0];
                        var jname = fe.get("name");
                        console.log(features[j])
                        if (jname === name) {
                            if (null != currentFeature) {
                                currentFeature.setStyle(this.getDefaultStyle(currentFeature, batchName, name));
                            }
                            currentFeature = features[j];
                            features[j].setStyle(this.getPointHighlightStyle(features[j], batchName, name));
                            this.view.setCenter(features[j].values_.geometry.flatCoordinates);
                            break;
                        }
                    }
                }
            },
            addMarker() {
                if (this.vectorSourceScatter) {
                    this.map1.removeLayer(this.vectorSourceScatter);

                }
                //边界线
                var style = new Style({

                    stroke: new Stroke({
                        color: "#808080",
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
                            // debugger
                            // if (provinces.indexOf(t.values_.NAME) > -1) {
                            t["myTypeName"] = "批次";
                            t["myType"] = 4;
                            t["myValue"] = t.values_.NAME;
                            features1.push(t);
                            // }
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
                //鼠标移上去地图基地高亮

                var highlightStyle = new olStyle({
                    image: new olstyleIcon({
                        opacity: 1,
                        scale: 1,
                        src: "/img/cluster/third-baseActive.png"
                    }),
                    text: new Text({
                        // text: feature.get("features")[0].name,
                        font: "12px Calibri,sans-serif",
                        fill: new Fill({
                            color: "rgba(255,255,255,1)"
                        }),
                        stroke: new OlStyleStroke({
                            color: "#5CBAF1",
                            width: 4
                        })
                    })
                });

                var featureOverlay = new VectorLayer({
                    zIndex: 2000,
                    source: new VectorSource(),
                    map: _this.map1,
                    style: function (feature) {
                        // debugger
                        return _this.getPointHighlightStyle(feature)
                    }

                });
                var highlight;

                var displayFeatureInfo = function (pixel) {
                    var feature = _this.map1.forEachFeatureAtPixel(pixel, function (
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

                _this.map1.on("pointermove", function (evt) {

                    if (evt.dragging) {
                        return;
                    }
                    displayFeatureInfo(evt.pixel);
                });

                _this.map1.on("click", function (evt) {

                    _this.map1.forEachFeatureAtPixel(evt.pixel, function (feature) {
                        if (null != currentFeature) {
                            currentFeature.setStyle(_this.getDefaultStyle(currentFeature));
                        }
                        if (feature.myTypeName) {

                            currentFeature = feature;
                            feature.setStyle(_this.getPointHighlightStyle(feature));

                            _this.view.setCenter(feature.values_.geometry.flatCoordinates);
                            _this.$emit("station-change", {
                                type: feature.myType,
                                value: feature.myValue
                            });
                            _this.$parent.mapTreelId(feature.myValue);
                            _this.$parent.setFromMap({
                                type: feature.myType,
                                value: feature.myValue
                            });

                        } else if (feature.values_.features[0].myType) {

                            // _this.view.setCenter(feature.values_.geometry.flatCoordinates); //点击基地坐标居中
                            _this.$emit("station-change", {
                                type: feature.values_.features[0].myType,
                                value: feature.values_.features[0].myValue,
                            });
                            _this.$parent.mapTreelId(feature.values_.features[0].myValue);
                            feature.setStyle(_this.getPointHighlightStyle(feature))
                            currentFeature = feature;
                            var myProvinces2 = feature.values_.features[0].values_.name;
                            _this.$parent.setFromMap({
                                type: feature.values_.features[0].myType,
                                value: feature.values_.features[0].values_.name,

                            })

                            // areaLineLayer.getSource().featuresRtree_.rbush_.data.children.forEach(t=>{
                            //   if(t.value.myValue==myProvinces2)  {
                            //     t.value.setStyle(highlightStyle);
                            //   }
                            //   else{
                            //     t.value.setStyle(_this.getDefaultStyle(feature));
                            //   }
                            // })
                        }
                        if (feature.values_.geometry.flatCoordinates.length > 2) {
                            var extent = new boundingExtent(feature.getGeometry().getCoordinates()[0]);
                            //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
                            var center1 = new getCenter(extent);   //获取边界区域的中心位置
                            _this.view.animate({
                                center: center1,
                                duration: 2000,
                                zoom: 8
                            });

                        } else {
                            _this.view.animate({
                                center: feature.values_.geometry.flatCoordinates,
                                duration: 2000,
                                zoom: 6
                            });
                        }
                        return feature;
                    });

                    displayFeatureInfo(evt.pixel);

                });


                let n = this.markerData;

                var fs = [];
                // var provinces = [];
                for (var i = 0; i < n.length; i++) {
                    // for (var t = 0; t < n.length; t++){}
                    var newFeature = new Feature(new Point([n[i].x, n[i].y])); //设置样式
                    console.log('3', newFeature)
                    newFeature.setProperties(n[i]);
                    newFeature["myTypeName"] = "基地";
                    newFeature["myType"] = 3;
                    newFeature["myValue"] = n[i].id;
                    fs.push(newFeature);
                    // if (provinces.indexOf(n[i].provinces) == -1)
                    //         //判断A省是否加入，未加入则添加A省，否则跳过
                    //
                    //   provinces.push(n[i].provinces);
                    // console.log('shen', provinces.push(n[i].provinces))
                }
                pointfeatures = fs;
                var vectorSource = new VectorSource({
                    features: fs
                });


                var styleCache = {};
                var clusterSource = new Cluster({
                    // distance: 500,
                    source: vectorSource
                });

                // //初始化矢量图层
                this.vectorLayer = new VectorLayer({
                    source: clusterSource,
                    zIndex: 9999,
                    style: function (feature) {
                        var fe = feature.get("features")[0];
                        // debugger
                        var name = fe.get("name");
                        var batchName = fe.values_.batchName;
                        var colors = '#25D3FF';
                        var src1 = '/img/cluster/third-base.png'
                        if (batchName == "第一批次") {
                            src1 = "/img/cluster/third-base.png"
                            colors = '#25D3FF'
                        } else if (batchName == "第二批次") {
                            src1 = '/img/cluster/one-base.png'
                            colors = '#0ED318'
                        } else if (batchName == "第三批次") {
                            src1 = '/img/cluster/two-base.png'
                            colors = '#FFBA00'
                        }
                        var style1 = new olStyle({
                            image: new olstyleIcon({
                                opacity: 1,
                                scale: 1,
                                src: src1
                            }),
                            text: new Text({
                                text: name,
                                offsetY: -30,
                                font: "14px Calibri,sans-serif",
                                fill: new Fill({
                                    color: colors
                                }),
                                stroke: new OlStyleStroke({
                                    // 文字描边
                                    color: "#fff",
                                    width: 4
                                })
                            })
                        });
                        return style1;
                        // var size = feature.get("features").length;
                        // if (size > 1) {
                        //     var _color = "red";
                        //     var _src = "";
                        //     if (1 < size && size < 4) {
                        //         _color = "rgba(84,182,255,1)";
                        //         _src = "/img/cluster/c11-50.png";
                        //     } else if (4 < size && size < 6) {
                        //         _color = "rgba(84,182,255,1)";
                        //         _src = "/img/cluster/c51-100.png";
                        //     } else {
                        //         _color = "rgba(84,182,255,1)";
                        //         _src = "/img/cluster/c101-200.png";
                        //     }
                        //
                        //     var style = styleCache[size];
                        //     if (!style) {
                        //         style = new olStyle({
                        //             image: new olstyleIcon({
                        //                 opacity: 1,
                        //                 scale: 1,
                        //                 src: _src
                        //             }),
                        //             text: new Text({
                        //                 text: size.toString(),
                        //                 fill: new Fill({
                        //                     color: _color
                        //                 }),
                        //                 stroke: new OlStyleStroke({
                        //                     // 文字描边
                        //                     color: _color,
                        //                     width: 1
                        //                 })
                        //             })
                        //         });
                        //         styleCache[size] = style;
                        //     }
                        //     return style;
                        // } else {
                        //     // var src='';
                        //
                        // }
                    }
                });
                //将矢量图层添加到map
                this.map1.addLayer(this.vectorLayer);
            },
            getDefaultStyle(feature) {

                var fe = feature.get("features")[0];
                // debugger
                var name = fe.get("name");
                // if(!name)      name = fe.get("features")[0].get("name");
                // if(!batchName)      batchName = fe.get("features")[0].values_.batchName;
                var batchName = fe.values_.batchName;
                var colors = '#25D3FF';
                var src1 = '/img/cluster/third-base.png'
                if (batchName == "第一批次") {
                    src1 = "/img/cluster/third-base.png"
                    colors = '#25D3FF'
                } else if (batchName == "第二批次") {
                    src1 = '/img/cluster/one-base.png'
                    colors = '#0ED318'
                } else if (batchName == "第三批次") {
                    src1 = '/img/cluster/two-base.png'
                    colors = '#FFBA00'
                }
                var style1 = new olStyle({
                    image: new olstyleIcon({
                        opacity: 1,
                        scale: 1,
                        src: src1
                    }),
                    text: new Text({
                        text: name,
                        offsetY: -30,
                        font: "14px Calibri,sans-serif",
                        fill: new Fill({
                            color: colors
                        }),
                        stroke: new OlStyleStroke({
                            // 文字描边
                            color: "#fff",
                            width: 4
                        })
                    })
                });
                return style1;

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
            //tree点击后选中面颜色
            getPointHighlightStyle(feature) {
                var fe = feature.get("features")[0];
                var name = fe.get("name");
                var batchName = fe.values_.batchName;
                // if(!name)      name = fe.get("features")[0].get("name");
                // if(!batchName)      batchName = fe.get("features")[0].values_.batchName;
                var colors = '#25D3FF';
                var src1 = '/img/cluster/third-baseActive.png'
                if (batchName == "第一批次") {
                    src1 = "/img/cluster/third-baseActive.png"
                    colors = '#25D3FF'
                } else if (batchName == "第二批次") {
                    src1 = '/img/cluster/one-baseActive.png'
                    colors = '#0ED318'
                } else if (batchName == "第三批次") {
                    src1 = '/img/cluster/two-baseActive.png'
                    colors = '#FFBA00'
                }
                var style1 = new olStyle({
                    image: new olstyleIcon({
                        opacity: 1,
                        scale: 1,
                        src: src1
                    }),
                    text: new Text({
                        text: name,
                        offsetY: -30,
                        font: "14px Calibri,sans-serif",
                        fill: new Fill({
                            color: colors
                        }),
                        stroke: new OlStyleStroke({
                            // 文字描边
                            color: "#fff",
                            width: 4
                        })
                    })
                });
                return style1;
            },

            //数字光伏
            stationMarker() {
                let data = this.initMap;
                // debugger
                var marke = [];
                for (var s = 0; s < data.length; s++) {
                    var newFeatureMap = new Feature({
                        geometry: new Point([data[s].x, data[s].y]),
                        name: data[s].name,
                        data: data[s]
                    });
                    marke.push(newFeatureMap)
                }
                //初始化矢量图层
               this.vectorSourceScatter = new VectorLayer({
                    makes: marke //this.vectorSour
                });

                //将当前要素加入矢量数据源
                this.map1.addLayer(this.vectorSourceScatter);

                this.addmovels(data);
                this.setMapZoom()
            },
            addmovels(passArr) {
                var textlayer = new VectorLayer({
                    zIndex: 11,
                    source: new VectorSource({
                        makes: []
                    }),
                    style: function (feature) {
                        let attr = feature.get("attr");
                        return new Style({
                            text: new Text({
                                text: attr.name,
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
                    polyfillEvents: true
                });
                echartslayer.appendTo(this.map1);
                let dataT = [];
                if (passArr.length > 0) {
                    passArr.map(t => {
                        geoCoordArr.push({
                            [t.name]: {coords: [t.x, t.y], id: t.id}

                        });
                        dataT.push({
                            name: t.name,
                            value: t.batchName
                        })

                    })
                }
                geoCoordArr.forEach(item => {

                    geoCoordMap[Object.keys(item)[0]] = Object.values(item)[0]
                });
                // if(this.showPoint)
                // {
                    geoCoordMap['国家可再生能源管理信息中心'] = [116.34247,39.911312];

                var GZData = [];
                var tempData = ['国家可再生能源管理信息中心', GZData];

                dataT.map((item, index) => {
                    var arr = [];
                    arr.push(item)
                    arr.push({
                        name: '国家可再生能源管理信息中心',

                    })
                    GZData.push(arr)
                })
                // }

                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = geoCoordMap[dataItem[0].name];
                        var toCoord = geoCoordMap[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                 // toName: dataItem[1].name,
                                coords: [fromCoord.coords, toCoord],
                                value: dataItem[0].value
                            });
                        }
                    }
                    return res;
                };


                var colors = ['#ff3333', '#25D3FF', '#0ED318', '#FFBA00', '#acff43'];
                var series = [];
                
                series.push({
                    name: tempData[0],
                    type: 'lines',
                    zlevel: 3,
                     symbol: ['none', 'circle'],
                    effect: {
                        show: true,
                        period: 4, //箭头指向速度，值越小速度越快
                        trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'arrow', //箭头图标
                        symbolSize: 7, //图标大小
                    },
                    lineStyle: {
                        normal: {
                            color: function (params) {
                                let num = params.data.value; //这是数据中的参数，可改
                                if (num == '第一批次') {
                                    return colors[1]
                                } else if (num == '第二批次') {
                                    return colors[2]
                                } else if (num == '第三批次') {
                                    return colors[3]
                                } else if (num == '第三批次奖励') {
                                    return colors[0]
                                }
                            },
                            width: 2, //尾迹线条宽度
                            opacity: 1, //尾迹线条透明度
                            curveness: .3, //尾迹线条曲直度
                        }
                    },
                    data: convertData(tempData[1])
                }, {
                    name: tempData[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
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
                            formatter: function (params) {
                                //圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 14,
                            color: function (params) {
                                let num = params.data.value.splice(2); //这是数据中的参数，可改
                                if (num == '第一批次') {
                                    return colors[1]
                                } else if (num == '第二批次') {
                                    return colors[2]
                                } else if (num == '第三批次') {
                                    return colors[3]
                                }else if (num == '第三批次奖励') {
                                    return colors[0]
                                }
                            },
                        },
                        emphasis: {
                            show: true
                        }

                    },
                    symbolSize:12,
                    itemStyle: {
                        normal: {
                            show: false,
                            color: function (params) {
                                let num = params.data.value.splice(2); //这是数据中的参数，可改
                                if (num == '第一批次') {
                                    return colors[1]
                                } else if (num == '第二批次') {
                                    return colors[2]
                                } else if (num == '第三批次') {
                                    return colors[3]
                                }else if (num == '第三批次奖励') {
                                    return colors[0]
                                }
                            },

                        }
                    },
                    data: tempData[1].map(function(dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name].coords.concat([dataItem[0].value])
                        };
                    })
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 4,
                    symbolSize: 20,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            padding: [10, 10],
                            formatter: function(params) { //圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 20,
                            borderRadius: 0,
                            borderWidth: 1,
                            borderColor: 'rgba(27,172,107,1)',
                            color:"rgba(27,172,107,1)"
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(27,172,107,1)'
                        }
                    },
                    rippleEffect: {
                        brushType: 'fill'
                    },
                    data: [{
                        name: tempData[0],
                        value: geoCoordMap[tempData[0]]
                    }],
                });
               
                let option = {
                    tooltip: {

                        trigger: "item",
                        formatter: function(params) {
                            if (params.seriesType == "scatter" && params.name != tempData[0]) {
                                return "<br>" + params.data.name ;
                            } else if (params.seriesType == "lines") {
                                return "<br>" + params.data.fromName;
                            } else {
                                return params.name;
                            }
                        }
                    },
                    legend: {
                        data: ['第一批次', '第二批次', '第三批次','第三批次奖励'],
                        show: true,
                        icon: 'circle', //设置形状为圆形
                        right:'9%',
                        bottom: "5%",
                        textStyle: {
                            color: 'red'
                        }
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     top: 'bottom',
                    //     left: 'right',
                    //     // itemWidth: 15,
                    //     data: [{
                    //         name:  geoCoordMap[dataItem[0].value],
                    //         icon: iconGD
                    //         // value: geoCoordMap[tempData[0]]
                    //     }],
                    //     // data: [
                    //     //     {
                    //     //         name: '第一批次',
                    //     //         icon: iconGD
                    //     //     },
                    //     //     {
                    //     //         name: '第二批次',
                    //     //         icon: iconLD
                    //     //     },
                    //     //     {
                    //     //         name: '第三批次',
                    //     //         icon: iconRQ
                    //     //     },
                    //     //     {
                    //     //         name: '第三批次奖励',
                    //     //         icon: iconJG
                    //     //     }
                    //     // ],
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // },
                    // visualMap: {
                    //     min: 0,
                    //     max: 100,
                    //     calculable: true,
                    //     // color: colors,
                    //     show: false
                    // },
                    geo: {
                        map: 'china',
                        // roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#4487d5',
                                borderColor: '#3B5077',
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

                var chart = echartslayer.$chart;
                var _this = this
                chart.on('click', function (params) {
                    // _this.titleName = params.data.name;
                    _this.$fetch("/MtrBase/GetMtrDetQuery", {
                        id: geoCoordMap[params.data.name].id
                    }).then(res => {

                        _this.detailData = res.data;
                        var point = [params.value[0], params.value[1]];
                        _this.mappop.setPosition(point)
                        _this.map1.addOverlay(_this.mappop);

                    });
                    var closer = document.getElementById("popup-closer");
                    closer.onclick = function () {
                        _this.mappop.setPosition(undefined);
                        // _this.map1.removeOverlay(_this.mappop);
                        closer.blur();
                        return false;
                    };
                });

            },
        }
    };
</script>

<style lang="scss">
    .ol-selectable{
        z-index: 9 ;
    }
    .ol-overlaycontainer-stopevent {
        display: none;
    }
</style>
<style lang="scss" scoped>

    /* 显示鼠标信息的自定义样式设置 */
    .custom-mouse-position {
        color: black;
        font-size: 16px;
        font-family: "Arial";
    }


    .ol-popup {
        position: absolute;
        background-color: #fff;
        vertical-align: middle;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        /*padding: 20px;*/
        border-radius: 8px;
        top: 0px;
        left: 0px;
        min-width: 320px;
        z-index: 2;
    }

    .ol-popup:after,
    .ol-popup:before {
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

    .popup-title {
        color: #303133;
        border-bottom: 1px solid #D1D1D1;
        padding: 10px 10px;
        line-height: 32px;
    }

    .ol-popup-closer {
        cursor: pointer;
        text-decoration: none;
        position: absolute;
        top: 8px;
        right: 14px;
    }

    .ol-popup-closer:after {
        content: "✖";
    }

    .popup-content {
        padding: 10px 10px;

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
</style>
