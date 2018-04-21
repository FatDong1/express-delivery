const productSaleRank = {
  color: ['#89d13b', '#64b6fe'],
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
    confine: true,
    axisPointer: {
      type: false
    }
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    top: '0',
    data: ['销售数量', '销售金额']
  },
  grid: {
    left: '0',
    bottom: '0',
    containLabel: true
  },
  yAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['美捷报', '地动仪', '观星台', 'IHR', '陀螺仪'],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#000000'
      },
      axisLine: {
        lineStyle: {
          color: '#E1E3E6'
        }
      }
    }
  ],
  xAxis: [
    {
      type: 'value',
      show: false,
      boundaryGap: ['0%', '10%']
    }
  ],
  series: [
    {
      name: '销售数量',
      type: 'bar',
      barWidth: '14px',
      barCategoryGap: '100%',
      data: [10, 52, 200, 334, 390],
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}套'
        }
      }
    },
    {
      name: '销售金额',
      type: 'bar',
      barWidth: '14px',
      data: [10, 52, 200, 334, 390],
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}万'
        }
      }
    }
  ]
}

export default productSaleRank
