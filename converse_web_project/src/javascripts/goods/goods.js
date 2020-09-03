import livechat from "../index/livechat.js";
import search from "../index/search.js";
import loaddata from "../index/loaddata.js";
import renderNav from "../index/rendernav.js";
import rendergoodspage from "./rendergoodspage.js";
import zoom from "./zoom.js";
import addcart from "./addcart.js";
import updatecartnum from "../shopcart/updatecartnum.js";


export default function(){
    var small_img_wrapper   = $("#small-img-wrapper");
    var big_img_wrapper     = $("#big-img-wrapper");
    var product_bottom_list = $("#product-bottom-list");
    var header_cart_num     = $("#header-shop-carts");
    livechat.init();
    search.init();
    var def = loaddata.init();
    def.done(function(res){
        renderNav.init(res.header_nav);
        var html = rendergoodspage.init(res.goodslist);
        small_img_wrapper.append(html[0]);
        big_img_wrapper.html(html[1]);
        product_bottom_list.html(html[2]);
        zoom.init();
        addcart.init(res.goodslist);

        var header_cart_html = updatecartnum.init(res.goodslist);
        header_cart_num.append(header_cart_html);
    })
}