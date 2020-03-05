

const state = {
   hasUpdateRouter:false,
}

const mutations = {
    SET_UPDATEROUTER: (state, hasUpdateRouter) => {
        state.hasUpdateRouter = hasUpdateRouter;
        console.log('===退出更新hasRouter',state.hasUpdateRouter)
    
    }
}


const actions = {
    updateRouter({ commit },isTrue){
        commit('SET_UPDATEROUTER', isTrue)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}