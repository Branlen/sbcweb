const getters = {
    updatedRouters: state => state.update.hasUpdateRouter,
    categorys: state => state.categorys.categorys,
    navigation: state => state.categorys.navigation,
    tokenID:state => state.user.tokenID,
    userName:state => state.user.userName,
}

export default getters

