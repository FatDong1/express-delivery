const dealRate = {
  color: ['#89d13b', '#3da5fe'],
  tooltip: {
    confine: true,
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: false
    }
  },
  grid: {
    left: 0,
    right: '5%',
    bottom: '18%'
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    data: ['成单量', '成单率']
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: ['8月', '9月', '10月', '11月'],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666666'
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
      show: false
    },
    {
      type: 'value',
      show: false
    }
  ],
  series: [
    {
      name: '成单量',
      type: 'bar',
      barWidth: '40%',
      data: [4, 7, 6, 9],
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
      },
      itemStyle: {
        normal: {
          color: '#64B6FE'
        }
      }
    },
    {
      name: '成单率',
      type: 'line',
      yAxisIndex: 1,
      data: [0.23, 0.34, 0.73, 0.66],
      label: {
        normal: {
          color: '#333333',
          show: true,
          formatter: (params) => {
            return params.value * 100 + '%'
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#FCB23C',
          borderColor: '#FCB23C'
        }
      }
    }
  ]
}

export default dealRate
