<template>
	<div :id="ids" style="height: 100%;"></div>
</template>

<script>
	import EchartOption from "@/utils/initEcharts";
	export default {
		props:{
			title:{
				default:''
			},
			ids:{
				default:'echartsPie'
			},
			centerName:{
				default:''
			},
			centerValue:{
				default:'25'
			},
			centerSubName:{
				default:'55'
			},
			unit:{default:''},
			datas:{
				default:function(){
					return [
						{value:"500", name:'外送',unit:"kWh"},
						{value:"1000", name:'消纳',unit:"kWh" },

					]
				}
			}
		},
		data() {
			return {
				// colorList:['#0068d3','#0068d3','#007fd3','#00c2e0','#00dfe4','#00aa36']
			}
		},
		 mounted() {
				this.$nextTick(() => {
				this.initEcharts();
				})
			},
		methods: {
			initEcharts() {
				var echarts=this.$echarts;
				// var data=JSON.parse(JSON.stringify(this.data));
				//
				let colorList = ['#0066ff','#e8386f','#b9b9b9','#eec700'];

				// var giftImageUrl ='/img/echartsPie-small.png';
				var _this=this;
				var	option = {

					tooltip: {
						trigger: 'item',
						// formatter: function(params){
						// 	return "{b|消纳}\n\n"+"{a|"+params.value+"}"+"{d|kWh}";
						// },
						// formatter: function(params) {
						// 	// return '{c|'+data.data.name+'}'+'{b|'+data.data.unit+'}'+'\n{hr|}\n'+'{d|'+data.data.text+'}',
						// 	return params.data.name+"："+params.data.value+params.data.unit;
						// }
					},
					

					series: [{
						name: '',
						type: 'pie',
						radius: ['65%', '85%'],
						avoidLabelOverlap: true,
						data: [{
							value: this.centerValue,
							label: {
								normal: {
									rich: {
										a : {
											fontSize: 14,
											color: '#82c2eb',
											// lineHeight: 20,
										},
										b: {
											fontSize: 16,
											color:colorList[0],
											lineHeight: 20,
											padding: [0,35,0,20],
										},
										d: {
											fontSize: 14,
											// align: 'right',
											padding: [0,6,0,6],
											// lineHeight:24,
											color:'#4f7c9e'
										},
									},
									formatter: function(params){
										return "{b|消纳}\n\n"+"{a|"+params.value+"}"+"{d|kWh}";
									},
									position: 'center',
									padding: [-8,60,0,0],
									align: 'center',
									show: true,

								}
							},

						},{
							value: this.centerSubName,
							label: {
								normal: {
									rich: {
										a : {
											fontSize: 14,
											color: '#82c2eb',
											lineHeight: 19,
										},
										b: {
											fontSize: 16,
											color:colorList[1],
											lineHeight: 23,
											padding: 6,
										} ,
										d: {
											fontSize: 14,
											// align: 'right',
											padding: [0,6,0,6],
											// lineHeight:24,
											color:'#4f7c9e'
										},
									},
									formatter: function(params){
										return "{b|外送}\n\n"+"{a|"+params.value+"}"+"{d|kWh}";
									},
									// position: 'center',
									padding: [-8,0,0,80],
									show: true,

								}
							}
						}],
						label: {
							show: false,
							position: 'center',
							// formatter: '{b}: {@[' + data.value + ']}'
						},

						color:colorList,
						// data: data
					}]
				};

				let myChart=this.$echarts.init(document.getElementById(this.ids));
				myChart.setOption(option);
			}
		},

	}
</script>
<style>
</style>
