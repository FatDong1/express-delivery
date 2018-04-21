/**
 * @description: 根路径下的 state
 */

export default {
  loading: false,
  isAdmin: false,
  companyData: {},
  departmentOptions: [{
    value: '第一工厂',
    label: '第一工厂',
    children: [{
      value: '第一车间',
      label: '第一车间'
    }, {
      value: '第二车间',
      label: '第二车间'
    }]
  }, {
    value: '第二工厂',
    label: '第二工厂',
    children: [{
      value: '第一车间',
      label: '第一车间'
    }, {
      value: '第二车间',
      label: '第二车间'
    }]
  },{
    value: '第三工厂',
    label: '第三工厂',
    children: [{
      value: '第一车间',
      label: '第一车间'
    }, {
      value: '第二车间',
      label: '第二车间'
    }]
  }]
}
