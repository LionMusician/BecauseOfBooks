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
    // 存用户信息
    setUserInfo({
        commit
    }, userInfo) {
        commit('USER_INFO', userInfo);
    },
    // 默认地址
    setDefaultAddr({
        commit
    }, defaultAddr) {
        commit('DEFAULT_ADDR', defaultAddr);
    },
};