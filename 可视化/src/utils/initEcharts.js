export default {
  axisTick: {
    show: false
  },
  axisLabel: {
		color:'#fff',
		fontSize:16,
        // interval:0
	},
  axisLine: {
    lineStyle: {
      color: "rgba(255,255,255,0.2)"
    }
  },
  areaStyleColor: function (color1, color2) {
    return {
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0,
          color: color1 // 0% 处的颜色
        },
        {
          offset: 1,
          color: color2 // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    }
  },
  lineStyleColor: function (color1, color2) {

  },
  title: function (name) {
    return {
      text: name,
      top: 0,
      left: 0,
      textStyle: {
        color: '#01cfee',
        fontFamily:"PingFang SC",
        fontSize:16
      },
    }
  },

  dataZoom: [{
      show: false,
    },
    {
      type: 'inside',
    }

  ],
  tooltip: {
    trigger: "axis",
    axisPointer:{
        tyle:'shadow'
    }
  },


}
