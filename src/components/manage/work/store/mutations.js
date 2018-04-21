
export default {
  updateWorkData (state, payload) {
    state.workData = {
      name: payload.name,  
      stage: payload.stage,
      factory: payload.factory,  
      checkPlace: payload.checkPlace,
      checkContent: payload.checkContent,
    }
  }
}
