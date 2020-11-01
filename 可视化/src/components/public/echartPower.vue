<template>
	<div :id="ids" style="width:100%;height:100%;"></div>
</template>
<script>
	export default {
		name: "echartsPie",
		props: {
			ids: {
				default: "echartsInnerPie"
			},
			seriesData: {
				default:function(){
					return {
						name:"标题",
						value:50
					}
				}
			},
			// innerColor: {
			// 	default: function() {
			// 		return ["rgba(0,253,174,.9)", "rgba(0,66,83,.8)"];
			// 	}
			// },
			// radiusData: {
			// 	default: function() {
			// 		return [50, 60];
			// 	}
			// },
			inverterName:{
				default:function(){
					return ['并网数量','故障数量','待机数量','停机数量','通讯中断数量',]
				}
			},
			inverterdatas: {
				default: function() {
					return {
						"invtGrid": 971,//并网数量
						"invtGault": 0,//故障数量
						"invtStandby": 0,//待机数量
						"invtShutdown": 0,//关机数量
						"invtComm": 0,//通讯故障数量
						"baseName": "地名"
					};
				}
			},
			colorList1:{
				default:function(){
					rertun ['#00ffb2','#fe4c45','#00deff','#9eadb5', '#746be8']
				}
			},

		},
		data() {
			return {
				totall:0
			};
		},
		mounted() {
			// this.$nextTick(() => {
			this.initEcharts();
			// });
		},
		methods: {
			initEcharts() {
				let myOption = this.$echarts.init(document.getElementById(this.ids));
				var colorList1 = this.colorList1
				//修改饼图数据
				let datas=[]
				// let num = 0 //统计其他四项是否有值
				let inverterNum = 0 //逆变器数量
				for (let key in this.inverterdatas){
					if(key !=='baseName'){
						inverterNum += this.inverterdatas[key]
						datas.push({
							value:this.inverterdatas[key]
						})
					}
				}
				this.totall = inverterNum
				let data = []
				// if(num !== 0){
				data = this.inverterName.map((item,idx)=>{
					return {
						'name':item,
						'value': datas[idx].value
					}
				})
				// }else{
				// 	data =[{"name":"并网数量",'value':this.inverterdatas.invtGrid}]
				// }
				// console.log(num)
				let str=''
				for(let item of data){
					str+= `${item.name}:${item.value}</br>`
				}
				let option = {
					title: {
						subtext: this.inverterdatas.baseName,
						subtextStyle: {
							color:'#fff',
							fontSize: 14
						},
						x: 'center',
						y: '68%',
					},
					tooltip: {
						trigger: 'item',
						position:'center',
						formatter: '{b}:{c}'
						// formatter: str
					},
					series: [
						{
							type: 'pie',
							center: ['50%', '38%'],
							radius: ['60%', '75%'],
							bottom: 10,
							clockwise: true,
							avoidLabelOverlap: true,
							hoverOffset: 15,
							itemStyle: {
								normal: {
									color: function(params) {
										return colorList1[params.dataIndex]
									},
									opacity:0.8
								}
							},
							label: {
								show: false,
							},
							hoverAnimation: false,
							labelLine: {
								normal: {
									length: 20,
									length2: 30,
									lineStyle: {
										width: 1
									}
								}
							},
							data:data,
						},
						{
							name: "阴影环形",
							type: "pie",
							clockWise: false,
							itemStyle: {
								normal: {
									color: 'rgba(0,66,83,0)',
									// shadowColor: 'rgba(0,66,83,.8)',
								}
							},
							tooltip:{
								show:false
							},
							label: {
								normal: {
									show: true,
									// formatter: function(params) {
									// 	return `逆变器数量</br>`'+params.value ;
									// },
									formatter: [
										'{a|逆变器数量}',
										'{b|'+this.totall+'}{x|台}'
									].join('\n'),

									rich: {
										a: {
											color: '#cbd3de',
											fontSize:14,
											lineHeight: 40
										},
										b: {
											color:'#ffffff',
											fontSize:30,
											height: 34,
											fontFamily:"DINOT"
										},
										x: {
											fontSize: 12,
											padding:[0,0,0,0],
											color: '#cbd3de'
										},
									},
									position: "center",
									// textStyle: {
									// 	fontSize: 14,
									// 	fontWeight: "bold",
									// 	color: '#fff'
									// }
								}
							},
							hoverAnimation: false,
							center: ["50%", "35%"],
							radius: ['90%', '70%'],
							data: [
								{
									value:inverterNum,

								},
							]
						}

					]
				};

				myOption.setOption(option);
			}
		}
	};
</script>
<style scoped="scoped" lang="scss">
	.relative{
		position: relative;
	}
	.pie-legend{
		display: flex;
		align-items: center;
		width: 160px;
		height: 100%;
		top: 5px;
		position: absolute;
		right: 20px;
		ul{padding: 0;}
		li{
			position: relative;
			margin-bottom: 14px;
			list-style: none;
			display: flex;
			align-items: flex-end;
		}
		li::before{
			width: 8px;
			height: 8px;
			content: "";
			background: #fff;
			display: inline-block;
			border-radius: 10px;
			position: absolute;
			left: -15px;
			top: 18px;
			box-shadow: 0 0 10px rgba(255,255,255,.5);
		}
		// ['#00ffb2','#9eadb5','#fe4c45','#00deff'];
		li:nth-of-type(1){
			&::before{
				background: #00ffb2;
				box-shadow: 0 0 10px #00ffb2;
			}
		}
		li:nth-of-type(2){
			&::before{
				background: #00deff;
				box-shadow: 0 0 10px #00deff;
			}
		}
		li:nth-of-type(3){
			&::before{
				background: #9eadb5;
				box-shadow: 0 0 10px #9eadb5;
			}
		}
		li:nth-of-type(4){
			&::before{
				background: #fe4c45;
				box-shadow: 0 0 10px #fe4c45;
			}
		}
		li:nth-of-type(5){
			&::before{
				background: #746be8;
				box-shadow: 0 0 10px #746be8;
			}
		}
		li:nth-of-type(6){
			&::before{
				background: #f58b24;
				box-shadow: 0 0 10px #f58b24;
			}
		}
		p{
			color:#cbd3de;
			font-size: 14px;
			margin-right: 16px;
			width: 4em;
		}
		big{
			font-size:24px;
			color:#fff;
			width: 2.5em;
			display: inline-block;
			text-shadow:1px 0px 1px #0e5bdd,0px 1px 1px #0e5bdd,0px 1px 1px #0e5bdd;
		}
		small{
			color:#8e9cb1;
			font-size: 12px;
		}
	}

</style>
