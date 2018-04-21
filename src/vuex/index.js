/**
 * @description: vuex 配置文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import mutations from './store/mutations'
import actions from './store/actions'

import workDataStore from '../components/manage/work/store/index'
import scoreDataStore from '../components/manage/score/store/index'
import companyDataStore from '../components/manage/company/store/index'
import deivceDataStore from '../components/manage/device/store/index'

Vue.use(Vuex)

const store = {}
// root
store.state = state
store.mutations = mutations
store.actions = actions
store.modules = {}

store.modules['work-data'] = workDataStore
store.modules['score-data'] = scoreDataStore
store.modules['company-data'] = companyDataStore
store.modules['device-data'] = deivceDataStore
export default new Vuex.Store(store)
