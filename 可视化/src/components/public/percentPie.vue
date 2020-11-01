<template>
	<div style="height:100%;" :id="ids">

	</div>
</template>

<script>
	export default{
		props:{
			ids:{
				type:String,
				default:"bar"
			},
			data:{
				default:function () {
					return {
						name:"aaaa",
						data:[{
							'name': '总户数',
							'value': 34
						},
							{
								'name': '总人口数',
								'value': 100
							},
							{
								'name': '已覆盖户数',
								'value': 100
							},
							{
								'name': '已覆盖人口数',
								'value': 36
							}
						]
					}
				}
			},
		},
		data(){
			return{

			}
		},
		methods:{
			setEchartsPie(seriesData) {
				 var scaleData = seriesData.data;
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
				var data = [];
				var echarts=this.$echarts;
				var color = ['rgb(255, 153, 153)', 'rgb(255, 176, 63)', 'rgb(61, 186, 45)', 'rgb(43, 166, 254)'];
				var colorBorder = ['rgba(255, 153, 153, 0.4)', 'rgba(255, 176, 63, 0.4)', 'rgba(61, 186, 45, 0.4)', 'rgba(43, 166, 254, 0.4)'];
				for (var i = 0; i < scaleData.length; i++) {
					data.push({
						data: scaleData[i].value,
						value: scaleData[i].value,
						name: scaleData[i].name,
						itemStyle: {
							normal: {
								color: color[i],
								borderWidth: 1,
								borderColor: colorBorder[i]
							}
						}
					}, {
						value: 5,
						name: '',
						itemStyle: placeHolderStyle
					});
				}
				var seriesObj = [{
					name: '',
					type: 'pie',
					clockWise: false,
					radius: ['30%', '65%'],
					hoverAnimation: false,
					startAngle: -30,
					itemStyle: {
						normal: {
							label: {
								show: true,
								position: 'inner',
								fontSize: 14,
								lineHeight: 15,
								formatter: function(params) {
									var percent = 0;
									var total = 0;
									for (var i = 0; i < scaleData.length; i++) {
										total += scaleData[i].value;
									}
									percent = ((params.value / total) * 100).toFixed(0);
									if (params.name !== '') {
										// return params.name + '\n' + params.data.data;
										if (params.name.length > 4) {
											return params.name.slice(0, 3) + '\n' + params.name.slice(3);
										} else {
											return params.name;
										}

									} else {
										return '';
									}
								}
							},
							labelLine: {
								length: 30,
								length2: 60,
								show: true
							}
						}
					},
					data: data
				}, {
					name: '',
					type: 'pie',
					clockWise: false,
					radius: ['30%', '65%'],
					hoverAnimation: false,
					startAngle: -30,
					itemStyle: {
						normal: {
							label: {
								show: true,
								position: 'outside',
								fontSize: 18,
								formatter: function(params) {
									var percent = 0;
									var total = 0;
									for (var i = 0; i < scaleData.length; i++) {
										total += scaleData[i].value;
									}
									percent = ((params.value / total) * 100).toFixed(0);
									if (params.name !== '') {
										return params.data.data;
									} else {
										return '';
									}
								}
							},
							labelLine: {
								length: 10,
								length2: 20,
								show: true
							}
						}
					},
					data: data
				}];
			let	option = {
					tooltip: {
						show: false
					},
					legend: {
						show: false
					},
					toolbox: {
						show: false
					},
					series: seriesObj,
					graphic: [{
						type: 'group',
						left: 'center',
						top: 'middle',
						children: [{
							type: 'text',
							z: 100,
							left: 'center',
							top: '0',
							style: {
								fill: '#fff',
								text: [
									'治理率'
								],
								font: '16px Microsoft YaHei'
							}
						},
							{
								type: 'text',
								z: 100,
								left: 'center',
								top: '32',
								style: {
									fill: 'red',
									text: [
										'80%'
									],
									font: '26px Microsoft YaHei'
								}
							}
						]
					}]
				};
				let myChart=echarts.init(document.getElementById(this.ids));
				myChart.setOption(option);
			}
			},
		watch:{

		},
		created(){

		},
		mounted(){
			this.$nextTick(()=>{
				this.setEchartsPie(this.data);

			})
		},
		destoryed(){

		}
	}
</script>

<style>
</style>
