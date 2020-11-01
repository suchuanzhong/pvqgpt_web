<template>
	<div :id="ids" style="height:100%;width:100%;"></div>
</template>
<script>
	export default {
		props: {
			ids:{
				default:"rowBarInit"
			},
			yAxis:{
				default:function(){
					return ['内容一','内容二','内容三']
				}
			},
			data:{
				default:function(){
					return [90,80,70]
				}
			},
			dataTwo:{
				default:function(){
					return [90,80,70]
				}
			},

		},
		mounted() {
			this.$nextTick(()=>{
				this.setEcharts(this.yAxis,this.data,this.dataTwo);
			})



		},
		methods: {
			setEcharts(yData,data,dataTwo) {
				let myChart = this.$echarts.init(document.getElementById(this.ids));
				var option = {
					grid: {
						left: "4%",
						right:'16%',
						top:'6%',
						bottom:'8%',
						containLabel: true
					},
					tooltip: {
						trigger: "item",
						position: "right",
						formatter: function(data) {
							return (
									data.name +
									"：" +
									data.value
							);
						}
					},
					legend: {
						show:false
					},
					// dataZoom: {
					// 	show: true,
					// 	type: "inside",
					// 	orient: "vertical"
					// },
					// dataZoom:[
					// 		{
					// 	show: true,
					// 	type: 'inside',//inside,slider此处只列举inside
					// 	start: data.length>10?30:50,
					// 	orient: "vertical" ,
					// 	// yAxisIndex: [0],
					// 	end: 100,//dataZoom-inside.start 和 dataZoom-inside.end 共同用 百分比 的形式定义了数据窗口范围。
					// 	// yAxisIndex: 0,//不指定时，当 dataZoom-inside.orient 为 'horizontal'时，默认控制和 dataZoom 平行的第一个 xAxis。但是不建议使用默认值，建议显式指定。
					// 	// filterMode: 'none',//dataZoom 的运行原理是通过 数据过滤 来达到 数据窗口缩放 的效果。数据过滤模式的设置不同，效果也不同。('filter','weakfilter','empty','none')http://echarts.baidu.com/option.html#dataZoom-inside
					// }],
					xAxis: {
						type: 'value',
						show:false,
					},
					yAxis: {
						type: 'category',
						data:JSON.parse(JSON.stringify(yData)).splice(0,6),
						axisLine: {
							lineStyle: {
								color: "#afafaf",
								opacity:0.8
							}
						},
						boundaryGap:true,
						axisTick: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: "#82c2eb"
							},
							margin: 14,
							fontSize: 12,
							fontFamily: "PingFang-SC-Medium"
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						name: '单晶',
						type: 'bar',
						data: JSON.parse(JSON.stringify(data)).splice(0,6) ,
						color:'#51a4ff',
						barMaxWidth:'10px',
						label:{
							formatter:function(param){
								return param.value + '%';
							},
							show:true,
							position:'right',
							fontSize:14,
							color: "#51a4ff"
						}
					},
						{
							name: '多晶',
							type: 'bar',
							data: JSON.parse(JSON.stringify(dataTwo)).splice(0,6) ,
							color:'#0066ff',
							barMaxWidth:'10px',
							label:{
								formatter:function(param){
									return param.value + '%';
								},
								show:true,
								position:'right',
								fontSize:14,
								color: "#51a4ff"
							}
						}]
				};
				myChart.setOption(option);

			}

		}
	};
</script>
