window.apiBasePath =(function(){
	var bp;
	if(!bp){
		var scripts=document.getElementsByTagName('script');
		if(scripts){
			var end='api/resafety_page.js';
			var src;
			for( var i=scripts.length-1; i>=0; i--){
				src = scripts[i].src.split('?')[0];
				if( src.indexOf(end)==src.length-end.length ){
					bp = src.substring(0, src.indexOf(end));
					break;
				}
			}
		}
	}


	if(!bp){
		bp=document.location.origin+'/';
	}
	return bp;
})();

(function(){

	if( !window.JSON || !window.JSON.stringify ){
		window.JSON2=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}return{stringify:function(value,replacer,space){var i;gap="";indent="";if(space){if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}}if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined}return value}}else{if(typeof replacer==="function"||(typeof replacer==="object"&&typeof replacer.length==="number")){rep=replacer}else{throw new Error("JSON.stringify")}}return str("",{"":value})},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")},quote:quote}}();
		if( window.JSON ){
			window.JSON.stringify = window.JSON2.stringify;
		}
		else{
			window.JSON = window.JSON2;
		}
	};

	if( !window.console ){
		window.console = {
			log: function( info ){
				// alert( info );
			}
		}
	}


	var apiBasePath=getBasePath();

	var get_async_delay=1000;//每隔多长时间查询一下异步数据

	var callback_cache={};
	var callback_cache_delay={};
	var callback_cache_delay_max=1000*60*2+1000;//callback数据请求多长时间超时，默认>=2分钟

	var function_call_cache={};
	var get_async_data_timer;
	var get_async_data_ing;


	/**
	 * 在页面中调用服务
	 * @param 
	 * 		json {}或[{}] 要调用的服务
	 * 		async true或false 同步ajax还是异步ajax，不传时默认为true--异步
	 */
	function callService(service, async){
		if(typeof parent.sendMessage == 'function'){//如果时云渲染方式，统一通过上层页面的sendMessage方法发送消息
			var service_str = JSON.stringify(service);
			service_str=service_str.replace(/\$resafety_browser_title\$/g,document.title);
			parent.sendMessage(service_str);
			return;
		}
		if(typeof(service)=='string'){
			try{
				service=eval('('+service+')');
			}
			catch(e){
				alert('error：'+service+' 格式错误');
			}
		}
		if(!service) return;
		if(async===false)  async=false;
		else async=true;

		if($.isArray(service)){
			for(var i=0;i<service.length;i++){
				callService(service[i], async);
			}
		}
		else{
			var service_id=service.service_id;
			if(!service_id){
				var rp=get_parent_rp() || resafety_page;
				if(rp.debug){
					alert('error：没有service_id '+JSON.stringify(service));
				}
				return;
			}

			var callback=service.callback;
			if(callback){
				if(typeof(callback)=='string'){
					callback=window[callback];
				}
				var key=guid();
				var top_rp=get_parent_rp() || resafety_page;				
				top_rp.callback_cache[key]=callback;
				service.callback=key;
				console.log('发送消息： '+service.callback);
			}
			if(!in_resafety_browser() || is_must_to_server(service)){//如果当前页面不在内置浏览器中或者是必须要发送到服务器端消息总线的服务
				send_service_to_server(service, async);
			}
			else{
				console.log('发送消息： '+JSON.stringify(service));
				send_service_to_agent(service);
			}

		}

	}


	/**
	 * 判断是否是再内嵌的浏览器中打开
	 */
	function in_resafety_browser(){
		var w = getDomainTopWindow();
		if(w['resafety_browser'] && w['resafety_browser'].call_service){
			return true;
		}
		return false;
	}


	/**
	 * 判断是否必须发动到服务器上得消息总线上
	 */
	function is_must_to_server(service){
		var service_id=service.service_id;
		if(service_id=='999999' 
			|| service_id=='browser.openModule' 
			|| service_id=='500' 
			// || (service_id+'').indexOf('sys3d.')==0
			){

			return true;
		}
		return false;
	}


	function get_url_param(name, search){
		search = search || window.location.search;
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = search.substr(1).match(reg);
		if (r!=null) {
			return decodeURI(r[2]); 
		}
		else{
			var w=getDomainTopWindow();
			r = w.location.search.substr(1).match(reg);
			if (r!=null) {
				return decodeURI(r[2]); 
			}
		}
		return null;
	} 


	/**
	 * 直接发送service到三维agent
	 */
	function send_service_to_agent(service){
		if( window.resafety_browser && window.resafety_browser.call_service ){
			if( !service.terminal_id || service.terminal_id == '' ){
				service.terminal_id = '$resafety_browser_terminal_id$';
			}


			//因为三维和agent里有部分地方没有处理callback_service里的terminal_id的事儿，所以需要临时在这里处理一下
			if( service.callback_service ){
				if( $.isArray( service.callback_service ) ){
					for( var i=0; i<service.callback_service.length; i++ ){
						if( !service.callback_service[i].terminal_id || service.callback_service.terminal_id[i] == '' ){
							service.callback_service[i].terminal_id = '$resafety_browser_terminal_id$';
						}
					}
				}
				else{
					if( !service.callback_service.terminal_id || service.callback_service.terminal_id == '' ){
						service.callback_service.terminal_id = '$resafety_browser_terminal_id$';
					}
				}
			}


			window.resafety_browser.call_service( JSON.stringify( service ) );

			return;
		}
		
		var w = getDomainTopWindow();
		if(w['resafety_browser'] && w['resafety_browser'].call_service){
			if(!service.terminal_id){
				service.terminal_id = get_url_param('terminal_id');
			}
			if(!service.terminal_id || service.terminal_id == '' ){
				service.terminal_id = '$resafety_browser_terminal_id$';
			}
			w['resafety_browser'].call_service(JSON.stringify(service));
		}		
	}


	/**
	 * 发送service到服务器端的消息总线
	 */
	function send_service_to_server(service, async){
		if(typeof(service)=='string'){
			service=eval('('+service+')');
		}

		var terminal_id=get_url_param('terminal_id');
		if((!terminal_id || terminal_id=='') && service.terminal_id){
			terminal_id=service.terminal_id;
		}

		service=JSON.stringify(service);
		$.ajax({
			type: 'POST',
			url: apiBasePath+'service/exec',
			data: {'service': encodeURIComponent(service), 'terminal_id':terminal_id, 'jsonp':true},
			// dataType: 'script',
			dataType: isCrossDomain() ? 'jsonp' : 'json',
			cache: false,
			global: false,
			async: async,
			success: function(msg){
				var rp=get_parent_rp() || resafety_page;
				if(rp.debug){
					alert('接口发送到消息总线并返回 '+JSON.stringify(msg));
				}
				
				if(service.callback){
					var top_rp=get_parent_rp() || resafety_page;
					top_rp.getAsyncData();
				}
				
			},
			error: function(){
				var rp=get_parent_rp() || resafety_page;
				if(rp.debug){
					alert('error：发送到消息总线发生异常');
				}
			}
		});
	}


	//生成一个唯一id号
	function guid(){
		var guid='';
		for(var i=1;i<=32;i++){
			var n=Math.floor(Math.random()*16.0).toString(16);
			guid+=n;
			if( i==8 || i==12 || i==16 || i==20 ){
				guid+='-';
			}
		}
		return guid;
	}


	/**
	*获得本域下的最顶层的window对象
	*/
	function getDomainTopWindow(){
		var wd=window;
		try{
			while(wd.parent!=wd && wd.parent.location.href){
				wd=wd.parent;
			}
		}
		catch(e){
			//跨域时返回异常
		}

		return wd;
	}


	/**
	*获得basePath
	*/
	function getBasePath(){
		var bp = window.apiBasePath || window.basepath;
		if(!bp){
			var scripts=document.getElementsByTagName('script');
			if(scripts){
				var src=scripts[scripts.length-1].src;
				src=src.split('?')[0];
				var end='plugins/resafety/resafety_page.js';
				if( src.indexOf(end)>-1 && src.indexOf(end)==src.length-end.length ){
					bp=src.substring(0, src.indexOf(end));
				}
			}
		}


		if(!bp){
			bp=window['basePath'];
		}

		if(!bp){
			bp='http://127.0.0.1:8080/R_KJ/';
		}

		return bp;
	}


	/**
	*是否跨域
	*/
	function isCrossDomain(){
		var url=document.location.href+'';
		if(url.indexOf(getBasePath())==-1){
			return true;
		}

		return false;
	}


	/**
	*获得本模块或页面下的最顶层的window对象
	*/
	function getModuleTopWindow(){
		var wd=window;
		try{
			while(wd.parent!=wd && !wd.parent.platform2d){
				wd=wd.parent;
			}
		}
		catch(e){
			//跨域时返回异常
		}

		return wd;
	}


	function get_parent_rp(){
		var wd=getDomainTopWindow();
		return wd.resafety_page;
	}

/*
	function debugEvent(){
		try{
			if(!$) return;
			$(function(){
				//调试输出
				$(document).bind('keyup', function(e){
					if(e.keyCode==120){
						var rp=get_parent_rp() || resafety_page;
						rp.debug=!rp.debug;
						if(rp.debug){
							alert('开启JCallC接口调试.');
						}
						else{
							alert('关闭JCallC接口调试.');
						}
					}
				});

				//修改F5和F12
				$(document).bind('keydown', function(e){
					if(e.ctrlKey && e.keyCode==115){
						if(window['resafety_browser'] && window['resafety_browser'].reloadIgnoreCache){
							window['resafety_browser'].reloadIgnoreCache();
						}
					}
					if(e.ctrlKey && e.keyCode==123){
						if(window['resafety_browser'] && window['resafety_browser'].show_dev){
							window['resafety_browser'].show_dev();
						}
					}
				});

			}); 
		}
		catch(e){}
	}

	debugEvent();
	
*/
	/**
	*查询服务器上得缓存池，看是否有回调数据传回或新的方法调用
	*/
	function getAsyncData(){
		if(get_async_data_ing){
			return;
		}
		get_async_data_ing=true;

		if(get_async_data_timer){
			clearTimeout(get_async_data_timer);
		}

		var callback_data_keys=[], function_call_keys=[];
		for(var key in callback_cache){
			callback_data_keys.push(key);
		}
		for(var key in function_call_cache){
			function_call_keys.push(key);
		}

		if(callback_data_keys.length==0 && function_call_keys.length==0){
			return;
		}

		$.ajax({
			type: 'POST',
			url:apiBasePath+'action/ms_server/MSServerAction!getAsyncData.action',
			data: {'callback_data_keys':callback_data_keys, 'function_call_keys':function_call_keys},
			dataType: 'json',
			cache:false,
			global: false,
			success: function(msg){
				//处理callback数据
				var callback_datas=msg.callback_datas;//json格式，key为callback_data_keys中的key，value为callback_data
				for(var i=0;i<callback_data_keys.length;i++){
					var key=callback_data_keys[i];
					if(callback_datas && (key in callback_datas) && (key in callback_cache)){
						try{
							callback_cache[key](callback_datas[key]);
						}
						catch(e){}
						
						delete callback_cache[key];
					}
					else{
						if(!callback_cache_delay[key]){
							callback_cache_delay[key]=0;
						}
						callback_cache_delay[key]+=get_async_delay;

						if(callback_cache_delay[key]>=callback_cache_delay_max){
							delete  callback_cache[key];
							alert('info：等待异步callback数据超时，'+callback_cache[key].toString()+'被移出！');
						}
					}
				}

				var function_calls=msg.function_calls;//json格式，key为function_call_keys中的key，value为function_param
				for(var i=0;i<function_call_keys.length;i++){
					var key=function_call_keys[i];
					if(function_calls && (key in function_calls) && (key in function_call_cache)){
						try{
							for(var j=0;j<function_calls[key].length;j++){
								function_call_cache[key](function_calls[key][j]);
							}							
						}
						catch(e){}
					}
				}

				get_async_data_timer=setTimeout(getAsyncData, get_async_delay);
				get_async_data_ing=false;
			},
			error: function(){
				var rp=get_parent_rp() || resafety_page;
				if(rp.debug){
					alert('error：向消息总线获取异步数据发生异常');
				}
				get_async_data_timer=setTimeout(getAsyncData, get_async_delay);
				get_async_data_ing=false;
			}
		});
	}


	/**
	*发布页面上的js方法给三维或第三方调用(通过service方式)
	*/
	function publishFunction(fun){
		var top_window=getModuleTopWindow();
		var title=top_window.document.title;
		var function_obj;
		var function_name;
		if(typeof(fun)=='function'){
			try{
				function_name=fun.toString().match(/function\s+([^\(]+)\s*\(/i)[1];
			}
			catch(e){
				alert('error：publishFunction 获取function参数字符串名称失败！');
				return;
			}

			function_obj=fun;
		}
		else if(typeof(fun)=='string'){
			function_name=fun;
			function_obj=window[fun];
		}
		else{
			alert('error：publishFunction 参数格式不正确！');
			return;
		}

		var top_rp=get_parent_rp() || resafety_page;
		var key=function_name+'@'+title;
		if(top_rp){
			top_rp['function_call_cache'][key]=function_obj;
			top_rp.getAsyncData();
		}

		//页面关闭时移出队列里的内容
		$(window).bind('unload', function(){
			if(top_rp){
				delete top_rp['function_call_cache'][key];
			}
		});
	}


	var getWinTitle = function(){
		if(typeof parent.sendMessage != 'undefined') {
			return document.title;
		}
		return '$resafety_browser_title$';
/*

		var w = getDomainTopWindow();
        var title = w && w.document ? w.document.title : document.title;
        if( title && title != '' ){
        	return title;
        }
        var search = w.document.location.search ? w.document.location.search : document.location.search;
        title = get_url_param( 'name', search );
        return title;
*/
	}



	//为vrinterface提供回调方法
	var callback_fun = {};
	var callback = function( service ){
		var w = getDomainTopWindow();
		var callback_data = service.callback_data;
		if( callback_data ){
			if( callback_data.indexOf('{') == 0 ){
				callback_data = eval( '(' + callback_data + ')' );
				callback_data = callback_data.result_xml;
			}
			callback_data = callback_data.replace(/\n/g, '');
			callback_data = callback_data.replace(/Input/g, 'response');
			if( callback_data.indexOf('response') == -1 ){
				callback_data = '<response>' + callback_data + '</response>';
			}
		}
		var callback_key = service.callback_key;
		if( w.RESAFETY.callback_fun[callback_key] ){
			w.RESAFETY.callback_fun[callback_key].call(window, callback_data);
			delete w.RESAFETY.callback_fun[callback_key];
		}

	}


	var cacheCallback = function( func ){
		var key = ( new Date() ).getTime() + '' + Math.round( Math.random() * 1000 );
		var w = getDomainTopWindow();
		w.RESAFETY.callback_fun[key] = func;

		return key;
	}

	var finishCallback = function( key ){
		var w = getDomainTopWindow();
		return !w.RESAFETY.callback_fun[key];
	}



	//如果父级页面没有导入该文件，则把RESAFETY变量赋给父级页面
	var copyToTopWindow = function(){
		var w = getDomainTopWindow();
		if( !w.RESAFETY ){
			w.RESAFETY = window['RESAFETY'];
		}
		if( !w.JSON ){
			w.JSON = window['JSON'];
		}
	}

	copyToTopWindow();


	// 使ActiveXObject对象在非支持的浏览器上返回字符串
	var setActiveXObject = function(){
		if( !window.ActiveXObject && window.$ ){
			window.ActiveXObject = function(){
				return new Array();
			}
			window.ActiveXObject.prototype = Array.prototype;
			window.ActiveXObject.prototype.loadXML = function( str ){
				var tmp = $( str );
				for( var i=0; i<tmp.length; i++ ){
					this.push( tmp[i] );
				}
			}
		}
	}
	// setActiveXObject();

	//覆盖window.open方法，全部换成使用服务打开，并追加上terminal_id
	var setWindowOpen = function (){
		if( in_resafety_browser() ){
			window.open = function( url, name, features ){
				if( url.indexOf('terminal_id=') < 0 ){
					var terminal_id = get_url_param( 'terminal_id' );
					if( url.indexOf( '?' ) > -1 ){
						url += '&terminal_id=' + terminal_id;
					}
					else{
						url += '?terminal_id=' + terminal_id;
					}
				}
				callService({
					'service_id': 'browser.open',
					'title': name || '新窗口',
					'url': url,
					'width':500,
					'height':500,
					'position': 'center',
					'x_offset': 0,
					'y_offset': 0
				});
			}
		}
	}
	// setWindowOpen();

	var getSynchCallback = function( key ){
		var res;
        $.ajax({
            url: window.apiBasePath + 'msb/ms/legacy/api_sync_invoke_service_cache_get',
            type: 'POST',
            dataType: 'json',
            data: {
            	key: key,
            	terminal_id: get_url_param('terminal_id')
            },
            async: false,
            success: function( data ){
            	if(data){
            		data = data.val;
					if(data && data.indexOf('{') == 0 ){
						data = eval( '(' + data + ')' );
						data = data.result_xml;
						data = data || '';

						data = data.replace(/\n/g, '');
						data = data.replace(/Input/g, 'response');
						if( data.indexOf('response') == -1 ){
							data = '<response>' + data + '</response>';
						}
					}
            	}
            	res = data;
            }
        });

        return res;
	} 


	/**
	 * 用来调用石化老的平台里的xml接口
	 */
	var callServiceXml = function( xml ){
		if( xml == null || typeof xml == 'undefined' || ( xml = $.trim( xml ) ) == '' ){
			return;
		}
		if(typeof parent.sendMessageXml == 'function'){
			parent.sendMessageXml(xml);
			return;
		}
		//如果xml没有指定fun则把func追加上
		var full_xml = xml;
		if( xml.toLowerCase().indexOf( '<fun' ) != 0 ){
			full_xml = '<Fun FuncID="50000">' + xml + '</Fun>';
		}

		var service = {
			'service_id': 'advanced_service.call_xml_event',
			'xml': full_xml
		};



        //对窗口控制等service做临时的修改
        var $xml = $( xml );
        switch( $xml.attr( 'EventType' ) ){
            case '窗口最小化' :{
                var title = RESAFETY.getWinTitle();
                var WndName = $xml.attr( 'WndName' );
                if(WndName!='') title = WndName;
                var enable = $xml.attr( 'Enable' );
                if( enable == 1 ){ // 最小化
                    service={
                        'service_id': 'browser.open',
                        'title': title,
                        'position': 'minimized'
                    };
                }
                else if( enable == 0 ){ // 还原
                    service={
                        'service_id': 'browser.open',
                        'title': title,
                        'position': 'restore'
                    };
                }
                break;
            }
            case '窗口关闭' :{
                var title = RESAFETY.getWinTitle();
                var WndName = $xml.attr( 'WndName' );
                if(WndName!='') title = WndName;
                service={
                    'service_id': 'browser.close',
                    'title': title
                };
                break;
            }
            case '窗口置顶':{
                return;
            }
            case '打开Chrome子页面': case '打开IE' :{
            	var url = $xml.attr( 'Url' );
            	// "[WebServer]R_Views/integratedQuery/page/attrConfig.jsp?a=1&amp;r_width=700&amp;r_height=300&amp;r_name=综合查询高级配置&amp;r_pos=lefttop&amp;r_type=0&amp;r_resizable=yes&amp;MACHINEID=[MACHINEID]&amp;r_openw=byChrome"
                url = url.replace( /\[WebServer\]/g, '' );
                
				var reg = new RegExp("(^|&)r_name=([^&]*)(&|$)");
				var title = url.substr(url.indexOf('?')+1).match(reg);
				title = decodeURI(title[2]);
				
				reg = new RegExp("(^|&)r_width=([^&]*)(&|$)");
				var width = url.substr(url.indexOf('?')+1).match(reg);
				width = decodeURI(width[2]);
				
				reg = new RegExp("(^|&)r_height=([^&]*)(&|$)");
				var height = url.substr(url.indexOf('?')+1).match(reg);
				height = decodeURI(height[2]);
				
				reg = new RegExp("(^|&)r_pos=([^&]*)(&|$)");
				var pos = url.substr(url.indexOf('?')+1).match(reg);
				pos = decodeURI(pos[2]);

				reg = new RegExp("(^|&)x_offset=([^&]*)(&|$)");
				var x_offset = url.substr(url.indexOf('?')+1).match(reg);
				if(x_offset)x_offset = decodeURI(x_offset[2]);
				else x_offset = 0;

				reg = new RegExp("(^|&)y_offset=([^&]*)(&|$)");
				var y_offset = url.substr(url.indexOf('?')+1).match(reg);
				if(y_offset)y_offset = decodeURI(y_offset[2]);
				else y_offset = 0;
				// console.log(pos);
				if( !(pos == 'left' || pos == 'right' 
					|| pos == 'top' || pos == 'bottom' 
					|| pos == 'left_top' || pos == 'left_bottom' 
					|| pos == 'right_top' || pos == 'right_bottom'
					|| pos == 'center' || pos == 'maximized'
					|| pos == 'minimized' || pos == 'restore' ) ){
					pos = 'center';
				}

				
				reg = new RegExp("(^|&)r_trans=([^&]*)(&|$)");
				var trans = url.substr(url.indexOf('?')+1).match(reg);
				trans = trans && trans.length > 2 ? decodeURI(trans[2]) : 1;


				var contextPath = document.location.pathname;
				contextPath = contextPath.indexOf('/') == 0 ? contextPath.substring(1) : contextPath;
				contextPath = contextPath.split('/')[0];
				var basePath = document.location.protocol + '//' + document.location.host + '/' + contextPath;
				
				if( url.indexOf( 'http://' ) != 0 && url.indexOf( 'https://' ) != 0 ){
					url = basePath + url;
				}
				
				url= url.replace( title, encodeURIComponent(title) );

				var browser_type = 'chrome_lite';
				if( $xml.attr( 'EventType' ) == '打开IE' ){
					browser_type = 'ie_lite';
				}
				
                service={
                    'service_id': 'browser.open',
                    'title': title,
                    'url': url,
                    'position': pos,
                    "width":width,
                    "height":height,
                    "caption":1,
                    "border":1,
                    "resizeable":1,
                    "x_offset":x_offset,
                    "y_offset":y_offset,
                    "browser_type": browser_type,
                    "transparent": trans
                };
            }
            default:
                break;
        }
		
		callService( service );
		
	}



	/**
	 *	调用同一个teminal打开的其他页面的方法。
	 *		该方法最后两个参数[param, callback]可以不传，也可以同时只传一个；
	 *		如果两个都需要的话，顺序不能错，最后一个表示callback.
	 *	
	 *	@param title 			String 		要调用的方法所在页面的title
	 *	@param function_name 	String 		要调用的方法名称
	 *	@param param 			Object		要传给调用的方法的数据，不需要时可以不传
	 *	@param callback 		Funciton	回调方法，不需要时可以不传
	 *
	 */
	 /*
	var callFunction = function( title, function_name, param, callback ){

		//只传入了两个参数表示单纯的调用其它页面方法，不需要参数和回调
		if( arguments.length == 2 ){ 
			callService( {
				'service_id': 'page.call_function',
				'page_title': title,
				'function_name': function_name
			} );

			return;
		}

		//传入了三个参数，需要判断最后一个参数是要传给被调用方法的数据还是回调方法
		//    判断的依据就是看最后这个参数是不是个funciton，是的话表示回调方法，否则则是要传输的数据
		if( arguments.length == 3 ){
			if( typeof arguments[2] != 'function' ){
				callService( {
					'service_id': 'page.call_function',
					'page_title': title,
					'function_name': function_name,
					'data': param
				} );
			}
			else{
				var tmp_callback_name = 'RESAFETY' + Math.round( Math.random() * 100000000 );
				window[ tmp_callback_name ] = param;
				callService( {
					'service_id': 'page.call_function',
					'page_title': title,
					'function_name': 'RESAFETY.callLocalFunction',
					'real_function_name': function_name,
					'callback_function_name': tmp_callback_name
				} );
			}

			return;
		}


	}
	*/

	var beforeCloseWindow;
	function onBeforeCloseWindow( fn ){
		if( !fn ) return;
		if( typeof fn == 'string' ) fn = eval( fn );
		if( typeof fn != 'function' ) return;

		if( typeof parent.sendMessage == 'function' ){
			// window.onunload = fn;
			beforeCloseWindow = fn;
		} else if( window.resafety_browser && window.resafety_browser.set_onclose ){
			window.resafety_browser.set_onclose( fn );
		}
		else{
			window.onbeforeunload = fn;
		}
	}
	function execBeforeCloseWindow() {
		if(typeof beforeCloseWindow == 'function') {
			beforeCloseWindow();
		}
	}






	var resafety_page={
		'callback_fun' : callback_fun,
		'callback' : callback,
		'cacheCallback' : cacheCallback,
		'finishCallback' : finishCallback,
		'getDomainTopWindow': getDomainTopWindow,
		'getWinTitle': getWinTitle,
		'getSynchCallback': getSynchCallback,

		'callService' : callService,
		'callServiceXml' : callServiceXml,
		'publishFunction' : publishFunction,
		'getAsyncData' : getAsyncData,
		'callback_cache' : callback_cache,
		'function_call_cache' : function_call_cache,
		'onBeforeCloseWindow' : onBeforeCloseWindow,
		'execBeforeCloseWindow' : execBeforeCloseWindow,
		'debug' : false
	}

	window['resafety_page']=resafety_page;
	window['RESAFETY']=resafety_page;


})();

//增加调用ready()，掉完ready()方法后page.call_function方法才会接收到，否则要等到页面内部load_end后才会调用
$( function(){
	if( window.resafety_browser && window.resafety_browser.ready ){
		window.resafety_browser.ready();
	}
} );
