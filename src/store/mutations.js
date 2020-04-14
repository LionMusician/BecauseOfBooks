/***
 * 处理方法
 */
import {
    TEST,
    MASTER_KEY,
    SHOP_ID,
    LOGIN_INFO
} from './mutation-type'

export default {
    [TEST](state, v) {
        state.test = v;
    },
    [MASTER_KEY](state, v) {
        state.master_key = v;
    },
    [SHOP_ID](state, v) {
        state.shopId = v;
    },
    [LOGIN_INFO](state, v) {
        state.loginInfo = v;
    },
}