const pieOptions = {
  color: ['#64b6fe', '#89d13b', '#fcb23c', '#fd6f70', '#b494f5'],
  tooltip: {
    formatter: '{b} <br/>{c} ({d}%)'
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    orient: 'vertical',
    x: 'left',
    y: 'center',
    data: ['Saas私有云', 'Saas公有云', '实施', '服务', '许可证']
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '90%'],
      avoidLabelOverlap: false,
      hoverAnimation: false,
      center: ['72%', '50%'],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {value: 335, name: 'Saas私有云'},
        {value: 310, name: 'Saas公有云'},
        {value: 234, name: '实施'},
        {value: 135, name: '服务'},
        {value: 1548, name: '许可证'}
      ]
    }
  ]
}

const areaOptions = {
  legend: {
    show: false
  },
  grid: {
    top: '20%',
    left: '10%',
    right: '5%',
    bottom: '20%',
    containLabel: false
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      return '作废' + params[0].value[1] + '天<br/>' + params[0].value[0] + '%'
    }
  },
  xAxis: [
    {
      type: 'value',
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
      splitLine: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '%',
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
      type: 'line',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {
        normal: {
          color: '#CEE8FF'
        }
      },
      lineStyle: {
        normal: {
          width: 3,
          color: '#3DA5FE'
        }
      },
      itemStyle: {
        normal: {
          width: 3,
          color: '#3DA5FE'
        }
      },
      data: [[0, 10], [30, 25], [40, 35], [50, 60], [60, 65], [70, 100]]
    }
  ]
}

export default {
  pieOptions,
  areaOptions
}
