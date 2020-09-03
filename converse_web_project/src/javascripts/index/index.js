import banner from "./banner.js";
import livechat from "./livechat.js";
import search from "./search.js";
import loaddata from "./loaddata.js";
import renderNav from "./RenderNav.js";
import renderHotselling from "./renderhotselling.js";
import updatecartnum from "../shopcart/updatecartnum.js";


export default function(){
    var header_cart_num = $("#header-shop-carts");

    banner.init();
    livechat.init();
    search.init();
    var def = loaddata.init();
    def.done(function(res){
        renderNav.init(res.header_nav);
        renderHotselling.init(res.hotselling);

        var header_cart_html = updatecartnum.init(res.goodslist);
        header_cart_num.append(header_cart_html);
    })
}