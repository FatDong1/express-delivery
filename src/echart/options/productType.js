const productType = {
  color: ['#64b6fe', '#89d13b', '#fcb23c', '#fd6f70', '#b494f5', '#c7c777'],
  tooltip: {
    triggerOn: 'click',
    confine: true,
    formatter: function (params) {
      return `${params.name}<br/>${params.value}万元`
    }
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
      name: '商品类型统计',
      type: 'pie',
      radius: ['30%', '90%'],
      center: ['73%', '50%'],
      hoverAnimation: false,
      avoidLabelOverlap: false,
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

export default productType
