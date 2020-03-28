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
            method: 'post'
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


    // 查询图书列表
    queryBook: (data) => {
        return fly.request('/becausebooks-app/book/queryBook', data, {
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
            method: 'post'
        });
    },
    // 添加收货地址
    addReceiveAddress: (data) => {
        return fly.request('/becausebooks-app/own/addReceiveAddress', data, {
            method: 'post'
        });
    },

    //--------------------------图书--------------------------------
    // 查询书包
    queryBag: (data) => {
        return fly.request('/becausebooks-app/book/queryBag', data, {
            method: 'post'
        });
    },


    //--------------------------公共--------------------------------
    // 查询区域列表
    queryArea: (data) => {
        return fly.request('/becausebooks-app/common/queryArea', data, {
            method: 'post'
        });
    }
}