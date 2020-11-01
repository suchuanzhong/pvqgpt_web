
var poup=(function(){
	function poup(){

	};
	poup.prototype.viewer=null;
	poup.prototype.tackedEntity=null;
	poup.prototype.elementName='';
	poup.prototype.width=0;
	poup.prototype.height=0;
	poup.prototype.postRenderHander=null,
	poup.prototype.yoffset=-30;
	/*
	@entity 弹出框绑定的entity对象
	@viewer 场景中viewer对象
	@elementName 弹出框的对象id
	*/
	poup.prototype.showTrackWithEntity=function(entity,viewer,elementName,yoffset){
		var popup = this;
		popup.rset();
		popup.elementName=elementName
		this.trackedEntity=entity;
		if(yoffset)
		this.yoffset=yoffset;
		var scene = viewer.scene;
		this.viewer = viewer;
		var popupObj=this.getElement();
		popupObj.style.display='block';
		var handler = scene.postRender.addEventListener(function (a,b,c) {			
			var loc = popup.trackedEntity.position.getValue(b);
			if(!loc) {
				
				popup.popupClose();
				scene.postRender.removeEventListener(handler);
				return
			}
			var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, loc);
			try {
				popup.setWindowsLoc(changedC.x, changedC.y);

			} catch (e) {

			}

			return false;
		});
		popup.postRenderHander=handler;
	};
    poup.prototype.rset=function(){
		this.popupClose();
		this.width=0;
		this.height=0;
		if(this.postRenderHander){
			this.viewer.scene.postRender.removeEventListener(this.postRenderHander);
			this.postRenderHander=null;
		}
		this.viewer=null;
	};
	poup.prototype.popupClose=function () {
		var obj =this.getElement();
		if (obj) {
			obj.style.display = "none";
		}
	};
	poup.prototype.isShow=function (isHidden) {
		var obj = this.getElement();
		if (!isHidden) {
			return obj;
		} else {
			var isHidden = $(obj).is(":visible");
			return isHidden;
		}
	}
	poup.prototype.setWindowsLoc=function (left, top) {
		var popupObj = this.isShow();
		if (popupObj) {
			var wid = popupObj.clientWidth;
			var hei = popupObj.clientHeight;

			// 差距在1之上才修改，防止弹窗跳动的问题
			var diffW = wid - this.width;
			var diffH = hei - this.height;
			if (Math.abs(diffH)>1||Math.abs(diffW)>1) {
				this.width = wid;
				this.height = hei;
			}
			
			popupObj.style.left = (left - this.width * 0.5) + "px";
			popupObj.style.top = (top - this.height +this.yoffset) + "px";
		}
	};
	poup.prototype.getElement=function(){
		var obj =this.elementName?document.getElementById(this.elementName): document.getElementById("popup");
		
			return obj;
		
	}
	return poup;
})()
export default poup



/*
export function popup (){
		viewer: null,
		loc:null,
		tackedEntity:null,
		elementName:'',
		rset:function(){
			this.popupClose();
			this.loc=null;
			this.viewer=null;
			this.width=0;
			this.height=0;
		},
		showTrackWithEntity:function(entity,viewer,elementName){
			var popup = this;
			popup.rset();
			popup.elementName=elementName
			this.trackedEntity=entity;
			var scene = viewer.scene;
			this.viewer = viewer;
			var popupObj=this.getElement();
			popupObj.style.display='block';
			var handler = scene.postRender.addEventListener(function (a,b,c) {			
				var loc = popup.trackedEntity.position.getValue(b);
				if(!loc) {
					
					popup.popupClose();
					scene.postRender.removeEventListener(handler);
					return
				}
				var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, loc);
				try {
					popup.setWindowsLoc(changedC.x, changedC.y);
	
				} catch (e) {
	
				}
	
				return false;
			});
		},

		width: 0,
		height: 0,
		setWindowsLoc: function (left, top) {
			var popupObj = this.isShow();
			if (popupObj) {
				var wid = $(popupObj).outerWidth();
				var hei = $(popupObj).outerHeight();
	
				// 差距在1之上才修改，防止弹窗跳动的问题
				var diffW = wid - this.width;
				var diffH = hei - this.height;
				if ((diffW > 1 || diffW < -1) &&
					(diffH > 1 || diffH < -1)) {
					this.width = wid;
					this.height = hei;
				}
				
				popupObj.style.left = (left - this.width * 0.5) + "px";
				popupObj.style.top = (top - this.height - 52) + "px";
			}
		},
		isShow: function (isHidden) {
			var obj = this.getElement();
			if (!isHidden) {
				return obj;
			} else {
				var isHidden = $(obj).is(":visible");
				return isHidden;
			}
		},
	
		popupClose: function () {
			var obj =this.getElement();
			if (obj) {
				obj.style.display = "none";
			}
		},
		getElement:function(){
			var obj =this.elementName?document.getElementById(this.elementName): document.getElementById("popup");
			
				return obj;
			
		}
	}
	}

*/