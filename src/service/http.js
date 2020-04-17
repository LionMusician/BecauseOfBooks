import utils from '@/utils/utils'
import Tips from '@/utils/Tips'
import Z_CONFIG from '@/config'
import store from "@/store/index";
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()


//添加请求拦截器
fly.interceptors.request.use((request) => {
    if (!request.silence) {
        Tips.loading("加载中");
    }

    request.headers = {
        "X-Tag": "flyio",
        'content-type': 'application/json'
    };

    let loginInfo = store.getters.loginInfo;
    if (loginInfo) {
        request.headers = {
            ...request.headers,
            'authorization': store.getters.loginInfo.token
        }
    }
    request.parseJson = true;

    let authParams = {
        //公共参数

    };

    request.body && Object.keys(request.body).forEach((val) => {
        if (request.body[val] === "") {
            delete request.body[val]
        };
    });
    request.body = {
        ...request.body,
        ...authParams
    }

    utils.log(`${utils.mklog()}【POST:-->】【M="${request.url}"】【P=${JSON.stringify(request.body)}】`);
    return request;
});

//添加响应拦截器
fly.interceptors.response.use(
    (res, promise) => {
        try {
            Tips.loaded();
            if (res.data.code === 200) {
                utils.log(`${utils.mklog()}【M="${res.request.url}"】【接口响应：】${JSON.stringify(res.data.data)}`);
                return promise.resolve(res.data.data); //请求成功之后将返回值返回
            } else {
                Tips.toast(res.data.msg);
                return promise.reject(res.data);
                utils.error(`${utils.mklog()}【M="${res.request.url}"】【接口错误提示：】msg=${res.data.msg} code=${res.data.code}`);
            }
        } catch (err) {
            Tips.loaded();
        }
    },
    (err) => {
        //请求出错，根据返回状态码判断出错原因
        utils.error(`${utils.mklog()}【M="${err.engine._options.url}"】【接口错误提示：】${err.engine.response.msg} code=${err.engine.response.code}`);
        Tips.loaded();
        if (err) {
            return "请求失败";
        };
    }
);

fly.config.baseURL = Z_CONFIG.baseURL;

export default fly;