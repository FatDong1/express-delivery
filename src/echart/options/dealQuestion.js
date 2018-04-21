const dealPrice = {
  color: ['#3da5fe'],
  grid: {
    left: '0%',
    right: '0%',
    bottom: '2%',
    containLabel: true
  },
  tooltip: {
    confine: true,
    triggerOn: 'click',
    trigger: 'axis'
  },
  legend: {
    data: ['发现的问题量']
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLabel: {
      color: '#666666'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#E1E3E6'
      }
    }
  },
  yAxis: [{
    type: 'value',
    name: '(个)',
    splitNumber: 5,
    axisLabel: {
      formatter: '{value}',
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
      lineStyle: {
        color: '#E1E3E6'
      }
    },
    nameTextStyle: {
      color: '#9B9B9B',
      fontSize: '12px'
    }
  }, {
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
  }],
  series: [
    {
      name: '发现的问题量',
      type: 'line',
      data: [6, 8, 5, 7, 5, 9, 7, 8, 2, 10, 5, 1],
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }
    }
  ]
}

export default dealPrice
