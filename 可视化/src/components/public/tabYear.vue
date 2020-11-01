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
			yearArr: ["2015年第一批", "2016年第二批", "2017年第三批", "2018年", "2019年第三批奖励", "2020年"],
			timesArr:[],
			is_month:false,
			index:5,
			yeartext:'月',
			is_showMonth:true,
			 effctData: [],
		}
	},
	mounted(){
		this.getYear()
		// this.timesmap(this.times)
		 this.getEffctData();
		this.timesmap(this.yearArr,this.index)
		this.is_showMonth = localStorage.getItem("is_showMonth")==null?true:JSON.parse(localStorage.getItem("is_showMonth"))
	
	},
	methods:{
		//获取年份
		getYear(){
			let nowYear = new Date().getFullYear();
			// let yearNum = new Array(6).fill({}).map((item,index)=>{
			// 	return nowYear - index +"年"
			// })
			// this.yearArr = yearNum.reverse();
			this.timesArr = this.yearArr
			localStorage.setItem("timeYear",nowYear)
		},
		timesmap(data,index){
			let _that = this
			let myChart = this.$echarts.init(document.getElementById("timesmap"));
			let optionXyMap01 = {
				 baseOption: {
					tooltip: {
						trigger: 'axis',
						axisPointer: { 
							type: 'shadow', 
							shadowStyle: {
								color: 'rgba(150,150,150,0.1)' 
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
					bottom: '10%',
					width: '100%',
					label: {
						 normal: {
							formatter: function(params) {
								var newParamsName = "";
								var paramsNameNumber = params.length;
								var provideNumber = 5;
								if ((paramsNameNumber > provideNumber)&&provideNumber!==-1) {
								var tempStr = "";
								tempStr =params.substring(0, provideNumber) + "\n" +params.substring(provideNumber, paramsNameNumber);
								newParamsName = tempStr;
								} else {
								newParamsName = params;
								}
								return newParamsName;
							},
							position:15,
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
					symbolSize: 20,
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
				if(timeVal.length>4){
					yearnum = timeVal.substring(0,4)
				}else{
					yearnum =  timeVal.substring(0,4) +"-"+_that.monthArr[timeLineIndex.currentIndex]
				}
				localStorage.setItem("timeYear",yearnum)
				_that.showdata(timeLineIndex.currentIndex,yearnum)
			});
		},
		showdata(index,yearnum){
				if(this.is_showMonth) return
				this.CloseRunMapsss()
				localStorage.setItem("index",index)
				let val =parseInt(localStorage.getItem("val"))
				switch (val) {
					case 0:
						clearTimeout(time);
						time = setTimeout(() => {
							
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格第一批);

							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格第二批);

							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

							}

						}, 300);

						break;
					case 1:
						clearTimeout(time);
						time = setTimeout(() => {
							
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析占比第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析占比第二批);
							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析占比);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
							}
						}, 300);

						break;
					case 2:
						// this.statistical() ;
						clearTimeout(time);
						time = setTimeout(() => {
							
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率第二批);
							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
							}
						}, 300);
						break;
					case 3:
						clearTimeout(time);
						time = setTimeout(() => {
							
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析第二批);
							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
							}
						}, 300);
						break;
					case 4:
						clearTimeout(time);
						time = setTimeout(() => {
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析第二批);
							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
							}
						}, 300);
						break;
					case 5:
						clearTimeout(time);
						time = setTimeout(() => {
							this.oprationMapServer(this.effctData.领跑基地.光资源调用);
							// 
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析发电能效分析第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析发电能效分析第二批);
							}else{
								this.oprationMapServer(this.effctData.运行监测.调用能效比和光源点);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

							}

						}, 300);
						break;
					case 6:
						clearTimeout(time);
						time = setTimeout(() => {
							
							if(parseInt(yearnum) == 2015){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析第一批);
							}else if(parseInt(yearnum) == 2016){
								this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析第二批);
							}else{
								this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析);
								this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
							}
						}, 300);
						break;


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
		},
		changemonth(){
			
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
		CloseRunMapsss() {
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