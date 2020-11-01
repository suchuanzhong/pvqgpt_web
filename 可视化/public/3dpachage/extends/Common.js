var requestanimation=0
function AddClound(viewer){
    if(!viewer) return;
    MeshVisualizer = Cesium.MeshVisualizer;
    Mesh = Cesium.Mesh;
    MeshMaterial = Cesium.MeshMaterial;
    FramebufferTexture = Cesium.FramebufferTexture;
    GeometryUtils = Cesium.GeometryUtils;
    LOD = Cesium.LOD;
    var globe = viewer.scene.globe.ellipsoid;
    var meshVisualizer = new MeshVisualizer({
    position: Cesium.Cartesian3.fromDegrees(0, 0, -globe.radii.z),
    up: { z: 1 }
    });
    var primitive=   viewer.scene.primitives.add(meshVisualizer); 
    meshVisualizer.showReference = true;//显示坐标轴
    var material = new MeshMaterial({
        //defaultColor: "rgba(200,0,0,1.0)",
        //wireframe: true,
        uniforms: {
            u_textureMap: Cesium.buildModuleUrl('Widgets/Images/skycloud1.png')
        },
        side: MeshMaterial.Sides.DOUBLE,
        vertexShader: "\n\
                \n\
                varying vec3 v_position;\n\
                varying vec2 v_st;\n\
                \n\
                void main(void) \n\
                {\n\
                vec4 pos = u_modelViewMatrix * vec4(position,1.0);\n\
                v_position = pos.xyz;\n\
                v_st=st;\n\
                gl_Position = u_projectionMatrix * pos;\n\
                }",
        fragmentShader: "varying vec2 v_st;\
                uniform sampler2D u_textureMap;\
                void main()\
                {\
                gl_FragColor = texture2D(u_textureMap,v_st);\n\
                \
                }\
                "
    });
    var offset=50000;
    var geometry = new Cesium.EllipsoidGeometry({
        radii: new Cesium.Cartesian3(globe.radii.x + offset, globe.radii.y + offset, globe.radii.z + offset),
        vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
    });
    var ge = Cesium.EllipsoidGeometry.createGeometry(geometry);
    var mesh = new Mesh(ge, material);
    var lod=new LOD();
    lod.addLevel(mesh,500000);
    var pos=Cesium.Cartesian3.fromDegrees(0, 0, -globe.radii.z)
    lod.maxAvailableDistance=100000000;
    lod.minAvailableDistance=10000000;
    lod.setPosition(pos.x,pos.y,pos.z);
    meshVisualizer.add(lod);
    //控制旋转速度
    function rotation(){
        lod.rotation.angle -= 0.03;
        lod._modelMatrixNeedsUpdate = true;
        requestanimation= requestAnimationFrame(rotation);
    }
    rotation();
}
//添加调试工具
function addDebuggerTool(viewer){
    document.addEventListener('keydown', function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
            switch (e.keyCode) {
                case 82: //R点击取点
                    //viewer.cesiumInspector.viewModel.wireframe = !viewer.cesiumInspector.viewModel.wireframe;
                    var handle = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
                    handle.setInputAction(function (click) {
                        var position = viewer.scene.pickPosition(click.position);
                        var wgs84 = Cesium.Cartographic.fromCartesian(position);
                        var lon = Cesium.Math.toDegrees(wgs84.longitude);
                        var lat = Cesium.Math.toDegrees(wgs84.latitude);
                        console.log(`${lon},${lat},${wgs84.height}`);
                        handle.destroy();
                    },Cesium.ScreenSpaceEventType.LEFT_CLICK)
                    break;
                case 70: //F键查看帧率
                    viewer.scene.debugShowFramesPerSecond = !viewer.scene.debugShowFramesPerSecond;
                    break;
                case 86: //V
                    var position = viewer.camera.position;
                    var xyz = new Cesium.Cartesian3(position.x, position.y, position.z);
                    var wgs84 = viewer.scene.globe.ellipsoid.cartesianToCartographic(xyz);
                    var currentcamera = viewer.scene.camera;
                    var pos = currentcamera.position;
                    console.log(
                        JSON.stringify({
                            destination: {
                                x: pos.x,
                                y: pos.y,
                                z: pos.z
                            },
                            orientation: {
                                pitch: currentcamera.pitch,
                                heading: currentcamera.heading,
                                roll: currentcamera.roll
                            }
                        })
                    );
                    break;
                default:
            }
        }
    });
}
//添加球体的外包色
function AddEarthMask(viewer,color){
        if(!viewer) return;
        var rectangleInstance = new Cesium.GeometryInstance({
            geometry : new Cesium.RectangleGeometry({
                rectangle : Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0)
            }),
            id : 'rectangle',
            attributes : {
                //color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE.withAlpha(0.5)),
                color : Cesium.ColorGeometryInstanceAttribute.fromColor(color?color:Cesium.Color.fromCssColorString("#004fb6").withAlpha(0.5)),
                distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(10000000, 100000000)
            }
            });
            viewer.scene.primitives.add(new Cesium.GroundPrimitive({
            geometryInstances : rectangleInstance,
            allowPicking:false
            }));
}

Array.prototype.filter = Array.prototype.filter || function (func) {
    var arr = this;
    var r = [];
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            r.push(arr[i]);
        }
    }
    return r;
}

Array.prototype.firstOrDefault = Array.prototype.firstOrDefault || function (func) {
    var arr = this;
    var r = null;
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            r = arr[i];
            break;
        }
    }
    return r;
}
Array.prototype.where = Array.prototype.where || function (func) {
    var arr = this;
    var r = [];
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            r.push(arr[i]);
        }
    }
    return r;
}

//将geojson对象转为Cesium中的点传
 function formateData(data, height) {
     if(!data||data.length==0) return[];
    var features = clone(data.features);
    var fes = [];
    features.forEach(t => {
        if (t.geometry.type == 'MultiLineString') {
            t.geometry.coordinates.forEach(p => {
                if (height) {
                    p.forEach(q => {
                        q.push(height);
                    })
                }
                fes.push({
                    geometry: {
                        coordinates: p,
                        type: t.geometry.type
                    },
                    properties: t.properties,
                })
            })
        } else if (t.geometry.type == 'LineString') {
            if (height) {
                t.geometry.coordinates.forEach(p => {
                    p.push(height);
                })
            }
            fes.push({
                geometry: {
                    coordinates: t.geometry.coordinates,
                    type: t.geometry.type
                },
                properties: t.properties,
            })
        } else if (t.geometry.type == 'Point') {
            if (height)
                t.geometry.coordinates.push(height);
            fes.push({
                geometry: {
                    coordinates: t.geometry.coordinates,
                    type: t.geometry.type
                },
                properties: t.properties,
            })
        } else if (t.geometry.type == 'Polygon') {
            if (height) {
                t.geometry.coordinates.forEach(p => {
                    p.forEach(k => {
                        k.push(height);
                    })
                })
            }
            fes.push({
                geometry: {
                    coordinates: t.geometry.coordinates,
                    type: t.geometry.type
                },
                properties: t.properties,
            })
        } else {
            if (height) {
                t.geometry.coordinates.forEach(p => {
                    p.forEach(k => {
                        k.forEach(e => {
                            e.push(height);
                        })
                    })
                })
            }
            fes.push({
                geometry: {
                    coordinates: t.geometry.coordinates,
                    type: t.geometry.type
                },
                properties: t.properties,
            })
        }

    })
    return fes;
}
//深拷贝对象
function clone(obj) {
    var o, obj;
    if (obj.constructor == Object) {
        o = new obj.constructor();
    } else {
        o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (o[key] != obj[key]) {
            if (typeof (obj[key]) == 'object') {
                o[key] = clone(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
    }
    o.toString = obj.toString;
    o.valueOf = obj.valueOf;
    return o;
}
var pc1Point=[];
var pc2Point=[];
var pc3Point=[];
//添加基地信息
function addBasePoint(_this,viewer,call)
{

    var dataURL=services+"/jddw/query?&returnGeometry=yes&limit=100&outputsrid=4326";
    _this.$axios.get(dataURL).then(
        function(results){
            //不同批次集合
            var pc1=[];
            var pc2=[];
            var pc3=[];
            //扩散圆样式
            var circleOption1=new Object();
            circleOption1.pic="3dpachage/Cesium/Widgets/Images/base/发光点.png";
            var circleOption2=new Object();
            circleOption2.pic="3dpachage/Cesium/Widgets/Images/base/发光点2.png";
            var circleOption3=new Object();
            circleOption3.pic="3dpachage/Cesium/Widgets/Images/base/发光点1.png";
             //图标样式
             var picOption1=new Object();
             picOption1.pic="3dpachage/Cesium/Widgets/Images/base/光伏.png";
             var picOption2=new Object();
             picOption2.pic="3dpachage/Cesium/Widgets/Images/base/光伏2.png";
             var picOption3=new Object();
             picOption3.pic="3dpachage/Cesium/Widgets/Images/base/光伏1.png";
            //遍历区别不同批次
            for(var i=0;i<results.features.length;i++)
            {
                if(results.features[i].properties.批次=="第1批次")
                {
                    pc1.push(results.features[i]);
                }else if(results.features[i].properties.批次=="第2批次")
                {
                    pc2.push(results.features[i]);
                }else{
                    pc3.push(results.features[i]);
                }
            }
            var datasource=new Cesium.CustomDataSource("base");
            datasource["clear"]=true;
            viewer.dataSources.add(datasource);
            //添加底部扩散圆圈
            pc1Point=pc1Point.concat(addCircleRipple(viewer,pc1,circleOption1,datasource));
            pc2Point=pc2Point.concat(addCircleRipple(viewer,pc2,circleOption2,datasource));
            pc3Point=pc3Point.concat(addCircleRipple(viewer,pc3,circleOption3,datasource));

            //添加图标
            pc1Point=pc1Point.concat(addBillboard(viewer,pc1,picOption1,datasource));
            pc2Point=pc2Point.concat(addBillboard(viewer,pc2,picOption2,datasource));
            pc3Point=pc3Point.concat(addBillboard(viewer,pc3,picOption3,datasource));

            //添加文字
            pc1Point=pc1Point.concat(addLablels(viewer,pc1,datasource));
            pc2Point=pc2Point.concat(addLablels(viewer,pc2,datasource));
            pc3Point=pc3Point.concat(addLablels(viewer,pc3,datasource));

            if(call){
                call();
            }else
            {
                showall();          
            }
        }
    );
}
function showPC1()
{
    showOrHideEntity(pc1Point,true);
    showOrHideEntity(pc2Point,false);
    showOrHideEntity(pc3Point,false);
}
function showPC2()
{
    showOrHideEntity(pc1Point,false);
    showOrHideEntity(pc2Point,true);
    showOrHideEntity(pc3Point,false);
}
function showPC3()
{
    showOrHideEntity(pc1Point,false);
    showOrHideEntity(pc2Point,false);
    showOrHideEntity(pc3Point,true);
}
function showall(){
    showOrHideEntity(pc1Point,true);
    showOrHideEntity(pc2Point,true);
    showOrHideEntity(pc3Point,true);
}
function hideall(){
    showOrHideEntity(pc1Point,false);
    showOrHideEntity(pc2Point,false);
    showOrHideEntity(pc3Point,false);
}
//圆形扩散点
function addCircleRipple(viewer,data,option,datasource)
{
    var sources=datasource?datasource:viewer;
    var circleScans=[];
    for(var i=0;i<data.length;i++)
    {

        var circleScan=sources.entities.add({
            position : Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1],100000),
            billboard : {
                image : option.pic, // default: undefined
                show : true, // default
                scale : 1, // default: 1.0
                pixelOffset : new Cesium.Cartesian2(0, 0),
            },

        });
        circleScans.push(circleScan);
    }
    return circleScans;
}

//添加基地图标
function addBillboard(viewer,data,option,datasource)
{
    var sources=datasource?datasource:viewer;
    var billboardEntities=[];
    for(var i=0;i<data.length;i++)
    {
        var pro=data[i].properties;
        pro["baseimg"]=true;
        var entity=sources.entities.add({
            position : Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1],100000),
            billboard : {
                image : option.pic, // default: undefined
                show : true, // default
                // pixelOffset : new Cesium.Cartesian2(0, -50), // default: (0, 0)
                // eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                // horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
                // verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                scale : 1, // default: 1.0
                // color : Cesium.Color.LIME, // default: WHITE
                // rotation : Cesium.Math.PI_OVER_FOUR, // default: 0.0
                // alignedAxis : Cesium.Cartesian3.ZERO, // default
                //  width : 25, // default: undefined
                // height : 25 // default: undefined
                pixelOffset : new Cesium.Cartesian2(0, -30),
            },
            properties:new Cesium.PropertyBag(pro)
        });
        billboardEntities.push(entity);
    }
    return billboardEntities;
}

//添加基地标注
function addLablels(viewer,data,datasource)
{
    var sources=datasource?datasource:viewer;
    var labelEntities=[];
    for(var i=0;i<data.length;i++)
    {
        var entity=sources.entities.add({
            position : Cesium.Cartesian3.fromDegrees(data[i].geometry.coordinates[0], data[i].geometry.coordinates[1],100000),
            label : {
                text : data[i].properties.name, // default: undefined
                font : '16px sans-serif',
                pixelOffset: new Cesium.Cartesian2(0, -70), 
                fillColor:Cesium.Color.WHITE
            }
        });
        labelEntities.push(entity);
    }
    return labelEntities;
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
        //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
        break;
      default:
        return 0;
        break;
    }
  }

//添加柱状图
var barChartData;
function addBarChart(viewer,data)
{
    viewer.entities.removeAll();
    // //隐藏文字
    // showOrHideEntity(labelEntities,false);
    // //隐藏图标
    // showOrHideEntity(billboardEntities,false);
    // //隐藏底面
    // showOrHideScan(circleScans,false);
    for(var i=0;i<data.length;i++)
    {
        var op={
            layerId:"barChart"+i,//英文，且唯一,内部entity会用得到
            lon:data[i].geometry.coordinates[0],
            lat:data[i].geometry.coordinates[1],
            addEntity:true,//默认为false,如果为false的话就不添加实体，后面的实体属性就不需要了，这个时候 boxHeightMax可要可不要。它代表弹窗起始点的地理坐标高度
            boxHeight:200000,//中间立方体的高度
            boxHeightDif:5000,//中间立方体的高度增长差值，越大增长越快
            //boxHeightMax:400000,//中间立方体的最大高度
            boxHeightMax:randomNum(300000,400000),//中间立方体的最大高度
            boxSide:50000,//立方体的边长
            //boxMaterial: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
            boxMaterial: Cesium.Color.fromRandom({
                alpha:0.4
            }),
            circleSize:50000,//大圆的大小，小圆的大小默认为一半
        };
        ysc.showDynamicLayer(viewer,op,function (){ //回调函数 改变弹窗的内容;
            
        });
    }
    barChartData=data;
}
//删除柱状图
function removeBarChart(viewer)
{
    for(var i=0;i<barChartData.length;i++)
    {
        viewer.entities.removeById("barChart"+i+"_1");
        viewer.entities.removeById("barChart"+i+"_2");
        viewer.entities.removeById("barChart"+i+"_3");
    }
}
//显示隐藏entity
function showOrHideEntity(entities,type)
{
    for(var i=0;i<entities.length;i++)
    {
        entities[i].show=type;
    }
}
//显示隐藏扫描线
function showOrHideScan(Scans,type)
{
    for(var i=0;i<Scans.length;i++)
    {
        Scans[i].enabled=type;
    }
}
//添加热力图
var heatMapLayer;
function addHeatMapServer(viewer)
{
     var  heatMapLayerprovider = new Cesium.ArcGisMapServerImageryProvider({
        url : `${arcgisSererUrl}/%E5%85%A8%E5%9B%BD%E5%85%89%E4%BC%8F%E5%B9%B3%E5%8F%B0/%E5%85%A8%E5%9B%BD%E7%83%AD%E5%8A%9B%E5%9B%BE/MapServer`,
        maximumLevel:13
    });
    heatMapLayer=viewer.imageryLayers.addImageryProvider(heatMapLayerprovider);
}

//删除热力图
function removeHeatMapServer(viewer)
{
    if(viewer.imageryLayers.contains(heatMapLayer)){
        viewer.imageryLayers.remove(heatMapLayer);
        heatMapLayer=null;
    }   
}
function generateCurve(startPoint, endPoint) {
    let addPointCartesian = new Cesium.Cartesian3();
    Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);
    let midPointCartesian = new Cesium.Cartesian3();
    Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);
    let midPointCartographic = Cesium.Cartographic.fromCartesian(midPointCartesian);
    midPointCartographic.height = Cesium.Cartesian3.distance(startPoint, endPoint) / 5;
    let midPoint = new Cesium.Cartesian3();
    Cesium.Ellipsoid.WGS84.cartographicToCartesian(midPointCartographic, midPoint);
    let spline = new Cesium.CatmullRomSpline({
        times: [0.0, 0.5, 1.0],
        points: [startPoint, midPoint, endPoint]
    });
    let curvePointsArr = [];
    for (let i = 0, len = 300; i < len; i++) {
        curvePointsArr.push(spline.evaluate(i / len));
    }
    return curvePointsArr;
}
    //清除数据源
    function clearDataSourcees(datasourcesnames,viewer) {
    if (!datasourcesnames) datasourcesnames = [];
    var deletesource = viewer.dataSources._dataSources.filter(
        t => datasourcesnames.indexOf(t.name) > -1
    );
    deletesource.forEach(data => {
        viewer.dataSources.remove(data);
    });
}
function getIndexRightBarColor(value){
    var min=210,max=280,color=Cesium.Color.fromRandom({
        alpha: 1
    });
    if(value>=min&&value<min+10){
        color="#ff7b2c";
    }else if(value>=min+10&&value<min+20){
        color=color;
    }else if(value>=min+20&&value<min+30){
        color="#f2b521";
    }else if(value>=min+30&&value<min+40){
        color="#a8d61d";
    }else if(value>=min+40&&value<min+50){
        color="#1cb314";
    }else if(value>=min+50&&value<min+60){
        color="#07b687";
    }else if(value>=min+60&&value<max){
        color="#00abd0";
    }else if(value>=max){
        color="#00abd0";
    }
    return {
        color:color,
        min:min,
        max:max
    }
}
function gettouziBarColor(value){
    var min=20,max=150,color=Cesium.Color.fromRandom({
        alpha: 1
    });
    if(value<min){
        color=color;
    }
    else if(value>=min&&value<min+10){
        color="#ff7b2c";
    }else if(value>=min+10&&value<min+20){
        color="#ff7b2c";
    }else if(value>=min+20&&value<min+30){
        color="#f2b521";
    }else if(value>=min+30&&value<min+40){
        color="#a8d61d";
    }else if(value>=min+40&&value<min+50){
        color="#1cb314";
    }else if(value>=min+50&&value<min+60){
        color="#07b687";
    }else if(value>=min+60&&value<max){
        color="#00abd0";
    }else if(value>=max){
        color="#00abd0";
    }
    return {
        color:color,
        min:min,
        max:max
    }
}
function getzjBarColor(value){
    var min=200,max=600,color=Cesium.Color.fromRandom({
        alpha: 1
    });
    if(value<min+100){
        color=color;
    }else if(value>=min+100&&value<min+200){
        color="#ff7b2c";
    }else if(value>=min+200&&value<min+300){
        color="#f2b521";
    }else if(value>=min+300&&value<min+400){
        color="#a8d61d";
    }else if(value>=min+400&&value<min+500){
        color="#1cb314";
    }else if(value>=min+500&&value<min+600){
        color="#07b687";
    }else if(value>=min+600&&value<max){
        color="#00abd0";
    }else if(value>=max){
        color="#00abd0";
    }
    return {
        color:color,
        min:min,
        max:max
    }
}
function getbtBarColor(value){
    var min=3000,max=9000,color=Cesium.Color.fromRandom({
        alpha: 1
    });
    if(value<min+100){
        color=color;
    }else if(value>=min+1000&&value<min+2000){
        color="#ff7b2c";
    }else if(value>=min+2000&&value<min+3000){
        color="#f2b521";
    }else if(value>=min+3000&&value<min+4000){
        color="#a8d61d";
    }else if(value>=min+4000&&value<min+5000){
        color="#1cb314";
    }else if(value>=min+5000&&value<min+6000){
        color="#07b687";
    }else if(value>=min+6000&&value<max){
        color="#00abd0";
    }else if(value>=max){
        color="#00abd0";
    }
    return {
        color:color,
        min:min,
        max:max
    }
}
function getfdlBarColor(value){
    var min=1100,max=1400,color=Cesium.Color.fromRandom({
        alpha: 1
    });
    if(value<min){
        color=color;
    }else if(value>=min&&value<min+100){
        color="#ff7b2c";
    }else if(value>=min+100&&value<min+200){
        color="#f2b521";
    }else if(value>=min+200&&value<min+300){
        color="#f2b521";
    }else if(value>=max){
        color="#00abd0";
    }
    return {
        color:color,
        min:min,
        max:max
    }
}