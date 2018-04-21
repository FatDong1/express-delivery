import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/manage/home/home-page/index.vue'
import manage from '../components/manage/index.vue'
import login from '../components/login/index.vue'

import account from '../components/manage/account/index.vue'

import workIndex from '../components/manage/work/work-index/index.vue'
import workList from '../components/manage/work/work-list/index.vue'
import workEdit from '../components/manage/work/work-edit/index.vue'

import deviceIndex from '../components/manage/device/device-index/index.vue'
import deviceList from '../components/manage/device/device-list/index.vue'
import deviceCheck from '../components/manage/device/device-check/index.vue'
import deviceAdd from '../components/manage/device/device-add/index.vue'
import deviceDetail from '../components/manage/device/device-detail/index.vue'

import scoreIndex from '../components/manage/score/index.vue'
import scoreList from '../components/manage/score/score-list/index.vue'
import scoreDetail from '../components/manage/score/score-detail/index.vue'

import companyIndex from '../components/manage/company/company-index/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: manage,
      redirect: '/home',
      children: [
        // 首页
        {
          path: '/home',
          name: 'home',
          component: home
        },
        // 日常点检
        {
          path: '/work',
          name: 'work',
          component: workIndex,
          redirect: '/work/list',
          children: [{
            path: '/work/list',
            name: 'work-list',
            component: workList
          }, {
            path: '/work/detail/:state/:id',
            name: 'work-detail',
            component: workEdit
          }]
        },
        // 设备管理
        {
          path: '/device',
          name: 'device',
          component: deviceIndex,
          redirect: '/device/list',
          children: [{
            path: '/device/list',
            name: 'device-list',
            component: deviceList,
          }, {
            path: '/device/check',
            name: 'device-check',
            component: deviceCheck
          }, {
            path: '/device/add',
            name: 'device-add',
            component: deviceAdd
          }, {
            path: '/device/detail',
            name: 'device-detail',
            component: deviceDetail
          }]
        },
        // 人员绩效
        {
          path: '/score',
          redirect: '/score/list',
          component: scoreIndex,
          children: [
            {
              path: '/score/list',
              name: 'score-list',
              component: scoreList
            },
            {
              path: '/score/detail',
              name: 'score-detail',
              component: scoreDetail
            }
          ]
        },
        // 组织架构管理
        {
          path: '/company',
          name: 'company',
          component: companyIndex
        },

        // 账户管理
        {
          path: '/account',
          name: 'account',
          component: account
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let code = sessionStorage.getItem('user') || false
  if (code && to.name === 'login') {
    next({name: 'home'})
  } else if (!code && to.name === 'login') {
    next()
  } else if (!code) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router
