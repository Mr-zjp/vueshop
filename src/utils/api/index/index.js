import config from '../../config'
import {request} from "../../axios.js";
//首页幻灯片接口
export function getBannerData() {
    return request(config.baseApi+"home/index/slide?token="+config.token);
}
//分类导航
export function getNavData(){
    return request(config.baseApi+"/home/index/nav?token="+config.token);
}
//首页产品
export function getProducts(){
    return request(config.baseApi+"/home/index/goodsLevel?token="+config.token);
}
//首页推荐
export function getRecomData(){
    return request(config.baseApi+"/home/index/recom?token="+config.token);
}
//搜索
export function getSearchData(){
    return request(config.baseApi+"/home/goods/param?kwords=连衣裙?token="+config.token);
}