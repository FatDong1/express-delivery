/**
 * @description: vuex 配置文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import mutations from './store/mutations'
import actions from './store/actions'

import myDeliveryDataStore from '../components/manage/my-delivery/store/index'
import deliveryHallDataStore from '../components/manage/delivery-hall/store/index'
import creditDataStore from '../components/manage/credit/store/index'
import userDataStore from '../components/manage/user/store/index'
import expressDataStore from '../components/manage/express/store/index'

Vue.use(Vuex)

const store = {}
// root
store.state = state
store.mutations = mutations
store.actions = actions
store.modules = {}

store.modules['my-delivery-data'] = myDeliveryDataStore
store.modules['delivery-hall-data'] = deliveryHallDataStore
store.modules['user-data'] = userDataStore
store.modules['credit-data'] = creditDataStore
store.modules['express-data'] = expressDataStore

export default new Vuex.Store(store)
