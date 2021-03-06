import fly from './http'

export default {
    // 阅读馆列表 
    queryReadingHall: (data) => {
        return fly.request('/becausebooks-app/home/queryReadingHall', data, {
            method: 'post'
        });
    },

    // --------------------------首页--------------------------------
    // 查询banner列表
    queryBanner: (data) => {
        return fly.request('/becausebooks-app/home/queryBanner', data, {
            method: 'post'
        });
    },
    // 精选热点 
    queryHotspot: (data) => {
        return fly.request('/becausebooks-app/home/queryHotspot', data, {
            method: 'post'
        });
    },
    // 绘本推荐列表 
    queryBookRecommend: (data) => {
        return fly.request('/becausebooks-app/home/queryBookRecommend', data, {
            method: 'post'
        });
    },
    // 借阅排行列表 
    queryBorrowSort: (data) => {
        return fly.request('/becausebooks-app/home/queryBorrowSort', data, {
            method: 'post'
        });
    },
    // 查询阅读指导列表 
    queryReadGuide: (data) => {
        return fly.request('/becausebooks-app/home/queryReadGuide', data, {
            method: 'post'
        });
    },
    /**
     * 分类列表
     * type:  1-图书， 2-活动， 3-课程
     */
    queryCategory: (data) => {
        return fly.request('/becausebooks-app/common/queryCategory', data, {
            method: 'post'
        });
    },
    // 查询活动列表 
    queryActivity: (data) => {
        return fly.request('/becausebooks-app/home/queryActivity', data, {
            method: 'post'
        });
    },
    // 查询活动详情 
    getActivityDetail: (data) => {
        return fly.request('/becausebooks-app/home/getActivityDetail', data, {
            method: 'post',
            silence: true
        });
    },
    // 加入购物车 
    addShoppingCart: (data) => {
        return fly.request('/becausebooks-app/home/addShoppingCart', data, {
            method: 'post'
        });
    },
    // 查询购物车 
    queryShoppingCart: (data) => {
        return fly.request('/becausebooks-app/home/queryShoppingCart', data, {
            method: 'post'
        });
    },
    // 更新购物车 
    updateShoppingCart: (data) => {
        return fly.request('/becausebooks-app/home/updateShoppingCart', data, {
            method: 'post'
        });
    },
    // 删除购物车 
    deleteShoppingCart: (data) => {
        return fly.request('/becausebooks-app/home/deleteShoppingCart', data, {
            method: 'post'
        });
    },
    // 查询优惠券列表 
    queryVoucher: (data) => {
        return fly.request('/becausebooks-app/home/queryVoucher', data, {
            method: 'post'
        });
    },
    // 下单 
    confirmOrder: (data) => {
        return fly.request('/becausebooks-app/home/confirmOrder', data, {
            method: 'post'
        });
    },
    // 查询待支付订单 
    getUnPaidOrder: (data) => {
        return fly.request('/becausebooks-app/home/getUnPaidOrder', data, {
            method: 'post'
        });
    },
    // 查询订单详情 
    getOrderDetail: (data) => {
        return fly.request('/becausebooks-app/home/getOrderDetail', data, {
            method: 'post'
        });
    },



    // --------------------------课程-------------------------------
    // 课程列表 
    queryCourse: (data) => {
        return fly.request('/becausebooks-app/course/queryCourse', data, {
            method: 'post'
        });
    },
    // 取消、预约课程  
    orderOrCancelCourse: (data) => {
        return fly.request('/becausebooks-app/course/orderOrCancelCourse', data, {
            method: 'post'
        });
    },


    //--------------------------我的--------------------------------
    // 查询我的卡券 
    getMyCardAndVoucher: (data) => {
        return fly.request('/becausebooks-app/own/getMyCardAndVoucher', data, {
            method: 'post'
        });
    },
    // 查看我的收藏 
    getMyCollection: (data) => {
        return fly.request('/becausebooks-app/own/getMyCollection', data, {
            method: 'post'
        });
    },
    // 收货地址列表 
    getReceiveAddress: (data) => {
        return fly.request('/becausebooks-app/own/getReceiveAddress', data, {
            method: 'post',
            silence: true
        });
    },
    // 添加收货地址
    addReceiveAddress: (data) => {
        return fly.request('/becausebooks-app/own/saveOrUpdateReceiveAddress', data, {
            method: 'post'
        });
    },
    // 删除收货地址
    deleteReceiveAddress: (data) => {
        return fly.request('/becausebooks-app/own/deleteReceiveAddress', data, {
            method: 'post'
        });
    },
    // 根据id查询收货地址
    getReceiveAddressById: (data) => {
        return fly.request('/becausebooks-app/own/getReceiveAddressById', data, {
            method: 'post'
        });
    },
    // 查询个人信息 
    getUserInfo: (data) => {
        return fly.request('/becausebooks-app/own/getUserInfo', data, {
            method: 'post',
            silence: true
        });
    },
    // 更新个人信息 
    updateUserInfo: (data) => {
        return fly.request('/becausebooks-app/own/updateUserInfo', data, {
            method: 'post'
        });
    },
    // 查询我的成长 
    getMyGrowUp: (data) => {
        return fly.request('/becausebooks-app/own/getMyGrowUp', data, {
            method: 'post'
        });
    },
    // 查询我的成长记录
    getMyGrowthRecord: (data) => {
        return fly.request('/becausebooks-app/own/getMyGrowthRecord', data, {
            method: 'post'
        });
    },
    // 查询课程预约 
    getCourseOrder: (data) => {
        return fly.request('/becausebooks-app/own/getCourseOrder', data, {
            method: 'post'
        });
    },
    // 查询书籍借阅 
    getBookBorrow: (data) => {
        return fly.request('/becausebooks-app/own/getBookBorrow', data, {
            method: 'post'
        });
    },
    // 查询我的评论 
    getMyComment: (data) => {
        return fly.request('/becausebooks-app/own/getMyComment', data, {
            method: 'post'
        });
    },
    // 查询评论
    getComment: (data) => {
        return fly.request('/becausebooks-app/own/getComment', data, {
            method: 'post'
        });
    },
    // 查询我的订单 
    getMyOrder: (data) => {
        return fly.request('/becausebooks-app/own/getMyOrder', data, {
            method: 'post'
        });
    },
    // 查询我的活动
    getMyActivity: (data) => {
        return fly.request('/becausebooks-app/own/getMyActivity', data, {
            method: 'post'
        });
    },

    //--------------------------图书--------------------------------
    // 查询书包
    queryBag: (data) => {
        return fly.request('/becausebooks-app/book/queryBag', data, {
            method: 'post',
            silence: true
        });
    },
    // 添加书包
    addBag: (data) => {
        return fly.request('/becausebooks-app/book/addBag', data, {
            method: 'post'
        });
    },
    // 删除书包
    deleteBag: (data) => {
        return fly.request('/becausebooks-app/book/deleteBag', data, {
            method: 'post'
        });
    },
    // 查询图书列表
    queryBook: (data) => {
        return fly.request('/becausebooks-app/book/queryBook', data, {
            method: 'post',
            silence: true
        });
    },
    // 查询图书详情
    getBookDetail: (data) => {
        return fly.request('/becausebooks-app/book/getBookDetail', data, {
            method: 'post'
        });
    },
    // 预约图书
    borrowBook: (data) => {
        return fly.request('/becausebooks-app/book/borrowBook', data, {
            method: 'post'
        });
    },
    // 取书详情
    takeBookDetail: (data) => {
        return fly.request('/becausebooks-app/book/takeBookDetail', data, {
            method: 'post'
        });
    },
    // 到期归还提醒
    returnRemind: (data) => {
        return fly.request('/becausebooks-app/book/returnRemind', data, {
            method: 'post'
        });
    },


    //--------------------------公共--------------------------------
    // 查询区域列表
    queryArea: (data) => {
        return fly.request('/becausebooks-app/common/queryArea', data, {
            method: 'post'
        });
    },
    // 添加收藏
    addCollection: (data) => {
        return fly.request('/becausebooks-app/common/addCollection', data, {
            method: 'post'
        });
    },
    // 删除收藏
    deleteCollection: (data) => {
        return fly.request('/becausebooks-app/common/deleteCollection', data, {
            method: 'post'
        });
    },
    // 添加评论
    addComment: (data) => {
        return fly.request('/becausebooks-app/common/addComment', data, {
            method: 'post'
        });
    },
    // 删除评论
    deleteComment: (data) => {
        return fly.request('/becausebooks-app/common/deleteComment', data, {
            method: 'post'
        });
    },

    //--------------------------微信--------------------------------

    // 微信登录（小程序）
    xcxLogin: (data) => {
        return fly.request('/becausebooks-app/weixin/xcxLogin', data, {
            method: 'post'
        });
    },
    // 小程序支付调用
    xcxpay: (data) => {
        return fly.request('/becausebooks-app/weixin/xcxpay', data, {
            method: 'post'
        });
    }
}