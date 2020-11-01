
var htmlArr = [];
var mlArr  = [];
var util3D =function(){
	//发送服务	
	var serviceCall = function(p){
		console.log(p);
		rs._serviceCall(p);
	};
	//ray模式新增效果
	var tkhyingcang =function (){
		var pm={"service_id": "dev_relation.hide_image","isHide":true}
		 serviceCall(pm);
	}
	//ray模式新增效果关闭
	var tkhyingcangClose =function (){
		var pm={"service_id": "dev_relation.hide_image","isHide":false}
		 serviceCall(pm);
	}
	//转换效率标牌
	var zhuanhxlUpdate=function(id,value){
		var pm={
				  "service_id": "pop_label.update_value",
				  "update_data": [
				    {
				      "value": value,
				      "key": "固定支架"
				    }
				  ],
				  "id": id
				}
		serviceCall(pm);
	}
	 //电站辐照小时数
	var fzxsInfoUpdate=function(id,cantaradhour,diradhour,totalradhour){
		var pm={
				"service_id": "pop_label.update_value",
				"update_data": [{
					"value": cantaradhour,
					"key": "cantaradhour"
				}, {
					"value": diradhour,
					"key": "diradhour"
				}, {
					"value": totalradhour,
					"key": "totalradhour"
				}],
				"id": id
		}
		serviceCall(pm);
	}
	
	 //电站辐射强度
	var fsqdInfoUpdate=function(id,gradavg,canradext,sradavg,dradavg){
		var pm={
				"service_id": "pop_label.update_value",
				"update_data": [{
					"value": gradavg,
					"key": "gradavg"
				}, {
					"value": canradext,
					"key": "canradext"
				}, {
					"value": sradavg,
					"key": "sradavg"
				},{
					"value": dradavg,
					"key": "dradavg"
				}
				],
				"id": id
		}
		serviceCall(pm);
	}
	
	
	 //电站降雨量信息
	var jylInfoUpdate=function(id,rain10,raintotal){
		var pm={
				"service_id": "pop_label.update_value",
				"update_data": [{
					"value": rain10,
					"key": "rain10"
				}, {
					"value": raintotal,
					"key": "raintotal"
				}],
				"id": id
		}
		serviceCall(pm);
	}
	
	 //电站天气信息
	var tqInfoUpdate=function(id,winspext,windirext,preext,humext,tempext){
		var pm={
				"service_id": "pop_label.update_value",
				"update_data": [{
					"value": winspext,
					"key": "winspext"
				}, {
					"value": windirext,
					"key": "windirext"
				}, {
					"value": preext,
					"key": "preext"
				},{
					"value": humext,
					"key": "humext"
				},{
					"value": tempext,
					"key": "tempext"
				}],
				"id": id
		}
		serviceCall(pm);
	}
	//统一删除效果--还未用
	var cancal2=function(){
		var pm={
				"service_id":"effect.destroy", "group_id":1995
		}
		serviceCall(pm);
	}
	//退出测量--测试
	var quitCeliang=function(){
		var pm={"service_id":"measure_manager.quit_system"}
		//serviceCall(pm);
	}
	
	//转换效率标牌
	var zhuanhxlUpdate=function(id,value){
		var pm={
				  "service_id": "pop_label.update_value",
				  "update_data": [
				    {
				      "value": value,
				      "key": "固定支架"
				    }
				  ],
				  "id": id
				}
		serviceCall(pm);
	}
	
	var zhuanhxlShow=function(id){
		var pm={
					"id": id,
					"service_id": "pop_label.show_popup_label",
					"show_icon": 1,
					"show_line": 1
		}
		serviceCall(pm);
	}
	
	var zsj=function(){
		var pm={
		   "releative_path" : "plant/SmartCity/script/jidigaikuang.as3",
		   "service_id" : "smart_city_effect.script.play_script",
		   "stop_mode" : 1
		}
		serviceCall(pm);
	}

	//指北针效果
	var zbz=function(){
		var pm={
			"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"脚本播放精简模式\" FromFile = \"1\" FromFileDir = \"Plant\\ActionScriptSystem\\As3App\\风向标\\\" FromFileName=\"风向标脚本.as3\"/>"	
		}
		serviceCall(pm);
	}
		//指北针关闭效果
	var zbzClose=function(){
		var pm={
				"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"脚本播放精简模式\" Del=\"1\" FromFile = \"1\" FromFileDir = \"plant\\ActionScriptSystem\\As3App\\风向标\\\" FromFileName=\"风向标脚本.as3\"/>"	
		}
		serviceCall(pm);
	}
	//空间距离测量
	var spaceLongCL=function(){
		var pm={"service_id":"tools.measure","type":"2"}
		serviceCall(pm);
	}
	//坡度量测	
	var gradientCL=function(){
		var pm={"service_id":"tools.measure","type":"3"}
		serviceCall(pm);
	}
	//面积量测
	var areaCL=function(){
		var pm={"service_id":"tools.measure","type":"4"}
		serviceCall(pm);
	}
	//北向夹角测量
	var jiajiaoCL=function(){
		var pm={"service_id":"tools.measure","type":"5"}
		serviceCall(pm);
	}
	//投影面积测量
	var projectionAreaCL=function(){
		var pm={"service_id":"tools.measure","type":"6"}
		serviceCall(pm);
	}
	//打开3d监控配置
	var ContrlDeploy3D=function(){
		var pm={
				"id":"201901311519","service_id":"browser.openModule"
			}
		serviceCall(pm);
	}
	//相机定位
	var lensLocation = function (x,y,z,course,alpha,time){
		var pm = {
			"service_id": "camera.locate",
			"pos_pose": {
				"x": x,
				"y": y,
				"z": z,
				"course": course,
				"alpha": alpha,
				"group_id":1995,
				"roll": 0.0000		
			},
			"time": time
		};
		serviceCall(pm);
	}	
	
	//三维回调，隐藏工具栏
	var Gongju=function(){
		var pm={
				"service_id": "page.call_function",
				"page_title": "光伏领跑",
				"function_name": "yingcang"
		};
		serviceCall(pm);	
	}	
	
		//三维回调，显示实时天气
	var shistq=function(){
		var pm={
				"service_id": "page.call_function",
				"page_title": "光伏领跑",
				"function_name": "intervalattach"
		};
		serviceCall(pm);	
	}	
	
	//3D效果
	var op3DBatch=function(id,view_id){
		var pm={
				"service_id":"model.restore_normal_view",
				"layer_array" : [{"layer_id" : id,"viewobj_id" :view_id,"color":"0xcc0066ff"}]
		};
		 serviceCall(pm);	
	}
	
	//ray效果
	var opRayBatch=function(id,view_id){
		var pm={
				"service_id":"model.start_advanced_view",
				"layer_array" : [{"layer_id" : id,"viewobj_id" : view_id,"color":"0xcc0066ff"}]
		}
		 serviceCall(pm);	
	}
	 //首页图层调用服务
	var tuceng=function(tucengID,ishow,view_type){
	
		
			  var pm= {
					  "layer_id": tucengID,
					  "service_id": "viewobj_layer.show",
					  "show": ishow,
					  "view_type": view_type
					}
			  serviceCall(pm);
		 
	}
	
	
	
	 

	//关闭页面
	var cancel = function(){
		if(htmlArr.length>0){
			serviceCall(htmlArr);
			htmlArr=[];
		}
			
		
	};
	//清除三维效果
	var cancelML = function(){
			serviceCall(mlArr);
			mlArr=[];
		
	};
	/*//脚本
	var jiaoben = function(name,id){
		var obj={
				"service_id": "smartcity.stop_script",
				"script_id": id
			};
			mlArr.push(obj);
		var path = "plant/Script/"+name+".as3"
		var pm = {
				"service_id": "smartcity.play_script",
				"releative_path": path,
				"stop_mode": 2
			}
		util3D.serviceCall(pm);
			
	};*/
	//脚本
	var jiaoben = function(name,id){
		var obj={
				"service_id": "actionscript.stop",
				"script_id": id
			};
			mlArr.push(obj);
		var pm = {
			"service_id": "actionscript.play",
			"script_id": id,
			"reopen": 0
		}
		util3D.serviceCall(pm);			
	};
	//取消脚本
	var caearjiaoben = function(id){
		var obj={
				"service_id": "actionscript.stop",
				"script_id": id
			};
			
		util3D.serviceCall(obj);			
	};
	//打开页面不加入全局变量中
	var opHtmlNoAddArr = function(id){
		
		var pm={
		  	"service_id": "browser.openModule",
		  	"id": id
   		 };
   		 serviceCall(pm);			
	};
	//关闭页面
	var closeyemian = function(name){
		var pm={"service_id":"browser.close","title":name};
		 serviceCall(pm);	

	}
	//打开页面
	var opHtml = function(id,name){
		var obj={"service_id":"browser.close","title":name};
		htmlArr.push(obj);
		var pm={
		  	"service_id": "browser.openModule",
		  	"id": id
   		 };
   		 serviceCall(pm);			
	};
	//批量打开页面
	var htmlBatch=[];
	var opHtmlBatch = function(id,name){
		var obj={"service_id":"browser.close","title":name};
		htmlArr.push(obj);
		var pm={
			"service_id": "browser.openModule",
			"id": id
		 };
		 htmlBatch.push(pm);
	};
	var opHtmlBatchSend = function() {
		serviceCall(htmlBatch);
		htmlBatch=[];
	}
	
	//交互效果打开页面
	var jiaohuopHtml = function(id){		
		var pm={
		  	"service_id": "browser.openModule",
		  	"id": id
   		 };
   		 serviceCall(pm);			
	};
	//交互效果关闭页面
	var guanbiHtml = function(name){		
		var pm={"service_id":"browser.close","title":name};
   		 serviceCall(pm);			
	};
	//模型科技蓝效果
	var moderLan = function(){	
		var pm={"service_id":"viewobj_layer.start_high_tech_view","layer_array":[{"layer_id":761,"viewobj_id":[-1],"color":"0xcc0066ff","viewobj_type":4096}]};
   		 serviceCall(pm);			
	};
	//模型科技蓝效果
	var cearModerLan = function(){	
		var pm={"service_id":"viewobj_layer.restore_normal_view","layer_array":[{"layer_id":761,"viewobj_id":[-1],"viewobj_type":4096}]};
   		 serviceCall(pm);		
	};
	//工艺流程
	var gongyiliucheng = function(){
		var pm={"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"打开脚本列表\" Title=\"工艺流程脚本\" ScriptType=\"2\" EnterPrise=\"\" Editable=\"1\" />"};
		 serviceCall(pm);
	};
	//行动方案
	var xingdongfangan= function(){
		var pm={"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"打开脚本列表\" Title=\"行动方案脚本\" ScriptType=\"1\" EnterPrise=\"\" Editable=\"1\" />"}
		serviceCall(pm);
	};
	//可视化预案
	var keshihuayuan = function(){	
		var pm={"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"打开脚本列表\" Title=\"行动方案脚本\" ScriptType=\"1\" EnterPrise=\"\" Editable=\"1\" />"}
   		 serviceCall(pm);		
	};
	//电缆刨切
	var paoqie = function(){
		var pm = {"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"管线剖切-自定义剖切\" DissectType=\"自定义\"/>"}
		serviceCall(pm);
	};
	//上下游查询--暂时不用
	var shangxiayou = function(){
		var pm = {"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"上下游编辑器\"/>"};
		serviceCall(pm);
	};
	//上下游查询
	var SBshangxiayou = function(){
		var pm = {"service_id": "browser.openModule",
		  	"id":201905290026
			};
		serviceCall(pm);
	};
	//阴影遮挡
	var yinyingzhedang = function(){
		var pm = {"service_id":"environment.show_setting_ui","type":"0x2"};
		serviceCall(pm);
	};
	//实时阴影遮挡
	var yinyingzhedang_shis = function(){
	    var now = new Date();
	    var year = now.getFullYear(); //得到年份
	    var month = now.getMonth();//得到月份
	    var day = now.getDate();//得到日期
	    var hour = now.getHours();//得到小时
	    var minu = now.getMinutes();//得到分钟
	    var sec = now.getSeconds();//得到秒
		var sss = time_range("20:00","23:59");
		var ttt = time_range("00:00","5:00");
		if(sss == true || ttt==true){
			var pm = {"service_id":"base_scene.set_sun_time_mode", "year":year, "month":month, "day":day, "hour":hour, "minute":minu, "second":sec};
			serviceCall({"service_id":"viewobj_layer.show","view_type":49152,"layer_id":15401,"show":1});
			serviceCall(pm);
		}else{
			
			serviceCall({"service_id":"viewobj_layer.show","view_type":49152,"layer_id":15401,"show":0});
			serviceCall(pm);
		}
//		var pm = {"service_id":"base_scene.set_sun_time_mode", "year":2019, "month":8, "day":6, "hour":18, "minute":18, "second":35}
//		serviceCall(pm);
	}
	
	var time_range = function (beginTime, endTime) {
		  var strb = beginTime.split (":");
		  if (strb.length != 2) {
		    return false;
		  }
		 
		  var stre = endTime.split (":");
		  if (stre.length != 2) {
		    return false;
		  }
		 
		  var b = new Date ();
		  var e = new Date ();
		  var n = new Date ();
		 
		  b.setHours (strb[0]);
		  b.setMinutes (strb[1]);
		  e.setHours (stre[0]);
		  e.setMinutes (stre[1]);
		 
		  if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
		    return true;
		  } else {
		    
		    return false;
		  }
	}
	//F7效果
	var keyF7 = function(){
		var pm = {"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"地面显隐\" Show=\"0\"/>"}
		serviceCall(pm);
	};
	//取消F7效果
	var qxkeyF7= function(){
		var pm = {"service_id":"advanced_service.call_xml_event","xml":"<Event EventType=\"地面显隐\" Show=\"1\"/>"}
		serviceCall(pm);
	};
	//测量工具
	var celiang= function(){
		var pm = {"service_id":"tools.measure","type":"2"}
		serviceCall(pm);
	};
	//标绘点
	var bioahuiYuan = function(){
		var pm = {
				   "callback_service" : {
				      "data" : "$callback_data$",
				      "function_name" : "getPosFun",
				      "page_title" : "地理要素标绘",
				      "service_id" : "page.call_function"
				   },
				   "service_id":"plotting_mgr.draw_point","oper_id":"9","color":"0xaaff0000","render_queue":2000,"filePath":"mark.png"
				
				}

		serviceCall(pm);

	};
	
	//发电量
	/*var fadianliang= function(){
		var pm = {"service_id":"cfg_system.stop","name":"发电量-冰山图-基地-正式"}
		serviceCall(pm);
	};
	*/
	
	//标绘线
	var bioahuiXian = function(){
		var pm = {
					 "callback_service" : {
					      "data" : "$callback_data$",
					      "function_name" : "getPosFun",
					      "page_title" : "地理要素标绘",
					      "service_id" : "page.call_function"
					
					 },
					 "service_id":"plotting_mgr.draw_line","oper_id":"10","color":"0xaaff0000","render_queue":2000
		}
		serviceCall(pm);

	};
	   /*"service_id" : "advanced_service.call_xml_event",
			   "xml" : "<Fun FuncID=\"50000\"><Event EventType='线标绘' OperID='884830997' Color='0xaa00aaaa'/></Fun>"*/
	//标绘面
	var bioahuiMian = function(){
		var pm = {
			  "block" : 1,
		   "callback_service" : {
		      "data" : "$callback_data$",
		      "function_name" : "getPosFun",
		      "page_title" : "地理要素标绘",
		      "service_id" : "page.call_function"
		   },
		   "service_id":"plotting_mgr.draw_polygon","oper_id":"7","color":"0xaaff0000","render_queue":2000
		   
		}
		serviceCall(pm);
	};
		  /* "xml" : "<Fun FuncID=\"50000\"><Event EventType='多边形区域标绘' OperID='884830997' Color='0xaa00aaaa' HaveFrame='0' FrameColor='0xffffff00' FrameWidth='0.1' RenderQueue='100' SpaceStyle='0' PosX='-1' PosY='-1'/></Fun>"
			"service_id" : "advanced_service.call_xml_event",*/
	//取消标绘
	var bioahuiQuxiao = function(){
		var pm = {
		   "service_id" : "advanced_service.call_xml_event",
		   "xml" : "<Fun FuncID=\"50000\"><Event EventType='移除标绘' OperID='884830997'/></Fun>"
		}
		serviceCall(pm);
		var obj={"service_id":"effect.destroy", "effect_id":201905091034};
		serviceCall(obj);
	}
	//删除标会
	var removebh=function(type,typeceng,id){
		var pm={
			 "service_id": "viewobj_manager.destroy_obj",
			 "viewobj_type": type,
			 "layer_id": typeceng,
			 "viewobj_id": id
		}
		serviceCall(pm);
	}
	//获取镜头
		var getJingTou = function(type,typeceng,id){
			var pm ={
					 "service_id": "viewobj_manager.locate_obj",
					 "viewobj_type": type,
					 "layer_id": typeceng,
					 "viewobj_id": id,
					 "time": 2000
					}
			serviceCall(pm);
	}
		/*{
		   "callback_service" : {
		      "data" : "$callback_data$",
		      "function_name" : "callbackJingTou",
		      "page_title" : "地理要素标绘",
		      "service_id" : "page.call_function"
		   },
		   "service_id" : "camera.get_info"
		}*/
	//画点
	var drawdian = function(x,y){		
		
		var pm={
			   "config" : {
			      "align" : 5,
			      "height" : 100,
			      "offset" : {
			         "x" : 0,
			         "y" : 0
			      },			     
			      "pos" : {
			         "x" : x,
			         "y" : y,
			         "z" : 0
			      },
			      "tex" : "weixianyuan1.png",
			      "width" : 100
			   },
			   "effect_id" : 201905091034,
			   "group_id":1995,
			   "service_id" : "effect.screen_image.create"
			}
			util3D.serviceCall(pm);	
	}
	//画线
	var drawXian = function(Points){		
		var pm ={
			   "service_id" : "advanced_service.call_xml_event",
			   "xml" : "<Event EventType='线添加' OperID='884830997' Points='"+Points+"' Color='0xaa00aaaa'/>"
			}
			serviceCall(pm);	
	}
	//画面
	var drawMian = function(Points){
		var pm ={
				   "service_id" : "advanced_service.call_xml_event",
				   "xml" : "<Fun FuncID=\"50000\"><Event EventType='多边形区域添加' OperID='884830997' Points='"+Points+"' Color='0xaa00aaaa' HaveFrame='0' FrameColor='0xffffff00' FrameWidth='0.1' /></Fun>"
				}
			serviceCall(pm);	
	}
	
	return {	
		celiang:function(){
			celiang();
		},	
		keyF7:function(){
			keyF7();
		},	
		qxkeyF7:function(){
			qxkeyF7();
		},
		lensLocation:function(x,y,z,course,alpha,time){
			lensLocation(x,y,z,course,alpha,time);
		},
		gongyiliucheng:function(){
			gongyiliucheng();
		},
		yinyingzhedang:function(){
			yinyingzhedang();
		},
		jiaohuopHtml:function(id){
			jiaohuopHtml(id);
		},
		guanbiHtml:function(name){
			guanbiHtml(name);
		},
		paoqie:function(){
			paoqie();
		},
		shangxiayou:function(){
			shangxiayou();
		},
		SBshangxiayou:function(){
			SBshangxiayou();
		},
		xingdongfangan:function(){
			xingdongfangan();
		},
		serviceCall:function(p){
			serviceCall(p);
		},
		cancel:function(){
			cancel();
		},
		moderLan:function(){
			moderLan();
		},
		cearModerLan:function(){
			cearModerLan();
		},
		opHtml:function(id,name){			
			opHtml(id,name);
		},
		opHtmlBatch :function(id,name){
			opHtmlBatch(id,name);
		},
		op3DBatch:function(id,view_id){
			op3DBatch(id,view_id);
		},
		opRayBatch:function(id,view_id){
			opRayBatch(id,view_id);
		},
		tuceng:function(tucengID,ishow,view_type){
			tuceng(tucengID,ishow,view_type);
		},
		Gongju:function(){
			Gongju();
		},
		ContrlDeploy3D:function(){
			ContrlDeploy3D();
		},
		opHtmlBatchSend :function(){
			opHtmlBatchSend();
		},
		jiaoben:function(name,id){
			jiaoben(name,id);
		},
		caearjiaoben:function(id){
			caearjiaoben(id);
		},
		opHtmlNoAddArr:function(id){
			opHtmlNoAddArr(id);
		},
		closeyemian:function(name){
			closeyemian(name);
		},
		keshihuayuan:function(){
			keshihuayuan();
		},
		zbz:function(){
			zbz();
		},
		spaceLongCL:function(){
			spaceLongCL();
		},
		gradientCL:function(){
			gradientCL();
		},
		areaCL:function(){
			areaCL();
		},
		jiajiaoCL:function(){
			jiajiaoCL();
		},
		projectionAreaCL:function(){
			projectionAreaCL();
		},
		zbzClose:function(){
			zbzClose();
		},
		quitCeliang:function(){
			quitCeliang();
		},
		yinyingzhedang_shis:function(){
			yinyingzhedang_shis();
		},
		time_range:function(){
			time_range();
		},
		zhuanhxlUpdate:function(id,value){
			zhuanhxlUpdate(id,value);
		},
		zhuanhxlShow:function(id){
			zhuanhxlShow(id);
		},
		zsj:function(){
			zsj();
		},
		fzxsInfoUpdate:function(id,cantaradhour,diradhour,totalradhour){
			fzxsInfoUpdate(id,cantaradhour,diradhour,totalradhour);
		},
		fsqdInfoUpdate:function(id,gradavg,canradext,sradavg,dradavg){
			fsqdInfoUpdate(id,gradavg,canradext,sradavg,dradavg);
		},
		jylInfoUpdate:function(id,rain10,raintotal){
			jylInfoUpdate(id,rain10,raintotal);
		},
		tqInfoUpdate:function(id,winspext,windirext,preext,humext,tempext){
			tqInfoUpdate(id,winspext,windirext,preext,humext,tempext);
		},
		zhuanhxlUpdate:function(id,value){
			zhuanhxlUpdate(id,value);
		},
		getJingTou:function(type,typeceng,id){
			getJingTou(type,typeceng,id);
		},
		removebh:function(type,typeceng,id){
			removebh(type,typeceng,id);
		},
		shistq:function(){
			shistq();
		},
		tkhyingcang:function(){},
		tkhyingcangClose:function(){},
		bioahuiYuan:function(){bioahuiYuan();},
		bioahuiXian:function(){bioahuiXian();},
		bioahuiMian:function(){bioahuiMian();},
		bioahuiQuxiao:function(){bioahuiQuxiao();},
		drawMian:function(p){drawMian(p);},
		drawXian:function(p){drawXian(p);},	
		drawdian:function(x,y){drawdian(x,y)}

	} 
}();