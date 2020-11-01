<template>
	<div :id="ids" style="height: 100%;"></div>
</template>

<script>
	export default {
		props:{
			ids:{
				default:'pieTable'
			},
			centerName:{
				default:''
			},
			centerValue:{
				default:'500'
			},
			centerSubName:{
				default:'mwp'
			},
			data:{
				default:function(){
					return [{
						name: "第一批",
						value: 1,
						unit:"个"
					},
						{
							name: "第二批",
							value: 8,
							unit:"个"
						},
						{
							name: "第三批",
							value: 13,
							unit:"个"
						},
					]
				}
			}
		},
		data() {
			return {
				// colorList:['#0068d3','#0068d3','#007fd3','#00c2e0','#00dfe4','#00aa36']
			}
		},
		methods: {
			initEcharts() {
				var echarts=this.$echarts;
				var seriesData=JSON.parse(JSON.stringify(this.data));
				var data=[];
				var total=0;
				let colorList = ['#2dea9c','#00ffff','#b9b9b9','#eec700','#009ff1'];
				var placeHolderStyle = {
					normal: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						},
						color: 'rgba(0, 0, 0, 0)',
						borderColor: 'rgba(0, 0, 0, 0)',
						borderWidth: 0
					}
				};

				for (var i = 0; i < seriesData.length; i++) {
					total+=seriesData[i].value;
				}
				// debugger;
				for (var i = 0; i < seriesData.length; i++) {
					data.push(seriesData[i]);
					data.push({
						value: total*0.015,
						name: '',
						itemStyle: placeHolderStyle
					});
				}
				var pieCenterData= [{
					name:"第一批次",value:20
				},{
					name:"第二批次",value:20
				},{
					name:"第三批次",value:50
				}];
				var total2=0,pieCData=[];
				pieCenterData.map(item=>{
					total2+=item.value;
				});
				pieCenterData.map(item=>{
					pieCData.push(item)
					pieCData.push({
						value: total2*0.015,
						name: '',
						itemStyle: placeHolderStyle
					});
				});
				var _this=this;


				var	option = {
					tooltip: {
						show:false,
						trigger: 'item',
						formatter: function(data) {
							return data.name+"："+data.percent+"%"+"<br/>"+data.value+' '+ data.data.unit||'';
						}
					},
					legend: {
						orient: 'horizontal',
						icon: 'circle',
						bottom: 20,
						x: 'center',
						textStyle: {
							color: '#f00'
						},
						show:false
					},
					series: [ {
						//扇形
						name: "",
						type: "pie",
						hoverOffset:0,
						radius: [0,50],
						center: ["50%", "50%"],
						color: [
							new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: "#26ead1" },
								{ offset: 0.5, color: "#2ad4a1" },
								{ offset: 1, color: "#2dc076" }
							]),
							new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: "#2edaff" },
								{ offset: 0.5, color: "#17a6ff" },
								{ offset: 1, color: "#0072ff" }
							]),
							new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: "#b6caf5" },
								{ offset: 0.5, color: "#a3b7e0" },
								{ offset: 1, color: "#7487ae" }
							])
						],
						data:pieCData,
						label: {
							normal: {
								show: false
							}
						},
						itemStyle: {

						}
					},{
						hoverOffset:1,
						startAngle:120,
						type: 'pie',
						radius: [65, 70],
						center: ['50%', '50%'],
						color:colorList,
						label: {
							normal: {
								formatter: (datas=> {
									var unit=datas.data.unit?datas.data.unit:'%';
									return datas.name?'{c|'+datas.data.name+'}{d|'+datas.data.value+'}'+'{b|'+datas.data.unit+'}':''
								}),
								rich: {
									b: {
										fontSize: 12,
										color: '#fff',
										align: 'left',
										padding: [-18,0,0,0],
									},
									d: {
										fontSize: 20,
										align: 'left',
										padding: [-15,4,0,0],
										lineHeight:24,
										color:'#fff'
									},
									c: {
										fontSize: 14,
										color: '#fff',
										align: 'left',
										padding: 4,
										borderColor:colorList[0],
										borderWidth:0
									}
								}
							}
						},
						labelLine: {
							normal: {
								show: true,
								length: 10,
								length2: 20
							}
						},
						data: data,

					}]
				};

				let myChart=this.$echarts.init(document.getElementById(this.ids));
				myChart.setOption(option);
			}
		},
		mounted(){
			this.initEcharts();
		}
	}
</script>
<style>
</style>
