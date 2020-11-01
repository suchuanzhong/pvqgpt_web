<template>
	<div :id="ids" style="height: 100%;overflow:hidden;"></div>
</template>

<script>
	export default {
		props: {
			piePosition: {
				default: function() {
					return ["50%", "50%"]
				}
			},
			startAngle:{
				default:120
			},
			flag:{
				default:false,
				type:Boolean
			},
			ids: {
				default: "echartsPolar"
			},
			centerName: {
				default: "保护状态"
			},
			centerValue: {
				default: ""
			},
			centerSubName: {
				default: "PROTECTION STATUS"
			},
			centerImag: {
				default: "190"
			},
			centerRadius: {
				default: function() {
					return [80, 88];
				}
			},
			labelLinelength: {
				default: 20
			},
			labelLineLength2: {
				default: 10
			},
			labelShowLength: {
				default: "0"
			},
			graphicPosLeft: {
				default: "center"
			},
			graphicPosRight: {
				default: "center"
			},
			// giftImageUrl:{
			// 	default:"../../../img/echartsPie.png"
			// },
			data: {
				default: function() {
					return [
						{
							name: "省级以上技术\n(工程)研究中心",
							value: 169
						},
						{
							name: "高新技术企业",
							value: 852
						},
						{
							name: "自主培育上市\n公司",
							value: 22
						},
						{
							name: "加速器",
							value: 8
						},
						{
							name: "总创空间",
							value: 37
						}
					];
				}
			}
		},
		data() {
			return {
				// colorList:['#0068d3','#0068d3','#007fd3','#00c2e0','#00dfe4','#00aa36']
			};
		},
		computed: {
			labelObj() {
				return {
					normal: {
						alignTo:"labelLine",
						formatter: data => {
							let valueName = "";
							if(this.labelShowLength == 0){
								if (data.data.name.length > 7) {
									valueName =data.data.name.substring(0, 7) +"\n" +data.data.name.substring(7);
								} else {
									valueName = data.data.name;
								}
							}else if(this.labelShowLength == 1){
								if (data.data.name.length > 3) {
									valueName =data.data.name.substring(0, 3) +"\n" +data.data.name.substring(3,6)+'\n'+data.data.name.substring(6);
								} else {
									valueName = data.data.name;
								}
							}
							var unit = data.data.unit ? data.data.unit : "";
							if(this.flag){
								return ("{a|" +data.data.value +"}" +"{e|" +unit +"}\n{hr|}\n" +"{f|" +valueName +"}");
							}else{
								return ("{d|" +data.data.value +"}" +"{b|" +unit +"}\n{hr|}\n" +"{c|" +valueName +"}");
								// '{d|{c}%}\n{hr|}\n{c|{b}}'
							}

						},
						rich: {
							b: {
								fontSize: 12,
								color: "#fff",
								align: "left",
								padding: [4, 4, 5, 4]
							},
							hr: {
								backgroundColor: "rgba(208,208,208,.2)",
								width: "100%",
								height: 1
							},
							d: {
								fontSize: 20,
								align: "left",
								padding: 4,
								lineHeight: 24,
								color: "#008ffe"
							},
							a: {
								fontSize: 18,
								align: "left",
								padding: 0,
								lineHeight: 16,
								color: "#008ffe"
							},
							e: {
								fontSize: 16,
								align: "left",
								padding: 0,
								lineHeight: 16,
								color: "#008ffe"
							},
							c: {
								fontSize: 14,
								color: "#fff",
								align: "left",
								padding: 4,
							},
							f: {
								fontSize: 12,
								color: "#fff",
								align: "left",
								padding: 2,
							},
							u: {
								fontSize: 14,
								color: "#fff",
								padding: 4,
								lineHeight: 24
							}
						}
					}
				};
			}
		},
		methods: {
			initEcharts() {
				let imgsrc = 'data:image/png;base64,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'
				var echarts = this.$echarts;
				var data = JSON.parse(JSON.stringify(this.data));

				let colorList = [];
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#2edaff" },
							{ offset: 0.5, color: "#17a6ff" },
							{ offset: 1, color: "#0072ff" }
						])
				);
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#26ead1" },
							{ offset: 0.5, color: "#2ad4a1" },
							{ offset: 1, color: "#2dc076" }
						])
				);
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#7487ae" },
							{ offset: 0.5, color: "#b6caf5" },
							{ offset: 1, color: "#b6caf5" }
						])
				);
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#ff8400" },
							{ offset: 1, color: "#fb5e00" }
						])
				);
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#d466f9" },
							{ offset: 1, color: "#74a7ff" }
						])
				);
				colorList.push(
						new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#FF7997" },
							{ offset: 1, color: "#FF5378" }
						])
				);

				// var giftImageUrl = "/img/echartsPie.png";
				var _this = this;
				var option = {
					tooltip: {
						trigger: "item",
						position: "right",
						formatter: function(data) {
							return (
									data.name +
									"：" +
									data.value +
									"MW"
									// "<br/>" +
									// data.value +
									// data.data.unit || ""
							);
						}
					},
					graphic: {
						elements: [
							{
								type: "group",
								left: this.graphicPosLeft,
								top: this.graphicPosRight,
								children: [
									{
										type: "image",
										style: {
											image: imgsrc,
											width: this.centerImag,
											height: this.centerImag
										},
										left: "center",
										top: "center"
									},
									{
										type: "text",
										z: 100,
										left: "center",
										top: "middle",
										style: {
											fill: "#3a9bff",
											fontSize: 16,
											textAlign: "center",
											text: [_this.centerName, ""].join("\n")
										}
									},
									{
										type: "text",
										z: 101,
										left: "center",
										top: 5,
										style: {
											fill: "#fff",
											fontSize: 16,
											textAlign: "center",
											text: [_this.centerValue].join("\n")
										}
									},
									{
										type: "text",
										z: 101,
										left: "center",
										top: 3,
										style: {
											fill: "rgba(255,255,255,.32)",
											fontSize: 16,
											textAlign: "center",
											text: [_this.centerSubName].join("\n")
										}
									}
								]
							}
						]
					},
					legend: {
						orient: "horizontal",
						icon: "circle",
						bottom: 0,
						x: "center",
						textStyle: {
							color: "#f00"
						},
						show: false
					},
					series: [
						{
							hoverOffset: 1,
							startAngle: this.startAngle,
							type: "pie",
							radius: this.centerRadius,
							center: this.piePosition,
							// color: [ '#FF8352', '#0E7CE2','#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
							color: colorList,
							data: data,

							labelLine: {
								normal: {
									show: true,
									length: this.labelLinelength,
									length2: this.labelLineLength2,
									lineStyle: {
										color: "rgba(208,208,208,.2)",
										width: 1
									}
								}
							},
							label: this.labelObj
						}
					]
				};

				let myChart = this.$echarts.init(document.getElementById(this.ids));
				myChart.setOption(option);
			}
		},
		mounted() {
			this.initEcharts();
		}
	};
</script>
<style>
</style>
