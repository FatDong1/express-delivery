const companyContractTotal = {
  series: [{
    silent: true,
    type: 'liquidFill',
    radius: '95%',
    data: [{
      name: '完成率',
      value: 0.75,
      direction: 'right',
      itemStyle: {
        normal: {
          color: '#d2f4a8',
          shadowBlur: 0
        },
        emphasis: {
          color: '#d2f4a8',
          shadowBlur: 0
        }
      }
    }, {
      value: 0.65,
      direction: 'right',
      itemStyle: {
        normal: {
          color: '#b2e87d',
          shadowBlur: 0
        },
        emphasis: {
          color: '#b2e87d',
          shadowBlur: 0
        }
      }
    }],
    outline: {
      borderDistance: 2,
      itemStyle: {
        borderWidth: 4,
        borderColor: '#F1F1F2',
        shadowBlur: 0
      }
    },
    backgroundStyle: {
      color: '#fff'
    },
    label: {
      normal: {
        insideColor: '#484759',
        color: '#484759',
        fontSize: 22,
        align: 'center',
        baseline: 'left'
      }
    }
  }]
}

export default companyContractTotal
