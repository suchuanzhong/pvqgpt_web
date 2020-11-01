<template>
<div class="bg">
    <WinLine ids="id_showAttr" style="width:300px" :showAttrDataObj="showAttrDataObj" :showAttr.sync="showFloorWin" LineType="left">
    </WinLine>
    <template v-if="infoDatas.length>0">
        <WinLine  v-for="(infoData,index) in infoDatas" :ids="infoData.id" style="width:300px" :key="index" :showAttrDataObj="infoData.showAttrDataObj" :showAttr="true" :LineType="infoData.lineType">
        </WinLine>
    </template>
    <div class="rkey-mapwin" v-show="showBaseInfo" id="base_win">
        <div class="attr-header">
            <div class="attr-head-name">
                <div class="attr-head-flex">
                    <span>{{showBaseInfoObj.name}}</span><i></i>
                </div>
            </div>
            <div class="attr-close" @click="closeattriPoup()"></div>
        </div>
        <div class="attr-content">
            <div class="attr-table">
                <div class="atrr-row" v-for="(item,index) in showBaseInfoObj.data" :key="index">
                    <label>{{item.title}}</label>
                    <span>{{item.value}}</span>
                </div>

            </div>
            <div class="toStation" @click="goToBase">进入{{jdorstation}}</div>
        </div>
    </div>
        <div class="rkey-mapwin" v-show="showquanjing" id="quanj_win" style="width:1050px;height:800px;left:445px;top:90px;" >
        <div class="attr-header">
            <div class="attr-head-name">
                <div class="attr-head-flex">
                    <span>720全景</span><i></i>
                </div>
            </div>
            <div class="attr-close" @click="showquanjing=false"></div>
        </div>
        <div class="attr-content">
            <iframe :src="quanjurl" width="1025px" height="750px"></iframe>
        </div>
    </div>
    <div id="cesiumContainer" class="bg">
    </div>
</div>
</template>

<script>
import WinLine from '@/components/public/line'
import poup from "../../public/3dpachage/extends/popupForP.js"
var viewer, scriptDatasource, entityPoup = [],
    blackImagelayer, scriptstop = false;
var directionalLight_v, directionalLight_h1, point_light;
export default {
    data() {
        return {
            showFloorWin: false,
            showAttrDataObj: {
                name: "弹框",
                data: [{
                    title: "xxx",
                    value: "xxxxx"
                }]
            },
            showBaseInfo: false,
            showBaseInfoObj: {
                name: "弹框",
                data: [{
                    title: "xxx",
                    value: "xxxxx"
                }]
            },
            showquanjing:false,
            quanjurl:"",
            lineType:"left",
            infoDatas:[],
            jdorstation:"基地"
        }
    },
    components: {
        WinLine,
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            viewer = new Cesium.Viewer("cesiumContainer", {
                selectionIndicator: false,
                sceneModePicker: false,
                navigationHelpButton: false,
                infoBox: false,
                animation: false,
                timeline: true,
                navigation: false,
                shouldAnimate: true,
                shadows: false,
                terrainShadows: Cesium.ShadowMode.ENABLED
            });
            //viewer.scene.screenSpaceCameraController.enableInputs =false;
            viewer.scene.sun.show = true;
            var shadowMap = viewer.shadowMap;
            shadowMap.softShadows=true;   
            shadowMap.maxmimumDistance = 10000.0;
            viewer.scene.debugShowFramesPerSecond = false;
            var blackMarble = viewer.scene.imageryLayers.addImageryProvider(
                new Cesium.UrlTemplateImageryProvider({
                    url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
                })
            );
            var that = this;
            AddClound(viewer);
            AddEarthMask(viewer);

            addDebuggerTool(viewer);
            this.addDirectLight();
            this.addLeftClick();
            //this.loadScript();
            //addBasePoint(this, viewer);
            //添加全国范围信息
            var baseMapLayer = new Cesium.UrlTemplateImageryProvider({
                url: `${mapServerUrl}/china_province/{z}/{x}/{y}`,
                maximumLevel:11,
            });

            var baseLineLayer = new Cesium.UrlTemplateImageryProvider({
                url: `${mapServerUrl}/province_outline/{z}/{x}/{y}`,
                maximumLevel:11
            });
            baseMapLayer.defaultAlpha = 0.3;
            baseLineLayer.defaultAlpha = 0.8;
            var imageryLayers=[];
            var map1=viewer.imageryLayers.addImageryProvider(baseMapLayer);
            var map2=viewer.imageryLayers.addImageryProvider(baseLineLayer);
            imageryLayers.push(map1);
            imageryLayers.push(map2);
            viewer.scene.camera.changed.addEventListener(function(a,b,c){
                    
                    var height =viewer.camera.positionCartographic.height;
                    if(height<968633.591732347){
                        imageryLayers.forEach(t=>{
                            if(t.show){
                                t.show=false;
                            }
                        })
                    }else{
                        imageryLayers.forEach(t=>{
                            if(!t.show){
                                t.show=true;
                            }
                        })
                    }
            })
            //return;
            //添加电站模型
            var time = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
            viewer.clock.currentTime = time.clone();
            var widget = viewer.cesiumWidget;
            var scene = viewer.scene;

            try {

                var promisegfb = scene.addS3MTilesLayerByScp(`${modelServerUrl}/China_pvModel/gfb/rest/realspace/config`, {
                    name: 'gfb'
                });
                var promiseother = scene.addS3MTilesLayerByScp(`${modelServerUrl}/China_pvModel/othermodels/rest/realspace/config`, {
                    name: 'othermodels'
                });
                var waterpromise = scene.addS3MTilesLayerByScp(`${modelServerUrl}/China_pvModel/water/rest/realspace/config`, {
                    name: 'water'
                });
                Cesium.when.all([promisegfb, promiseother,  waterpromise], function (layers) {
                    //设置光照
                    layers.forEach(layer => {
                        //layer.setLodRangeScale(0.01);
                        layer.shadowType = 2;
                        layer.maxVisibleAltitude = 7000;
                        layer.visibleDistanceMax = 8000;
                    })
                    //默认隐藏时间轴
                    document.getElementsByClassName("cesium-viewer-timelineContainer")[0].style.display="none";
                    //viewer.flyTo(layers[0])
                }, function (e) {
                    if (widget._showRenderLoopErrors) {
                        var title = '渲染时发生错误，已停止渲染。';
                        widget.showErrorPanel(title, undefined, e);
                    }
                });

                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            } catch (e) {
                if (widget._showRenderLoopErrors) {
                    var title = '渲染时发生错误，已停止渲染。';
                    widget.showErrorPanel(title, undefined, e);
                }
            }
        },
        //全国概况视角
        flyToGaik(){
            var that=this;
            if(this.$route.path!="/"){
                viewer.scene.camera.flyTo({
                    "destination":{"x":-3719914.7214529333,"y":9923008.103096997,"z":2961333.5440157317},
                    "orientation":{"pitch":-1.210401948634264,"heading":6.202436309227091,"roll":6.283185307179586},
                    complete: function () {
                            addBasePoint(that, viewer);
                            viewer.scene.screenSpaceCameraController.enableInputs =true;
                            },
                    cancel: function () {
                        addBasePoint(that, viewer);
                        viewer.scene.screenSpaceCameraController.enableInputs =true;
                    }
                })
                return;
            }
            viewer.scene.screenSpaceCameraController.enableInputs =false;
            viewer.scene.camera.flyTo({
                "destination": {
                    "x": -10829776.491277255,
                    "y": 19985595.21536257,
                    "z": 18259897.447910108
                },
                "orientation": {
                    "pitch": -1.5651008359716392,
                    "heading": 6.270711321098824,
                    "roll": 0
                },
                complete: function () {
                    window.setTimeout(function () {
                        //初始定位
                        viewer.scene.camera.flyTo({
                            "destination":{"x":-3719914.7214529333,"y":9923008.103096997,"z":2961333.5440157317},
                            "orientation":{"pitch":-1.210401948634264,"heading":6.202436309227091,"roll":6.283185307179586},
                            complete: function () {
                                addBasePoint(that, viewer);
                            viewer.scene.screenSpaceCameraController.enableInputs =true;

                            },
                            cancel: function () {
                                addBasePoint(that, viewer);
                            viewer.scene.screenSpaceCameraController.enableInputs =true;

                            }
                        });
                    }, 3 * 1000)
                }
            });
        },
        //添加平行光
        addDirectLight() {
            var scene = viewer.scene;
            var position = new Cesium.Cartesian3(-2180765.1825337997, 4379131.271389126, 4092630.162654784);
            var position1 = new Cesium.Cartesian3(-2180878.0519406004, 4378948.067730668, 4092609.6775166253);
            var targetPosition1 = new Cesium.Cartesian3(-2180587.505824384, 4379172.4152414, 4092534.7949573714);
            var options = {
                intensity: 1
            };
            var options1 = {
                targetPosition: targetPosition1,
                intensity: 1
            };
            directionalLight_h1 = new Cesium.DirectionalLight(position1, options1);
            directionalLight_v = new Cesium.DirectionalLight(position, options);
            scene.addLightSource(directionalLight_v);
            scene.addLightSource(directionalLight_h1);
        },
        //移除平行光
        removeDirectLight() {
            return;
            var scene = viewer.scene;
            scene.removeLightSource(directionalLight_v);
            scene.removeLightSource(directionalLight_h1);
        },
        /**
         * @param stop 参数对象包括飞行点位视角，飞行持续时间，停留时间
         * @param index 当前执行是第几个stop，用于返回的参数
         * @param defaultduration 默认飞行持续时间
         */
        doViewStop(stop, index, defaultduration) {
            var that = this;
            return new Promise((resolve, reject) => {
                console.log(stop.name + "执行中")
                if (stop.camera) { //如果有是视角参数则是飞行后在执行脚本，如果没有则直接执行脚本
                    viewer.scene.camera.flyTo({
                        destination: stop.camera.destination,
                        orientation: stop.camera.orientation,
                        duration: (stop.duration && Number(stop.duration) > 0) ? Number(stop.duration) : defaultduration,
                        complete: function () {
                            window.setTimeout(function () {
                                excute();
                            }, 200)
                        },
                        cancel: function () {
                            reject();
                        }
                    })
                } else {
                    excute();
                }

                function excute() {
                    try {
                        /**todo 执行脚本内容 */
                        if (stop.excuteScript) {
                            try {
                                var fun = new Function("viewer", "that", `"use strict";${stop.excuteScript};`);
                                if (scriptstop) {
                                    resolve(index)
                                    return;
                                };
                                fun(viewer, that);
                            } catch (error) {
                                reject(error);
                            }
                        };
                        if (stop.delaytime && Number(stop.delaytime) > 0) {
                            window.setTimeout(function () {
                                resolve(index);
                            }, Number(stop.delaytime) * 1000);
                        } else {
                            resolve(index);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            })
        },
        //加载动态执行的脚本
        loadScript() {
            viewer.dataSources.removeAll();
            var that = this;
            Cesium.loadJson("scripts/gylc.json").then(async (data) => {
                if (data.stops && data.stops.length > 0) {
                    if (scriptDatasource) scriptDatasource.entities.removeAll();
                    else {
                        scriptDatasource = new Cesium.CustomDataSource("scriptDatasource");
                        viewer.dataSources.add(scriptDatasource);
                    }
                    var avgduration = 3;
                    if (data.totalDuration) {
                        avgduration = data.totalDuration / data.stops.length;
                        for (let index = 0; index < data.stops.length; index++) {
                            const stop = data.stops[index];
                            await this.doViewStop(stop, index, avgduration).then(function (i) {
                                if (scriptstop) {
                                    index = data.stops.length;
                                    return
                                }
                                if (data.showLoop && i == data.stops.length - 1) {
                                    index = -1;
                                }
                            }).catch(function (error) {
                                debugger;
                                that.$message(`${error};脚本执行错误`);
                                index = data.stops.length;
                                that.clearScriptSources();
                                return;
                            });

                        }

                    }

                }
            });
        },
        //添加动态的线
        addDymaticPolyline(tablename, duration, where, color) {
            if (color) {
                if (color instanceof Cesium.Color) {
                    color = color
                } else {
                    if (typeof (color) == "string") {
                        color = Cesium.Color.fromCssColorString(color)
                    }
                }
            } else {
                color = Cesium.Color.YELLOW
            }

            this.$axios.get(`${services}/${tablename}/query?${where}returnGeometry=yes&outputsrid=4326`).then(data => {
                //Cesium.loadJson(`scripts/testline.json`).then(data=>{
                var result = formateData(data, 4);
                var start = viewer.clock.currentTime;
                var stop = Cesium.JulianDate.addSeconds(
                    start,
                    Number(duration),
                    new Cesium.JulianDate()
                );
                viewer.clock.startTime = start.clone();
                viewer.clock.stopTime = stop.clone();
                viewer.clock.currentTime = start.clone();
                viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED; //Loop at the end
                viewer.clock.multiplier = 1;
                for (let index = 0; index < result.length; index++) {
                    const fe = result[index];
                    var pathPosition = new Cesium.SampledPositionProperty();
                    for (let i = 0; i < fe.geometry.coordinates.length; i++) {
                        const coord = fe.geometry.coordinates[i];
                        var time = Cesium.JulianDate.addSeconds(
                            start,
                            duration / (fe.geometry.coordinates.length - 1) * i,
                            new Cesium.JulianDate()
                        );
                        pathPosition.addSample(time, Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2]))
                    }

                    var entity = new Cesium.Entity({
                        position: pathPosition,
                        path: {
                            resolution: 1,
                            leadTime: 0,
                            trailTime: 360 * 1000, //360为全程显示路线
                            // material: new Cesium.PolylineGlowMaterialProperty({
                            //     glowPower: 0.5,
                            //     color: color
                            // }),
                            material: color,
                            width: 1.5
                        },
                    })
                    window.setTimeout(() => {
                        //if(!scriptDatasource.isDestroyed())
                        scriptDatasource.entities.add({ // 尾迹线
                            description: 'trail-line',
                            // name: startName + ' -> ' + destinationName + ' ' + migrationNumber + '人',
                            polyline: {
                                width: 5,
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(Array.prototype.concat.apply([], fe.geometry.coordinates)),
                                material: new Cesium.PolylineTrailMaterialProperty({ // 尾迹线材质
                                    color: Cesium.Color.RED,
                                    trailLength: 0.2,
                                    period: 3.0
                                })
                            }
                        });
                    }, duration * 1000)
                    scriptDatasource.entities.add(entity);
                }
            })
        },
        //添加点光源
        addPointLight(lon, lat, height) {
            return;
            var scene = viewer.scene;
            var position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
            var options = {
                color: new Cesium.Color(1, 1, 1, 1),
                cutoffDistance: 100,
                decay: 1,
                intensity: 3
            };
            point_light = new Cesium.PointLight(position, options);
            scene.addLightSource(point_light);
        },
        //移除点光源
        removePointLight() {
            return;
            var scene = viewer.scene;
            point_light && scene.removeLightSource(point_light);
        },
        //脚本添加弹框
        addPoup(lon, lat, height, id) {
            if (!Cesium.defined(lon) || !Cesium.defined(lat)) return;
            var entity = new Cesium.Entity({
                position: Cesium.Cartesian3.fromDegrees(lon, lat, Cesium.defaultValue(height, 0))
            })
            scriptDatasource && scriptDatasource.entities.add(entity);
            entityPoup.forEach(t => {
                t.rset();
                t = null;
            })
            this.$nextTick(() => {
                var p = new poup();
                p.showTrackWithEntity(entity, viewer, id ? id : "id_showAttr");
                entityPoup.push(p);
            })
        },
        //升压站到高压电线的流动曲线
        addcuvrepolylineSy() {
            var that=this;
            [{
                coordinates: [119.55972023076049, 33.18313177941241,21.093161387585106],
                linecolor: "",
                trailcolor: ""
            }, {
                coordinates: [119.55974057017573, 33.18319632150374,21.093161387585106],
                linecolor: "",
                trailcolor: ""
            }, {
                coordinates: [119.55973521517336, 33.183177465135905,21.093161387585106],
                linecolor: "",
                trailcolor: ""
            }].forEach(t => {

                var option = {
                    endpoint: t.coordinates,
                    datas: [[119.559962043045, 33.1826797099133,3.5]],
                    linecolor:t.linecolor?t.linecolor: Cesium.Color.fromRandom({
                        alpha: 1
                    }),
                    trailcolor:t.trailcolor?t.trailcolor: Cesium.Color.fromRandom({
                        alpha: 1
                    })
                };
                that.addcuvrepolyline(option,scriptDatasource);
            })
        },
        //改变场景的颜色
        changeModelColor(flag) {
            var layer = viewer.scene.layers.find("gfb")
            if (!layer) return;
            var othermodels = viewer.scene.layers.find("othermodels");
            if (othermodels) {
                othermodels.brightness = 1.5
            }
            if (flag) {
                if (!blackImagelayer) {
                    blackImagelayer = viewer.imageryLayers.addImageryProvider(
                        new Cesium.SingleTileImageryProvider({
                            url: "img/map/world.jpg"
                        }));
                }
                this.removeDirectLight();
                var scene = viewer.scene;
                scene.sun.show = false;
                scene.globe.enableLighting = false;
                scene.lightSource._ambientLightColor = new Cesium.Color(0.4, 0.4, 0.4, 0.4);
                viewer.imageryLayers.raiseToTop(blackImagelayer);
                var start = viewer.clock.currentTime;
                var stop = Cesium.JulianDate.addSeconds(
                    start,
                    5,
                    new Cesium.JulianDate()
                );
                viewer.clock.startTime = start.clone();
                viewer.clock.stopTime = stop.clone();
                viewer.clock.currentTime = start.clone();
                viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED; //Loop at the end
                viewer.clock.multiplier = 1;
                var colorProperty = new Cesium.SampledProperty(Cesium.Color);
                colorProperty.addSample(start, Cesium.Color.CORNFLOWERBLUE);
                colorProperty.addSample(
                    stop,
                    Cesium.Color.CORNFLOWERBLUE.withAlpha(0.2)
                );
                var callback = new Cesium.CallbackProperty(function (a, b, c) {
                    var nowcolor = colorProperty.getValue(a);
                    if (!Cesium.defined(nowcolor))
                        return Cesium.Cartesian3.fromDegrees(0, 0);
                    var color = new Cesium.Color(
                        nowcolor.red,
                        nowcolor.green,
                        nowcolor.blue,
                        nowcolor.alpha
                    );
                    //TODO 设置光伏板图层的透明度，颜色之类的
                    layer.style3D.fillForeColor = color;
                    return Cesium.Cartesian3.fromDegrees(0, 0);
                }, false);
                var entity = new Cesium.Entity({
                    position: callback,
                    point: {
                        color: colorProperty
                    }
                });
                scriptDatasource.entities.add(entity);

            } else {
                if (blackImagelayer) {
                    viewer.imageryLayers.lowerToBottom(blackImagelayer);
                }
                //TODO 去除光伏板图层的颜色
                layer.style3D.fillForeColor = new Cesium.Color(1, 1, 1, 1);
                othermodels.brightness = 1.0;
            }
        },
        //清除脚本执行完毕后的资源
        clearScriptSources() {
            entityPoup.forEach(t => {
                t.rset();
                t = null;
            });
            this.showFloorWin = false;
            if (scriptDatasource) scriptDatasource.entities.removeAll();
            this.changeModelColor(false);
            //this.addDirectLight();
        },
        //添加方阵面
        addFzPolygon() {
            this.$axios.get(services + "/fzfw/query?&returnGeometry=yes&outputsrid=4326").then(function (result) {
                var data = formateData(result, 1);
                var _geometryInstances = [];
                var _geometryoutlineInstances = [];
                for (let index = 0; index < data.length; index++) {
                    const fe = data[index];
                    var positions = Array.prototype.concat.apply([], fe.geometry.coordinates[0]);
                    var polygoninstance = new Cesium.GeometryInstance({
                        geometry: new Cesium.PolygonGeometry({
                            polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(positions)),
                            perPositionHeight: true,
                            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
                        }),
                        attributes: {
                            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
                                alpha: 0.4
                            }))
                        }
                    });
                    _geometryInstances.push(polygoninstance);
                }
                var polygonsprimitive = new Cesium.Primitive({
                    geometryInstances: _geometryInstances,
                    appearance: new Cesium.PerInstanceColorAppearance()
                })

                polygonsprimitive["clear"] = true;
                viewer.scene.primitives.add(polygonsprimitive);
            })
        },
        //移除方阵面
        removeFzPolygon() {
            viewer.scene.primitives._primitives.forEach(t => {
                if (Cesium.defined(t.clear)) {
                    if (!t.isDestroyed()) {
                        if (t instanceof Cesium.PrimitiveCollection || t instanceof Cesium.BillboardCollection) {
                            t.removeAll();
                        } else {
                            if (!t.isDestroyed()) {
                                viewer.scene.primitives.remove(t);
                            }
                        }
                    }
                }
            })
        },
        //展示或者隐藏光资源图层
        showResourceLayer(flag) {
            if (flag) {
                addHeatMapServer(viewer);
            } else {
                removeHeatMapServer(viewer);
            }
        },
        show3dBar(realdatas,gettulicolor,unit,closeflag) {

            var sourcesname = "3dbars"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                //
                if(closeflag){
                    viewer.dataSources.remove(datasource);
                    return;
                }else{
                    datasource.entities.removeAll();
                }
            } else {
                hideall();
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            //this.$axios.get(`${services}/jddw/query?&returnGeometry=yes&outputsrid=4326`).then(result=>{
            var that = this;
            this.$axios.get(`${services}/alljdfw/query?&returnGeometry=yes&outputsrid=4326&where=批次='3批次'`).then(result => {
                var data = formateData(result);
                //addBarChart(viewer,data);
                return data;
            }).then((polygons) => {
                that.$axios.get(`${services}/jddw/query?&returnGeometry=yes&outputsrid=4326&where=批次='第3批次'`).then(result => {
                    var data = result.features;
                    for (let i = 0; i < data.length; i++) {
                        var fe = polygons.firstOrDefault(t => t.properties.jd_name == data[i].properties.name);
                        var base=realdatas.firstOrDefault(function(t){
                           return `${t.name}光伏基地`==data[i].properties.name
                        })
                        if(!base) return;
                        var  value=Number(base.value);
                        //TODO 根据图例的值来获取颜色以及图例的最大值和最小值
                        var obj=gettulicolor(value);
                        if (fe) {
                            //var height = randomNum(20000, 50000) + 20000;
                            var height = (1+(value-obj.min)/(obj.max-obj.min))*350000;
                            // var color = Cesium.Color.fromRandom({
                            //     alpha: 1
                            // });
                            var color=obj.color;
                            if(color instanceof Cesium.Color){
                               color=color;
                            }else{
                                 if(typeof color=="string") {
                                    color=Cesium.Color.fromCssColorString(color);
                                }else{
                                    color= Cesium.Color.fromRandom({
                                        alpha: 1
                                    });
                                }
                            }
                            // color=color.withAlpha(0.5);
                            var pos = Array.prototype.concat.apply([], fe.geometry.coordinates[0])
                            datasource.entities.add({
                                polygon: {
                                    hierarchy: Cesium.Cartesian3.fromDegreesArray(pos),
                                    //extrudedHeight: height,
                                    fill: true,
                                    material: color.withAlpha(0.7),
                                    outline: false
                                },
                                box:{
                                    dimensions:new Cesium.Cartesian3(50000,50000,height),
                                    material:color.withAlpha(0.7),
                                    outline:true,
                                    outlineColor:color
                                },
                                 position:Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]),
                            })
                            datasource.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1], height*0.5),
                                label: {
                                    text: data[i].properties.name+"\r\n"+value+unit,
                                    font: '16px sans-serif',
                                    fillColor: color,
                                    pixelOffset: new Cesium.Cartesian2(0, -8),
                                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                    outlineColor: Cesium.Color.WHITE
                                    //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
                                }
                            });
                        }
                    }
                });
            })

        },
        showAnalyse(gettulicolor) {
            var realdatas= [
                {
                    "name": "大同",
                    "value": "240.03"
                }, {
                    "name": "寿阳",
                    "value": "250.77"
                }, {
                    "name": "渭南",
                    "value": "255.96"
                }, {
                    "name": "达拉特",
                    "value": "250.96"
                }, {
                    "name": "长治",
                    "value": "251.96"
                }, {
                    "name": "铜川",
                    "value": "235.96"
                }
            ]
            var sourcesname = "3dbars"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                //viewer.dataSources.removeAll();
                hideall();
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            //this.$axios.get(`${services}/jddw/query?&returnGeometry=yes&outputsrid=4326`).then(result=>{
            var that = this;
            this.$axios.get(`${services}/alljdfw/query?&returnGeometry=yes&outputsrid=4326&where=批次='3批次'`).then(result => {
                var data = formateData(result);
                //addBarChart(viewer,data);
                return data;
            }).then((polygons) => {
                that.$axios.get(`${services}/jddw/query?&returnGeometry=yes&outputsrid=4326&where=批次='第3批次'`).then(result => {
                    var data = result.features;
                    for (let i = 0; i < data.length; i++) {
                        var fe = polygons.firstOrDefault(t => t.properties.jd_name == data[i].properties.name);
                        var base=realdatas.firstOrDefault(function(t){
                           return `${t.name}光伏基地`==data[i].properties.name
                        })
                        if(!base) continue;
                        var  value=Number(base.value);
                        //TODO 根据图例的值来获取颜色以及图例的最大值和最小值
                        var obj=gettulicolor(value);
                        if (fe) {
                            //var height = randomNum(20000, 50000) + 20000;
                            var height = (1+(value-obj.min)/(obj.max-obj.min))*35000;
                            // var color = Cesium.Color.fromRandom({
                            //     alpha: 1
                            // });
                            var color=obj.color;
                            if(color instanceof Cesium.Color){
                               color=color;
                            }else{
                                 if(typeof color=="string") {
                                    color=Cesium.Color.fromCssColorString(color);
                                }else{
                                    color= Cesium.Color.fromRandom({
                                        alpha: 1
                                    });
                                }
                            }
                            // color=color.withAlpha(0.5);
                            var pos = Array.prototype.concat.apply([], fe.geometry.coordinates[0])
                            datasource.entities.add({
                                polygon: {
                                    hierarchy: Cesium.Cartesian3.fromDegreesArray(pos),
                                    extrudedHeight: height,
                                    fill: true,
                                    material: color.withAlpha(0.5),
                                    outline: false
                                },
                                // box:{
                                //     dimensions:new Cesium.Cartesian3(50000,50000,height),
                                //     material:color.withAlpha(0.5),
                                //     outline:true,
                                //     outlineColor:color
                                // },
                                 position:Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]),
                            })
                            datasource.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1], height-35000),
                                label: {
                                    text: data[i].properties.name,
                                    font: '16px sans-serif',
                                    fillColor: color,
                                    //pixelOffset: new Cesium.Cartesian2(0, -8),
                                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                    outlineColor: Cesium.Color.WHITE
                                    //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
                                }
                            });
                        }
                    }
                    viewer.scene.camera.flyTo({
                        "destination": {
                            "x":-2123644.1825519945,
                            "y":5763808.626234414,
                            "z":3501627.9180903463
                        },
                        "orientation": {
                            "pitch":-0.764072375329969,
                            "heading":0.08483884810786435,
                            "roll":6.283185307179586
                        }
                    });
                });
            })

        },
        getViewer(){
            return viewer;
        },
        addLeftClick() {
            var that = this;
            var selehandle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            selehandle.setInputAction(function (click) {
                var pickedFeature = viewer.scene.pick(click.position);
                if (!Cesium.defined(pickedFeature)) {
                    var position = viewer.scene.pickPosition(click.position);
                    var wgs84 = Cesium.Cartographic.fromCartesian(position);
                    var lon = Cesium.Math.toDegrees(wgs84.longitude);
                    var lat = Cesium.Math.toDegrees(wgs84.latitude);
                    that.selectModelLayer(lon,lat,wgs84.height);
                    return;
                    }
                var entity = pickedFeature.id;
                if (!Cesium.defined(entity))return;
                if (!entity.properties) return;
                if (entity.properties.baseimg) {
                    that.jdorstation='基地';
                    that.showBaseInfoObj.name = entity.properties.name.getValue();
                    var propertiesnames = ["总装机", "并网时间", "建设时间", "批次"]
                    var attr = [];
                    for (let index = 0; index < propertiesnames.length; index++) {
                        const proname = propertiesnames[index];
                        attr.push({
                            title: proname,
                            value: entity.properties[proname].getValue()
                        })
                    }
                    that.showBaseInfoObj.data = attr;
                    that.showBaseInfo = true;
                    that.$nextTick(() => {
                        var p = new poup();
                        p.showTrackWithEntity(entity, viewer, "base_win");
                        entityPoup.push(p);
                    })
                }
                //电站点击
                if (entity.properties.station) {
                    that.jdorstation='电站';
                    that.showBaseInfoObj.name = entity.properties.name.getValue();
                    var propertiesnames = ["电站简称","装机容量", "逆变器数量", "实时功率", "累计发电量","上网电价"]
                    var attr = [];
                    for (let index = 0; index < propertiesnames.length; index++) {
                        const proname = propertiesnames[index];
                        attr.push({
                            title: proname,
                            value: entity.properties[proname].getValue()
                        })
                    }
                    that.showBaseInfoObj.data = attr;
                    that.showBaseInfo = true;
                    that.$nextTick(() => {
                        var p = new poup();
                        p.showTrackWithEntity(entity, viewer, "base_win");
                        entityPoup.push(p);
                    })
                }
                //720图标点击
                if (entity.properties.picPoint) {
                    console.log(`${picServer}/${entity.properties.num._value}号电站`);
                    that.showquanjing=true;
                    that.$nextTick(()=>{
                         that.quanjurl=`${picServer}/${entity.properties.num._value}号电站`;
                    })
                   
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        },
        selectModelLayer(lon,lat,height){
            var modellayer=viewer.scene.layers.find("othermodels");
            if(!modellayer) return
            var that=this;
            window.setTimeout(function(){
                var ids=modellayer.getSelection();
                if(!ids||ids.length==0) {
                    modellayer.releaseSelection();
                    that.showFloorWin=false;
                    entityPoup.forEach(t => {
                        t.rset();
                        t = null;
                    });
                    return;
                };
                var objid=ids[0];
                var data={};
                if(objid==15){//升压站
                    that.showAttrDataObj={name:'升压站',data:[{title:'正向有功电量',value:'17510万kWh'},{title:'反向有功电量',value:'52679000万kWh'},{title:'正向无功电量',value:'133kvarh'},{title:'反向无功电量',value:'5267kvarh'}]};
                }else if(objid==22||objid==30||objid==27||objid==21||objid==20){//箱变
                    that.showAttrDataObj={name:'箱变',data:[{title:'直流功率',value:'532.9W'},{title:'交流功率',value:'517.5W'},{title:'日发电量',value:'742.05kWh'},{title:'转换效率',value:'98.98%'}]};
                }else return;
            if (!Cesium.defined(lon) || !Cesium.defined(lat)) return;
            var entity = new Cesium.Entity({
                position: Cesium.Cartesian3.fromDegrees(lon, lat, Cesium.defaultValue(height, 0))
            });
            viewer.entities.add(entity);
            entityPoup.forEach(t => {
                t.rset();
                t = null;
            });
            that.showFloorWin=true;
            that.$nextTick(() => {
                var p = new poup();
                p.showTrackWithEntity(entity, viewer, "id_showAttr");
                entityPoup.push(p);
            })

            },300)

        },
        //关闭基地页面的弹窗
        closeattriPoup() {
            this.showBaseInfo = false;
            entityPoup.forEach(t => {
                t.rset();
                t = null;
            })
        },
        //定位到基地
        goToBase() {
            if(this.jdorstation=="电站"){
                this.goToStation();
                this.showBaseInfo=false;
                return;
            }           
            viewer.scene.camera.flyTo({
                "destination":{"x":-2641826.448243903,"y":4655568.522876071,"z":3482158.0524856844},
                "orientation":{
                "pitch":-0.3490044042645848,"heading":0.11228149537243937,"roll":5.749178910718911e-12},
                complete:function(){

                }
                });
            this.$parent.changeposition("宝应光伏基地");
            var that = this;
            this.routerPath('/stationDetail');
            this.showStationPolygon();
            this.closeattriPoup();
            this.loadBasecurveline();
        },
        //加载基地的数据迁徙图
        loadBasecurveline(){
            var that=this;
            var sourcesname = "gotobase"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            this.$axios.get(`${services}/电站点位/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                var data = formateData(result);
                for (let i = 0; i < data.length; i++) {
                    var pro=data[i].properties;
                    pro["station"]=true;
                    datasource.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1], 500),
                        label: {
                            text: data[i].properties.电站简称,
                            font: '16px sans-serif',
                            fillColor: Cesium.Color.YELLOW,
                            pixelOffset: new Cesium.Cartesian2(0, -50),
                            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                            //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            //outlineColor: Cesium.Color.WHITE
                            //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
                        },
                        billboard : {
                            image : "3dpachage/Cesium/Widgets/Images/base/电站.png", // default: undefined
                            show : true, // default
                            scale : 1, // default: 1.0
                            pixelOffset : new Cesium.Cartesian2(0, 0),
                        },
                        properties:new Cesium.PropertyBag(pro)
                    });

                }
                return data
            }).then(stations => {
                that.$axios.get(`${services}/升压站/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                    var data = formateData(result);
                    for (let index = 0; index < data.length; index++) {
                        const fe = data[index];
                        datasource.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0], fe.geometry.coordinates[1], 500),
                            label: {
                                text: "升压站",
                                font: '16px sans-serif',
                                fillColor: Cesium.Color.YELLOW,
                                pixelOffset: new Cesium.Cartesian2(0, -8),
                                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                                //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                //outlineColor: Cesium.Color.WHITE
                            }
                        });
                        var option = {
                            endpoint: fe.geometry.coordinates,
                            datas: [],
                            linecolor: Cesium.Color.YELLOW,
                            trailcolor: Cesium.Color.YELLOW
                        };
                        if (fe.properties.gid == '1') {
                            var station = stations.firstOrDefault(t => t.properties.gid == "1");
                            if (station) {
                                option.datas.push(station.geometry.coordinates);
                            }
                        } else if (fe.properties.gid == "2") {
                            var station = stations.firstOrDefault(t => t.properties.gid == "4");
                            if (station) {
                                option.datas.push(station.geometry.coordinates);
                            }
                        } else {
                            var st = stations.where(t => t.properties.gid != '1' && t.properties.gid != '4');
                            st.forEach(t => {
                                option.datas.push(t.geometry.coordinates);
                            })
                        }
                        that.addcuvrepolyline(option, datasource);
                    }

                    that.$axios.get(`${services}/汇集站/query?&returnGeometry=yes&outputsrid=4326`).then(re => {
                        var t = formateData(re);
                        for (let index = 0; index < t.length; index++) {
                            const fe = t[index];
                            datasource.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0], fe.geometry.coordinates[1], 500),
                                label: {
                                    text: "汇集站",
                                    font: '16px sans-serif',
                                    fillColor: Cesium.Color.LIME,
                                    pixelOffset: new Cesium.Cartesian2(0, -8),
                                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                                    //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                    //outlineColor: Cesium.Color.WHITE
                                }
                            });
                            var option = {
                                endpoint: fe.geometry.coordinates,
                                datas: [],
                                linecolor: Cesium.Color.LIME,
                                trailcolor: Cesium.Color.LIME
                            };
                            data.forEach(t => {
                                option.datas.push(t.geometry.coordinates);
                            })
                            that.addcuvrepolyline(option, datasource);
                        }
                    })

                })
            })
        },
        loadfdlxss(datas){
            var sourcesname = "fdlxss"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            var that=this;
            //this.addFzPolygon();
            datas.forEach((station,k)=>{
                 that.$axios.get(`${services}/电站点位/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                     var re=formateData(result);
                     for (let index = 0; index < re.length; index++) {
                         const fe = re[index];
                         var data=station[index];
                         var value=Number(data.value);
                         if(k==0){
                             value=value/10;
                         }
                         var colorobj=getfdlBarColor(value);
                         var height = (1+(value-colorobj.min)/(colorobj.max-colorobj.min))*1500;
                        var color=colorobj.color;
                        if(color instanceof Cesium.Color){
                        color=color;
                        }else{
                            if(typeof color=="string") {
                                color=Cesium.Color.fromCssColorString(color);
                            }else{
                                color= Cesium.Color.fromRandom({
                                    alpha: 1
                                });
                            }
                        }
                        if(k==0){
                            datasource.entities.add({
                             position:Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1],0),
                            //   label: {
                            //     text: data.name,
                            //     font: '16px sans-serif',
                            //     fillColor: Cesium.Color.YELLOW,
                            //     pixelOffset: new Cesium.Cartesian2(0, -8),
                            //     scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),                             
                            // },
                            point:{
                                  color: Cesium.Color.GREEN,
                                  pixelSize: 5
                             },
                            box:{
                                dimensions:new Cesium.Cartesian3(200,200,height),
                                fill:true,
                                material:color.withAlpha(0.4)
                            }
                         })
                          datasource.entities.add({
                             position:Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1],height*0.5),
                              label: {
                                text: data.value+"万kWh",
                                font: '16px sans-serif',
                                fillColor: Cesium.Color.YELLOW,
                                //pixelOffset: new Cesium.Cartesian2(0, -8),
                                //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),                             
                            },                          
                         })
                        }else 
                        {
                            var resultcar=new Cesium.Cartesian3(0,0,0); 
                            var pos=Cesium.Cartesian3.add(Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1],0),new Cesium.Cartesian3(0,740,0),resultcar);
                             datasource.entities.add({
                             position:pos,
                            cylinder:{
                                length:height,
                                topRadius:200,
                                bottomRadius:200,
                                fill:true,
                                material:color.withAlpha(0.4)
                            }
                         })
                        var wgs84 = Cesium.Cartographic.fromCartesian(pos);
                        var lon = Cesium.Math.toDegrees(wgs84.longitude);
                        var lat = Cesium.Math.toDegrees(wgs84.latitude);
                        datasource.entities.add({
                             position:Cesium.Cartesian3.fromDegrees(lon,lat,height*0.75),
                              label: {
                                text: data.value+"小时",
                                font: '16px sans-serif',
                                fillColor: Cesium.Color.YELLOW,
                                // pixelOffset: new Cesium.Cartesian2(0, -8),
                                // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),                             
                            },

                         })
                        }
                         
                     }
                 })               
            })
        },
         loadnxb(datas){
            var sourcesname = "NengXB"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            var that=this;
            that.$axios.get(`${services}/电站点位/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                var re=formateData(result);
                for (let index = 0; index < re.length; index++) {
                    const fe = re[index];
                    var data=datas[index];
                    var value=Number(data.value);
                    var color=Cesium.Color.fromCssColorString("#ff7b2c");
                    var height = (1+(value/100))*1500;                
                    datasource.entities.add({
                        position:Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1],0),
                        box:{
                            dimensions:new Cesium.Cartesian3(200,200,height),
                            fill:true,
                            material:color.withAlpha(0.4)
                        }
                    })
                    datasource.entities.add({
                        position:Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1],height*0.5),
                        label: {
                        text: data.value+"%",
                        font: '16px sans-serif',
                        fillColor: Cesium.Color.YELLOW,
                        //pixelOffset: new Cesium.Cartesian2(0, -8),
                        //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),                             
                    },                          
                    })
                
                    
                }
            })               
            
        },
        //进入电站
        goToStation()
        {
            var _this=this;
            //定位
            viewer.scene.camera.flyTo({
                "destination": {
                    "x":-2633713.431411791,
                    "y":4643894.922906188,
                    "z":3490343.573081011
                },
                "orientation": {
                    "pitch":-0.4610556218661275,
                    "heading":0.11012823336047095,
                    "roll":6.283185307112252
                },
                complete: function () {
                    show720Point();

                },
                cancel: function () {
                    show720Point();
                }
            });

            function show720Point(){
                var sourcesname = "720Point";
                var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
                if (datasource) {
                    viewer.dataSources.remove(datasource);
                    return;
                } else {
                    datasource = new Cesium.CustomDataSource(sourcesname);
                    viewer.dataSources.add(datasource);
                }
                _this.$axios(`${services}/全景图点位/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                    var data = formateData(result);
                    for (let i = 0; i < data.length; i++) {
                        var fe = data[i];
                        if (fe) {
                            var pro=fe.properties;
                            pro["picPoint"]=true;
                            pro["num"]=i+1;
                            datasource.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0],fe.geometry.coordinates[1], 10),
                                billboard : {
                                    image : "3dpachage/Cesium/Widgets/Images/base/720.png", // default: undefined
                                    show : true, // default
                                    scale : 0.5, // default: 1.0
                                    pixelOffset : new Cesium.Cartesian2(0, 0),
                                },
                                properties:new Cesium.PropertyBag(pro)
                            })
                        }
                    }
                })
            }
        },
        showStationPolygon() {
            var sourcesname = "stationpolygon"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            var colors=["#4aa0ff","#ffb94a","#4affac","#75c12c","#94bb94"]
            this.$axios(`${services}/电站范围/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                var data = formateData(result);
                for (let i = 0; i < data.length; i++) {
                    var fe = data[i];
                    if (fe) {
                        // var color = Cesium.Color.fromAlpha(
                        //     Cesium.Color.GOLD,
                        //     0.1
                        // );
                        var color=Cesium.Color.fromCssColorString(colors[i]);
                        var pos = Array.prototype.concat.apply([], fe.geometry.coordinates[0])
                        datasource.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArray(pos),
                                extrudedHeight: 5,
                                fill: true,
                                material: color.withAlpha(0.3),
                                outline: true,
                                outlineWidth:2,
                                //outlineColor:color
                                outlineColor:new Cesium.PolylineGlowMaterialProperty({
                                    color:color,
                                }),
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(7000, 50000)
                            },
                        })
                    }
                }
                // viewer.flyTo(datasource);
            })
        },
        showTypePolygon() {
            var _this=this;
            _this.infoDatas=[];
            var sourcesname = "typepolygon"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                entityPoup.forEach(t => {
                    t.rset();
                    t = null;
                })
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            this.$axios(`${services}/fzfw/query?&returnGeometry=yes&outputsrid=4326`).then(result => {
                var data = formateData(result);
                for (let i = 0; i < data.length; i++) {
                    var fe = data[i];
                    if (fe) {
                        var color = Cesium.Color.fromAlpha(
                            Cesium.Color.DEEPSKYBLUE,
                            0.5
                        );
                        if(fe.properties.gid==1||fe.properties.gid==2)
                        {
                            color = Cesium.Color.fromAlpha(
                                Cesium.Color.LIME,
                                0.5
                            );
                        }
                        var pos = Array.prototype.concat.apply([], fe.geometry.coordinates[0])
                        datasource.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArray(pos),
                                extrudedHeight: 20,
                                fill: true,
                                material: color,
                                outline: true,
                                outlineWidth:2,
                                //outlineColor:color
                                outlineColor:new Cesium.PolylineGlowMaterialProperty({
                                    color:color,
                                })
                                //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(7000, 50000)
                            },
                        })
                    }
                }
                _this.infoDatas.push(
                    {
                        showAttrDataObj: {
                            name: "组件类型",
                            data: [{
                                title: "SUN20-KTL-H2",
                                value: "4350个"
                            }]
                        },
                        lineType:"left",
                        id:"id_infos1"
                    }
                )
                _this.addPoup(119.56144165875966,33.1846750932592,-0.15625184043556975,"id_infos1");
                _this.infoDatas.push(
                    {
                        showAttrDataObj: {
                            name: "组件类型",
                            data: [{
                                title: "SUN20--H2",
                                value: "1200个"
                            }]
                        },
                        lineType:"right",
                        id:"id_infos2"
                    }
                )
                _this.addPoup(119.559152142757,33.1854000959377,0,"id_infos2");
                viewer.scene.camera.flyTo({
                    "destination":{"x":-2633686.1754986043,"y":4645317.563106807,"z":3489878.6575473626},
                    "orientation":{"pitch":-0.5058365940905007,"heading":0.3307477790782576,"roll":6.2831853071784245}
                })
            })
        },
        //添加流动线条
        addcuvrepolyline(options, datasource) {
            var geocoords = options.datas;
            var endpoint = options.endpoint;
            var linecolor = options.linecolor;
            var trailcolor = options.trailcolor;
            var source = datasource ? datasource : viewer;
            //设置开始结束点颜色
            var sPointColor=options.spoincolor?options.spoincolor:new Cesium.Color(255 / 255, 249 / 255, 0, 1);
            var ePointColor=options.epoincolor?options.epoincolor:new Cesium.Color(251 / 255, 7 / 255, 0, 0.7);
            for (var i = 0; i < geocoords.length; i++) {
                var pro = geocoords[i];
                var start = Cesium.Cartesian3.fromDegrees(pro[0], pro[1],pro.length>2?pro[2]:undefined);
                var end = Cesium.Cartesian3.fromDegrees(endpoint[0], endpoint[1],endpoint.length>2?endpoint[2]:undefined);
                var curLinePointsArr = generateCurve(start, end);
                source.entities.add({ // 背景线
                    description: 'background-line',
                    // name: startName + ' -> ' + destinationName + ' ' + migrationNumber + '人',
                    polyline: {
                        width: 1,
                        positions: curLinePointsArr,
                        material: linecolor
                        // material: new Cesium.PolylineGlowMaterialProperty({
                        //     color:linecolor,
                        //     glowPower:0.1
                        // })
                    }
                });

                source.entities.add({ // 尾迹线
                    description: 'trail-line',
                    // name: startName + ' -> ' + destinationName + ' ' + migrationNumber + '人',
                    polyline: {
                        width: 5,
                        positions: curLinePointsArr,
                        material: new Cesium.PolylineTrailMaterialProperty({ // 尾迹线材质
                            color: trailcolor,
                            trailLength: 0.2,
                            period: 5.0
                        })
                    }
                });

                source.entities.add({ // 起点
                    description: 'start-point',
                    // name: startName,
                    position: Cesium.Cartesian3.fromDegrees(pro[0], pro[1],pro.length>2?pro[2]:undefined),
                    point: {
                        color: sPointColor,
                        pixelSize: 5
                    }
                });

                source.entities.add({ // 终点
                    description: 'end-point',
                    // name: destinationName,
                    position: Cesium.Cartesian3.fromDegrees(endpoint[0], endpoint[1],endpoint.length>2?endpoint[2]:undefined),
                    point: {
                        color: ePointColor,
                        pixelSize: 10
                    }
                });
            }
        },
        //添加外送消纳
        addAbsorptiveLine()
        {
            var sourcesname = "absorptiveLine"
            var datasource = viewer.dataSources._dataSources.firstOrDefault(t => t.name == sourcesname);
            if (datasource) {
                viewer.dataSources.remove(datasource);
                return;
            } else {
                datasource = new Cesium.CustomDataSource(sourcesname);
                viewer.dataSources.add(datasource);
            }
            // viewer.scene.camera.flyTo({"destination":{"x":-2647013.3140978403,"y":4660074.97319042,"z":3481023.3751981054},
            // "orientation":{"pitch":-0.45812407015742185,"heading":6.246841970672742,"roll":0.00018198218409803957}
            // });
            var that=this;

            this.closeattriPoup();
            this.$axios.get(`${services}/jddw/query?&returnGeometry=yes&outputsrid=4326`).then(result=>{
                var data=formateData(result);
                return data
            }).then(stations=>{
                that.$axios.get(`${services}/基地消纳点/query?&returnGeometry=yes&outputsrid=4326`).then(result=>{
                    var data=formateData(result);
                    for (let index = 0; index < data.length; index++) {
                        const fe = data[index];
                        datasource.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(fe.geometry.coordinates[0], fe.geometry.coordinates[1], 500),
                            label: {
                                text: "",
                                font: '16px sans-serif',
                                fillColor: Cesium.Color.CORAL,
                                pixelOffset: new Cesium.Cartesian2(0, -8),
                                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.2, 2.6e7, 0.3),
                                //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                //outlineColor: Cesium.Color.WHITE
                            }
                        });
                        var option={
                            endpoint:fe.geometry.coordinates,
                            datas:[],
                            linecolor:Cesium.Color.LIGHTGREEN,
                            trailcolor:Cesium.Color.AQUA,
                            spoincolor:Cesium.Color.TURQUOISE,
                            epoincolor:Cesium.Color.MEDIUMSPRINGGREEN
                        };
                        for(var i=0;i<stations.length;i++)
                        {
                            if(stations[i].properties.name==fe.properties.所属基地)
                            {
                                option.datas.push(stations[i].geometry.coordinates);
                                break;
                            }
                        }
                        that.addcuvrepolyline(option,datasource);
                    }
                })
            })
        },
        //显示时间轴控制
        showTimeLine()
        {
            var timeDiv=document.getElementsByClassName("cesium-viewer-timelineContainer")[0];
            if(timeDiv.style.display=="none")
            {
                timeDiv.style.display="";
                viewer.shadows=true;
            }else{
                timeDiv.style.display="none"
                viewer.shadows=false;
            }
            this.$parent.toggleLeft();
            this.$parent.toggleRight();
        }
    },
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%
}
.rkey-mapwin {
    position: absolute;
    top: 100px;
    left: 50%;
    z-index: 9999;
    background: rgba(24, 32, 46, .9);
    border: 1px solid rgba(255, 255, 255, .4);
    min-width: 270px;
    min-height: 100px;
    padding: 10px 15px 10px 0;

    &::before,
    &::after {
        content: "";
        display: inline-block;
        background: url("/img/info-window/bg.png")no-repeat;
        width: 30px;
        height: 30px;
        position: absolute;
        top: -2px;
        left: -2px;
        z-index: 10000;
    }

    &::after {
        content: "";
        right: -2px;
        left: auto;
        background: url("/img/info-window/bg.png")no-repeat right top;
    }

    .attr-header {
        display: flex;

        .attr-head-name {
            flex: 1;

            .attr-head-flex {
                display: flex;
                width: 100%;

                span {
                    line-height: 24px;
                    height: 24px;
                    display: inline-block;
                    padding-right: 2em;
                    color: #fff;
                    min-width: 120px;
                    font-size: 14px;
                    padding-left: 15px;
                    background: url("/img/info-window/hearder-border-l.png")no-repeat right bottom;
                    max-width: 220px;
                    overflow: hidden;
                    white-space: nowrap;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    position: relative;
                    box-sizing: border-box;

                    &::before {
                        position: absolute;
                        width: calc(100% - 20px);
                        left: 8px;
                        right: 10px;
                        height: 18px;
                        top: 3px;
                        content: "";
                        z-index: -1;
                        background: url("/img/info-window/hearder-bg.png")no-repeat right top;
                    }
                }

                i {
                    flex: 1;
                    content: "";
                    margin-left: -2px;
                    background: url("/img/info-window/hearder-border-r.png")no-repeat top;
                }
            }

        }

        .attr-close {
            width: 26px;
            height: 26px;
            cursor: pointer;
            z-index: 19999;
            background: url("/img/info-window/close.png")no-repeat center center;

            &:hover {
                opacity: .9;
            }
        }
    }

    .attr-content {
        padding-left: 10px;
        &::before,
        &::after {
            content: "";
            display: inline-block;
            background: url("/img/info-window/bg.png")no-repeat bottom left;
            width: 30px;
            height: 30px;
            position: absolute;
            bottom: -2px;
            left: -2px;
            z-index: 10000;
        }

        &::after {
            content: "";
            right: -2px;
            left: auto;
            background: url("/img/info-window/bg.png")no-repeat right bottom;
        }

        .attr-table {
            display: table;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;

            .atrr-row {
                display: table-row;
                width: 100%;
                height: 36px;
                box-sizing: border-box;

                span,
                label {
                    display: table-cell;
                    padding: 5px 0;
                    line-height: 26px;
                    color: #fff;
                    border-bottom: 1px solid rgba(255, 255, 255, .2);
                }

                span {
                    text-align: right;
                }

                label {
                    font-weight: normal;
                    text-align: left;
                }
            }
        }
    }
}
.toStation{
    background: #009795;
    background: -webkit-gradient(linear, left top, right top, from(#0e9880), to(#075c6a));
    background: linear-gradient(left, #0e9880, #075c6a);
    background: -moz-linear-gradient(left, #0e9880, #075c6a);
    color: #fff;
    padding: 10px 0;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    line-height: 14px;
    margin: 10px;
    width: calc(100% - 20px);
}
// #id_showAttr {
//     position: absolute;
// }
</style>
