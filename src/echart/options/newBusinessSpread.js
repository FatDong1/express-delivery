const newBusinessSpread = {
  color: ['#89d13b', '#fcb23c', '#64b6fe', '#c7c7cc'],
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    confine: true,
    containLabel: true,
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: false        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['三个月', '六个月', '九个月', '客户备案']
  },
  grid: {
    left: '0%',
    right: '-4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['数据云', '美信云', '智造云', '慧享云', '营销云'],
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      },
      axisLabel: {
        color: '#666666'
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        align: 'left',
        color: '#9B9B9B',
        fontSize: '12px'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '个',
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      },
      axisLabel: {
        color: '#9B9B9B'
      },
      axisTick: {
        show: false
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
    }
  ],
  series: [
    {
      name: '三个月',
      type: 'bar',
      stack: '总量',
      barWidth: '25px',
      data: [40, 52, 120, 74, 90]
    },
    {
      name: '六个月',
      type: 'bar',
      stack: '总量',
      barWidth: '25px',
      data: [80, 72, 70, 114, 80]
    },
    {
      name: '九个月',
      type: 'bar',
      stack: '总量',
      barWidth: '25px',
      data: [90, 92, 70, 94, 100]
    },
    {
      name: '客户备案',
      type: 'bar',
      stack: '总量',
      barWidth: '25px',
      data: [100, 112, 90, 74, 60]
    }
  ]
}

export default newBusinessSpread
