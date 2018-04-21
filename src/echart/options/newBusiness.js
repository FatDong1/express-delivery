const newBusinessThisWeek = {
  color: ['#89d13b', '#fcb23c', '#64b6fe', '#c7c7cc'],
  tooltip: {
    trigger: 'axis',
    confine: true,
    triggerOn: 'click',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: false
    }
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    x: 'center',
    data: ['车床', '机床', '铣床', '其他']
  },
  grid: {
    top: '15%',
    left: 0,
    bottom: '3%',
    right: 0,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['第一车间', '第二车间', '第三车间', '第四车间', '第五车间'],
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
      name: '(台)',
      splitNumber: 5,
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
      axisLabel: {
        color: '#9B9B9B'
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        align: 'left',
        color: '#9B9B9B',
        fontSize: '12px'
      },
      boundaryGap: [0, 0.01]
    }
  ],
  series: [
    {
      name: '车床',
      type: 'bar',
      barWidth: '15%',
      data: [40, 52, 120, 74, 90]
    },
    {
      name: '机床',
      type: 'bar',
      barWidth: '15%',
      data: [80, 72, 70, 114, 80]
    },
    {
      name: '铣床',
      type: 'bar',
      barWidth: '15%',
      data: [90, 92, 70, 94, 100]
    },
    {
      name: '其他',
      type: 'bar',
      barWidth: '15%',
      data: [100, 112, 90, 74, 60]
    }
  ]
}

export default newBusinessThisWeek
