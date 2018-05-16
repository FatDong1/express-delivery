import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/manage/home/home-page/index.vue'
import manage from '../components/manage/index.vue'
import login from '../components/login/index.vue'
import signIn from '../components/sign-in/index.vue'
import account from '../components/manage/account/index.vue'

import myDeliveryIndex from '../components/manage/my-delivery/my-delivery-index/index.vue'
import myDeliveryList from '../components/manage/my-delivery/my-delivery-list/index.vue'
import myDeliveryView from '../components/manage/my-delivery/my-delivery-view/index.vue'
import myDeliveryEdit from '../components/manage/my-delivery/my-delivery-edit/index.vue'

import deliveryHallIndex from '../components/manage/delivery-hall/delivery-hall-index/index.vue'
import deliveryHallList from '../components/manage/delivery-hall/delivery-hall-list/index.vue'
import deliveryHallView from '../components/manage/delivery-hall/delivery-hall-view/index.vue'

import expressIndex from '../components/manage/express/express-index/index.vue'
import expressList from '../components/manage/express/express-list/index.vue'
import expressView from '../components/manage/express/express-view/index.vue'

import userIndex from '../components/manage/user/user-index/index.vue'
import userList from '../components/manage/user/user-list/index.vue'
import userView from '../components/manage/user/user-view/index.vue'

import creditIndex from '../components/manage/credit/index.vue'
import creditList from '../components/manage/credit/credit-list/index.vue'
import creditDetail from '../components/manage/credit/credit-detail/index.vue'


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
        // 我的快递
        {
          path: '/my-delivery',
          name: 'my-delivery',
          component: myDeliveryIndex,
          redirect: '/my-delivery/list',
          children: [{
            path: '/my-delivery/list',
            name: 'my-delivery-list',
            component: myDeliveryList
          }, {
            path: '/my-delivery/view',
            name: 'my-delivery-view',
            component: myDeliveryView
          }, {
            path: '/my-delivery/edit',
            name: 'my-delivery-edit',
            component: myDeliveryEdit
          }]
        },
        // 快递大厅
        {
          path: '/delivery-hall',
          name: 'delivery-hall',
          component: deliveryHallIndex,
          redirect: '/delivery-hall/list',
          children: [{
            path: '/delivery-hall/list',
            name: 'delivery-hall-list',
            component: deliveryHallList
          }, {
            path: '/delivery-hall/view',
            name: 'delivery-hall-view',
            component: deliveryHallView
          }]
        },
        // 快递管理
        {
          path: '/express',
          name: 'express',
          component: expressIndex,
          redirect: '/express/list',
          children: [{
            path: '/express/list',
            name: 'express-list',
            component: expressList
          }, {
            path: '/express/view',
            name: 'express-view',
            component: expressView
          }]
        },
        // 用户管理
        {
          path: '/user',
          name: 'user',
          component: userIndex,
          redirect: '/user/list',
          children: [{
            path: '/user/list',
            name: 'user-list',
            component: userList
          }, {
            path: '/user/view',
            name: 'user-view',
            component: userView
          }]
        },
        // 信誉排行
        {
          path: '/credit',
          redirect: '/credit/list',
          component: creditIndex,
          children: [
            {
              path: '/credit/list',
              name: 'credit-list',
              component: creditList
            },
            {
              path: '/credit/detail',
              name: 'credit-detail',
              component: creditDetail
            }
          ]
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
    }, {
      path: '/sign-in',
      name: 'sign-in',
      component: signIn
    }
  ]
})

router.beforeEach((to, from, next) => {
  let code = sessionStorage.getItem('user') || false
  // let isAdmin = JSON.parse(sessionStorage.getItem('user')).role === 'admin'
  // console.log(to)
  // if (!isAdmin && (/^\/express/.test(to.path) || /^\/user/.test(to.path))) {
  //   alert('没有权限')
  //   next({name: from.name})
  // } else 
  if (code && to.name === 'login') {
    next({name: 'home'})
  } else if (!code && to.name === 'login') {
    next()
  } else if (!code && to.name === "sign-in") {
    next()
  } else if (!code) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router
