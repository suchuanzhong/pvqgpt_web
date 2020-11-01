<template>
	<div :id="ids" style="height: 100%;"></div>
</template>

<script>
	export default {
		props:{
			ids:{
				default:'echartsPie'
			},
			
			dataArr2:{
				default:function(){
					return [{
								value: 285,
								name: '黑名单查询'
							},
							{
								value: 410,
								name: '红名单查询'
							},
							{
								value: 310,
								name: '设备'
							},
							{
								value: 200,
								name: '分析'
							},
							{
								value: 220,
								name: '投资'
							},
							{
								value: 274,
								name: '法人行政处罚'
							},
							{
								value: 235,
								name: '其它查询'
							}
						]
				}
			}
		},
		data() {
			return {
				// colorList:['#0068d3','#0068d3','#007fd3','#00c2e0','#00dfe4','#00aa36']
			}
		},
			mounted(){
			this.initEcharts();
		},
		methods: {
			initEcharts() {
				var echarts=this.$echarts;
				let myChart=this.$echarts.init(document.getElementById(this.ids));
				var	option = {
					title: {
						left: 'center',
						top: 20,
						textStyle:{
									fontSize:12
								}
							},
					
					 series : [
							{
							name: '访问来源',
							type: 'pie',
							radius: '65%',
							data:this.dataArr2
						}
							],
						color: ['rgb(131,249,103)', '#9E87FF', '#FD866A', '#1DB7E5','#ff2066','#ff9d00','#51a4ff','#17e0be'],
										};

				
				myChart.setOption(option);
			}
		},
	
	}
</script>
<style>
</style>
