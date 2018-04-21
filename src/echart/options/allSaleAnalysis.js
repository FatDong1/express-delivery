const allSaleAnalysis = {
  color: ['#c7c777', '#fdc163', '#90cbff', '#b0d984', '#bca4ed', '#fcb23c', '#64b6fe', '#89d13b'],
  tooltip: {
    trigger: 'item',
    position: 'right',
    triggerOn: 'click',
    formatter: function (params) {
      return `${params.name}<br/>${params.value}万元`
    }
  },
  grid: {
    top: '0%',
    bottom: '0%',
    left: '0',
    right: '0'
  },
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      left: '0%',
      top: 0,
      bottom: 0,
      width: '100%',
      height: 152,
      minSize: '0%',
      maxSize: '100%',
      sort: 'none',
      gap: 0,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1
        }
      },
      data: [
        {value: 100, name: '前期摸底'},
        {value: 90, name: '初步接触'},
        {value: 80, name: '需求交流'},
        {value: 70, name: '产品PCC'},
        {value: 50, name: '方案汇报'},
        {value: 40, name: '商务洽谈'},
        {value: 20, name: '合同签订'},
        {value: 10, name: '赢单'}
      ]
    }
  ]
}

export default allSaleAnalysis
