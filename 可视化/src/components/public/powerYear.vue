<template>
	<div class="w_1220  page2_area">
		<div class="pagebox">
			<div id="timesmap" class="timeline" ></div>
			<div v-if="is_showMonth" class="monthcls" @click="changemonth">{{yeartext}}</div>
		</div>
	
	</div>
</template>
<script >
	let time = null;
export default{
	data(){
		return{
			monthArr:["01","02","03","04","05","06","07","08","09","10","11","12"],
			yearArr: ["2015 ","2016","2017","2018","2019"],
			timesArr:[],
			is_month:false,
			titleData: [],
			index:5,
			yeartext:'月',
			is_showMonth:true,
			tableList: [
				// {title:'',value:0,css1:false,titledatas:""},
				{title: '组件价格趋势分析', value: 0, css1: false, titledatas: "组件价格趋势分析专题图"},
				{title: '组件占比趋势分析', value: 1, css1: false, titledatas: "组件占比趋势分析专题图"},
				{title: '组件转换趋势分析', value: 2, css1: false, titledatas: "组件转换趋势分析专题图"},
				{title: '逆变器分析', value: 3, css1: true, titledatas: "逆变器分析专题图"},
				{title: '支架分析', value: 4, css1: true, titledatas: "支架分析专题图"},
				{title: '发电能效分析', value: 5, css1: true, titledatas: "发电能效分析专题图"},
				{title: '成本分析', value: 6, css1: true, titledatas: "成本分析专题图"}

			],
		}
	},

	mounted(){
		this.getYear()
		// this.timesmap(this.times)

		this.timesmap(this.yearArr,this.index)
		this.is_showMonth = localStorage.getItem("is_showMonth")==null?true:JSON.parse(localStorage.getItem("is_showMonth"))
		console.log(typeof this.is_showMonth)
	},
	methods:{
		//获取年份
		getYear(){
			let nowYear = new Date().getFullYear();
			let yearNum = new Array(6).fill({}).map((item,index)=>{
				return nowYear - index +"年"
			})
			this.yearArr = yearNum.reverse();
			this.timesArr = this.yearArr
			localStorage.setItem("timeYear",nowYear)
		},
		timesmap(data,index){

			let _that = this
			let myChart = this.$echarts.init(document.getElementById("timesmap"));
			let optionXyMap01 = {
				 baseOption: {
					tooltip: {
						trigger: 'axis', // hover触发器
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
							shadowStyle: {
								color: 'rgba(150,150,150,0.1)' //hover颜色
							}
						}
					}
            	},
				timeline: {
					data: data,
				
					axisType: 'category',
					rewind:true,
					autoPlay: false,
					currentIndex:index,
					playInterval: 5000,
					left: '0',
					bottom: '20%',
					width: '100%',
					//  height: null,
					label: {
						normal: {
							textStyle: {
								color: '#7fd4ff'
							}
						},
						emphasis: {
							textStyle: {
								color: '#7fd4ff'
							}
						}
					},
					symbolSize: 10,
					lineStyle: {
						color: '#7fd4ff'
					},
					itemStyle:{
						 normal:{
							color:'#7fd4ff'
						},
						emphasis:{
							color:'#7fd4ff'
						}
					},
					checkpointStyle: {
						borderColor: '#7fd4ff',
						color: '#7fd4ff',
						borderWidth: 5
					},
					controlStyle: {
						showNextBtn: true,
						showPrevBtn: true,
						normal: {
							color: '#7fd4ff',
							borderColor: '#7fd4ff'
						},
						emphasis: {
							color: '#a7fd4ffaa',
							borderColor: '#7fd4ff'
						}
					},

				}
        	};
			myChart.setOption(optionXyMap01);
			myChart.on('timelinechanged', function (timeLineIndex) {

				let timeVal = _that.timesArr[timeLineIndex.currentIndex];
				let yearnum =''
				if(timeVal.length==5){

					yearnum = timeVal.substring(0,4)
				}else{
					yearnum =  timeVal.substring(0,4) +"-"+_that.monthArr[timeLineIndex.currentIndex]
				}
				localStorage.setItem("timeYear",yearnum)
				localStorage.setItem("index",index)

				let title = localStorage.getItem("titledata")
				let obj = {
					titleText: title
				}

					util3D.closeyemian("顶部标题");
					localStorage.setItem("titledata", JSON.stringify(obj))
					util3D.opHtmlBatch(parseInt("202008151551"), "顶部标题")
					util3D.opHtmlBatchSend();
					let val = localStorage.getItem("val")
					switch (val) {
						case 0:
							clearTimeout(time);
							time = setTimeout(() => {

								if(parseInt(yearnum) == 2015){

									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-组件价格-第一批"
									}]);

								}else if(parseInt(yearnum) == 2016){

									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-组件价格-第二批"
									}]);

								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-组件价格"
									}]);
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-能效比-点光源-基地名称"
									}]);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

								}
							}, 300);

							break;
						case 1:
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-占比-第一批"
									}]);
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-占比-第二批"
									}]);
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-占比"
									}]);
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-饼图-各基地名称"
									}]);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析占比);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
								}

							}, 300);

							break;
						case 2:
							// this.statistical() ;
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-转换效率-第一批"
									}]);
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-转换效率-第二批"
									}]);
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-转换效率"
									}]);
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-能效比-点光源-基地名称"
									}]);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
								}

							}, 300);
							break;
						case 3:

							// this.Internet();
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-逆变器分析-第一批"
									}]);
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-逆变器分析-第二批"
									}]);
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-逆变器分析"
									}]);
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-能效比-点光源-基地名称"
									}]);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析);
									// _that.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
								}
							}, 300);
							break;
						case 4:
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-支架分析-第一批"
									}])
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-支架分析-第二批"
									}])
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-支架分析"
									}])
								}
							}, 300);
							break;
						case 5:
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-发电能效分析-第一批"
									}])
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-发电能效分析-第二批"
									}])
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-光资源"
									}])
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-能效比-点光源"
									}])
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-能效比-点光源-基地名称"
									}])
									// _that.oprationMapServer(this.effctData.领跑基地.光资源调用);
									// _that.oprationMapServer(this.effctData.运行监测.调用能效比和光源点);
									// _that.oprationMapServer(this.effctData.统计分析.调用统计分析基地名称);

								}

							}, 300);
							break;
						case 6:
							// this.Electricityprice();
							clearTimeout(time);
							time = setTimeout(() => {
								if(parseInt(yearnum) == 2015){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-成本分析-第一批"
									}])
								}else if(parseInt(yearnum) == 2016){
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-成本分析-第二批"
									}])
								}else{
									_that.oprationMapServer([{
										service_id: "cfg_system.run",
										name: "全国平台-综合分析-成本分析"
									}])
								}
							}, 300);
							break;


					}
				this.OpenYearRunmap()
			});
		},
		OpenYearRunmap(){
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
			this.oprationMapServer(this.effctData.运行监测.关闭能效比和光源点);
			this.oprationMapServer(this.effctData.运行监测.关闭统计分析基地名称);
			this.oprationMapServer(this.effctData.领跑基地.光资源关闭);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第一批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第二批);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析);
			this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析);
		},
		changemonth(index){

			this.is_month = !this.is_month
			let newmonth =  ["1","2","3","4","5","6","7","8","9","10","11","12"]
			let yearNum = localStorage.getItem("timeYear").substring(0,4)
			if(this.is_month){
				this.yeartext="年"
				let monthline = newmonth.map((item,index)=>{
					return `${yearNum}年${item}月`
				})
		
				this.timesArr = monthline
				this.index = 0
				this.timesmap(this.timesArr,this.index)
				localStorage.setItem("timeYear",yearNum+"-01")
			}else{
				this.yeartext="月"
				this.getYear()
				this.timesmap(this.yearArr)
			}
			
		},
		oprationMapServer(data) {
			console.log(data)
			try {
				RESAFETY.callService(data);
			} catch (e) {
				console.log('w',e);
			}
		},
		getEffctData() {
			$.ajax({
				url: "json/3D_effect.json",
				async: false,
				type: "get",
				dataType: "json",
				success: res => {
					this.effctData = res;
				}
			});
		}
	}
}
</script>

<style scoped>

.w_1220,.pagebox{max-width: 685px;min-width: 685px; width:96%;height: 120px;}

.timeline{float: left;max-width: 650px;min-width: 650px;height: 120px;}
.monthcls{
	float: left;
	width: 30px;
	height: 30px;
	margin: 45px 0 0 5px;
	line-height: 30px;
	text-align: center;
	border-radius: 50%;
	background-color: #7fd4ff;
	color: #fff;
}
</style>