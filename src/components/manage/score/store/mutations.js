
export default {
  updateScoreData (state, payload) {
    state.scoreData = {
      name: payload.name,  
      decideDate: payload.decideDate
    }
  }
}
