import config from '../../config'
import {request} from "../../axios.js";
//商品导航
export function getMenuData() {
    return request(config.baseApi+"/home/category/menu?token="+config.token);
}
export function getGoodsData() {
    return request(config.baseApi+"/home/category/show?cid=493&token="+config.token);
}