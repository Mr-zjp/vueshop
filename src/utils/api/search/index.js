import config from '../../config'
import {request} from "../../axios.js";
//热门搜索
export function getSearchData(){
    return request(config.baseApi+"/home/public/hotwords?token="+config.token);
}
//商品属性
export function getShopAttribute(kwords){
    return request(config.baseApi+"/home/goods/param?kwords="+kwords+"&token="+config.token);
}
//搜索商品结果
export function getResultData(data){
    console.log("参数data",data)
    let kwords=data.kwords?data.kwords:"";
    let page=data.page?data.page:1;
    let otype=data.otype?data.otype:"all";
    let cid=data.cid?data.cid:"";
    let price1=data.price1?data.price1:"";
    let price2=data.price2?data.price2:"";
    let param=data.param && data.param!=='[]'?data.param:"";
    let url=config.baseApi+"/home/goods/search?kwords="+kwords+"&param="+param+"&page="+page+"&price1="+price1+"&price2="+price2+"&otype="+otype+"&cid="+cid+"&token="+config.token;
    console.log("url",url);
    return request(url)
}