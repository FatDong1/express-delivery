<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    ...mapMutations([
      'updateCompanyData'
    ]),
    fetchCompany () {
      this.$http({
        method: 'get',
        url: '/api/users' 
      }).then((result) => {
        let temp = [{
          id: 1,
          label: '第一工厂',
          children: [{
            id: 11,
            label: '第一车间',
            canAdd: true,
            children: []
          },{
            id: 12,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }, {
          id: 2,
          label: '第二工厂',
          children: [{
            id: 21,
            label: '第一车间',
            canAdd: true,
            children: []
          }, {
            id: 22,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }, {
          id: 3,
          label: '第三工厂',
          children: [{
            id: 7,
            label: '第一车间',
            canAdd: true,
            children: []
          }, {
            id: 8,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }]
        result.value.forEach((element) => {
          let tempObj = {
            id: element.id,
            label: element.name,
            canDel: true
          }
          if (element.factory === '第一工厂') {
            if (element.plant === '第一车间') {
              temp[0].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[0].children[1].children.push(tempObj)
            }
          } else if (element.factory === '第二工厂') {
            if (element.plant === '第一车间') {
              temp[1].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[1].children[1].children.push(tempObj)
            }
          } else if (element.factory === '第三工厂') {
            if (element.plant === '第一车间') {
              temp[2].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[2].children[1].children.push(tempObj)
            }
          }
        })
        this.updateCompanyData(temp)
      })
    },
  },
  created () {
    this.fetchCompany()
  }
}
</script>

<style lang="less">
@import './assets/css/global.less';
html, body, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
