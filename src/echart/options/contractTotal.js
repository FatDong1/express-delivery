const contractTotal = {
  color: ['#89d13b', '#64b6fe'],
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    confine: true,
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: false             // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    data: ['本周新增', '今年累计']
  },
  grid: {
    left: '0%',
    right: '-4%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['华南区', '华东区', '华北区', '闽浙', '华中区'],
      axisLabel: {
        color: '#9B9B9B',
        interval: 0,
        formatter: function (value) {
          var ret = '' // 拼接加\n返回的类目项
          var maxLength = 4 // 每项显示文字个数
          var valLength = value ? value.length : 0 // X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
          if (rowN > 1) { // 如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = '' // 每次截取的字符串
              var start = i * maxLength // 开始截取的位置
              var end = start + maxLength // 结束截取的位置
              // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n'
              ret += temp // 凭借最终的字符串
            }
            return ret
          } else {
            return value
          }
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '万',
      splitNumber: 5,
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: '#9B9B9B'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      },
      nameTextStyle: {
        color: '#9B9B9B',
        fontSize: '12px'
      }
    },
    {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      }
    }
  ],
  series: [
    {
      name: '本周新增',
      type: 'bar',
      barWidth: '15%',
      data: [10, 52, 200, 334, 390]
    },
    {
      name: '今年累计',
      type: 'bar',
      barWidth: '15%',
      data: [10, 52, 200, 334, 390]
    }
  ]
}

export default contractTotal
