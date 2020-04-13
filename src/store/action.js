export default {
    // 存门店ID
    setShopId({
        commit
    }, id) {
        commit('SHOP_ID', id);
    },
    // 存登录信息
    setLoginInfo({
        commit
    }, loginInfo) {
        commit('LOGIN_INFO', loginInfo);
    },
};