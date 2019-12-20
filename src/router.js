import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode: "hash",//1、hash哈希：有#号。2、history历史：没有#号
    base: process.env.BASE_URL, //自动获取根目录路径
    scrollBehavior: (to, from, position) => {
        if (position) {
            return position
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/home/tabBar/index.vue"),//路由懒加载解决首屏加载慢，性能优化
            meta: { keepAlive: false },
            redirect: "/index",
            children: [
                {
                    path: "/index",
                    name: "index",
                    component: () => import("./views/home/index"),
                    meta: { keepAlive: true, title: "首页" }
                },
                {
                    path: "/cart",
                    name: "cart",
                    component: () => import("./views/home/cart"),
                    meta: { keepAlive: false, title: "购物车" }
                },
                {
                    path: "/my",
                    name: "my",
                    component: () => import("./views/user/my"),
                    meta: { keepAlive: false, title: "我的" }
                },
            ]
        },
        {
            path: "/goods/goodsClassify",
            name: "goodsClassify",
            component: () => import("./views/home/goods/goodsClassify"),
            children: [
                {
                    path: "/goodsItems",
                    name: "goodsItems",
                    component: () => import("./views/home/goods/goodsItems"),
                    meta: {title: "分类" }
                }
            ]
        },
    ]
});
/* router.beforeEach((to,from,next)=>{
    if (to.meta.auth){
        if (Boolean(localStorage['isLogin'])){
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
}); */
export default router;