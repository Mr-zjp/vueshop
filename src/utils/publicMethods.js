import echo from '../assets/js/echo.js';
function lazyImg() {
    echo.init({
        offset: 100,//可视区域多少像素可以被加载
        throttle: 0//设置图片延迟加载时间
    })
}
export default {
    lazyImg
}