<template>
	<div :id="ids" class="barHeights">

	</div>
</template>

<script>
	export default{
		props:{
			
			ids:{
				default:"echartlines"
			},
			seriesData :{
				default:function(){
					return  [
						{
						name:'新增',
						type:'bar',
						data:[10,15, 30, 45, 55, 60, 62, 80,80,62, 60, 55, 45, 30, 15, 10],
						barWidth: 6,
						barGap:0,//柱间距离
						// label: {//图形上的文本标签
						//     normal: {
						//       show: true,
						//       position: 'top',
						//       textStyle: {
						//           color: '#a8aab0',
						//           fontStyle: 'normal',
						//           fontFamily: '微软雅黑',
						//           fontSize: 12,   
						//       },
						//     },
						// },
					itemStyle: {
						normal: {
							show: true,
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#17e0be'
							}, {
								offset: 1,
								color: '#17e0be'
							}]),
						}
						},
					},
					{
						name:'累计',
						type:'bar',
						data:[8,5, 25, 30, 35, 55, 62, 78,65,55, 60, 45, 42, 15, 12, 5],
						barWidth: 6,
						barGap:0,//柱间距离
						// label: {//图形上的文本标签
						//     normal: {
						//       show: true,
						//       position: 'top',
						//       textStyle: {
						//           color: '#a8aab0',
						//           fontStyle: 'normal',
						//           fontFamily: '微软雅黑',
						//           fontSize: 12,   
						//       },
						//     },
						// },
						itemStyle: {
						normal: {
							show: true,
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#51a4ff'
							}, {
								offset: 1,
								color: '#51a4ff'
							}]),
						}
						},
					}
				]
				
				}
			},
	
				
		subText:{
			default:""
			},
		title:{
			default:""
		},	
		},
		data(){
			return{
				
			}
		},
		mounted(){
			// this.$nextTick(() => {
				// console.log('11',this.$echarts)
				// debugger
				this.setEcharts(this.seriesData);
			// })
		},
		methods:{
			setEcharts(series){
				let echarts = this.$echarts;
				var dataShadow = [];
				var legend=[];
				for(var item in series){
					legend.push(item.name)
				}
				let myChart=echarts.init(document.getElementById(this.ids));

				var option = {
					title: {
					text: this.title,
					left:18,
					top: 0,
					textStyle: {
					color: '#82c2eb',
					fontFamily:"PingFang SC",
					fontSize:14
					},
					subtext:this.subText,
					subtextStyle: {
					width:'100%',
					align:"center",
					color: '#82c2eb',
					fontFamily:"PingFang SC",
					fontSize:14
					},
				},
						tooltip: { //提示框组件
							trigger: 'axis',
							formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
							axisPointer: {
								type: 'shadow',
								label: {
									backgroundColor: '#6a7985'
								}
							},
							textStyle: {
								color: '#fff',
								fontStyle: 'normal',
								fontFamily: 'PingFang-SC-Regular',
								fontSize: 12,
							}
						},
						grid: {
							left: '10%',
							right: '10%',
							bottom: '16%',
							top:'25%',
						//	padding:'0 0 10 0',
							containLabel: true,
						},
						
					legend: {//图例组件，颜色和名字
						left:'30%',
							top:'6%',
							barBorderRadius:2,
							itemGap: 16,
							itemWidth: 6,
							itemHeight: 6,
							data:[{
							name:'新增',
							//icon:'image://../wwwroot/js/url2.png', //路径
						},
						{
							name:'累计',
						}],
						// data:legend,
						textStyle: {
								color: '#82c2eb',
								fontFamily: 'PingFang-SC',
								fontSize: 12,            
						}
					},
				   xAxis: [
							{
								type: 'category',
							//	boundaryGap: true,//坐标轴两边留白
								data: ['2016', '2017', '2018','2019','2020'],
								axisLabel: { //坐标轴刻度标签的相关设置。
							//		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
								//	margin:15,
									textStyle: {
										color: '#82c2eb',
										fontFamily: 'PingFang-SC',
										fontSize: 12,
									},
									rotate:0,
								},
								axisTick:{//坐标轴刻度相关设置。
									show: false,
								},
								axisLine:{//坐标轴轴线相关设置
									lineStyle:{
										color:'#fff',
										opacity:0.2
									}
								},
								splitLine: { //坐标轴在 grid 区域中的分隔线。
									show: false,
								}
							}
						],
						yAxis: [
							{
								type: 'value',
								splitNumber: 5,
								axisLabel: {
									textStyle: {
										color: '#a8aab0',
										fontFamily: 'PingFang-SC',
										fontSize: 12,
									}
								},
								axisLine:{
									show: false
								},
								axisTick:{
									show: false
								},
								splitLine: {
									show: true,
									lineStyle: {
										color: ['#fff'],
										opacity:0.06
									}
								}

							}
						],
						

						
					
				    series: series
				};
				myChart.setOption(option);

			}
		},
		watch:{

		},
		created(){

		},
		
		destoryed(){

		}
	}
</script>

<style>
.barHeights {
	/* position: relative;
    top: -100px; */
    height:180px;
  }
</style>
