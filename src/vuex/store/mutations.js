/**
 * @description: 根路径下的 mutations
 */


export default {
  updateLoading (state, loading) {
    state.loading = loading
  },
  updateFlag (state, flag) {
    state.flag = flag
  },
  updateCompanyData (state, payload) {
    state.companyData = payload
  },
  updateUserData (state, payload) {
    state.userData = payload
  },
  updatePartUser (state, payload) {
    state.userData.email = payload.email
    state.userData.phone = payload.phone
    state.userData.introduce = payload.introduce
  }
}
