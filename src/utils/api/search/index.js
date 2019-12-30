import config from '../../config'
import {request} from "../../axios.js";
//热门搜索
export function getSearchData(){
    return request(config.baseApi+"/home/public/hotwords?token="+config.token);
}
export function getResultData(kwords=""){
    return request(config.baseApi+"/home/goods/param?kwords="+kwords+"&token="+config.token);
}