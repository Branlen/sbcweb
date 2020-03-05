const state =  {
    categorys: "",
   navigation: ''
}
const mutations= {
    setCategory(state, Categorys){
        state.categorys = Categorys;
    },
    setNavigation(state, navigation){
        state.navigation = navigation
    }
}

export default {
    state,
    mutations
}