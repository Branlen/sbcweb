const state ={
    tokenID:"",
    userName:"管理员",
}

const mutations ={
    SET_TOKENID: (state, tokenID) => {
        state.tokenID = tokenID;
    },
    SET_USERNAME:(state,userName)=>{
        state.userName = userName;
    }
}

const actions = {
    setTokenID({commit},tokenID){
        commit('SET_TOKENID',tokenID)
    },
    setUserName({commit},userName){
        commit('SET_USERNAME',userName)
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
}