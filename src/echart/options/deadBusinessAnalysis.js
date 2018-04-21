const deadBusinessAnalysis = {
  color: ['#89d13b', '#64b6fe'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: false        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['本月', '今年累计']
  },
  grid: {
    left: '10%',
    right: '5%',
    bottom: '13%',
    containLabel: false
  },
  xAxis: [
    {
      type: 'category',
      data: ['3个月', '6个月', '9个月'],
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
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '万',
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
      name: '本月',
      type: 'bar',
      barWidth: '20%',
      data: [70, 82, 100]
    },
    {
      name: '今年累计',
      type: 'bar',
      barWidth: '20%',
      data: [90, 62, 110]
    }
  ]
}

export default deadBusinessAnalysis
