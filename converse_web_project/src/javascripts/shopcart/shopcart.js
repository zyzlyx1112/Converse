import livechat from "../index/livechat.js";
import search from "../index/search.js";
import loaddata from "../index/loaddata.js";
import rendershopcart from "./rendershopcart.js";
import updatecartnum from "./updatecartnum.js";


export default function(){
    var shopcart_content = $("#shopcart-content");
    var shopcart_price   = $("#cart-price");
    var header_cart_num  = $("#header-shop-carts");
    var cart_num         = $("#cart-num");
    var cache            = null;

    livechat.init();
    search.init();
    var def = loaddata.init();
    def.done(function(res){
        {
            cache    = res.goodslist;
            var html = rendershopcart.init(res.goodslist);

            shopcart_content.html(html[0]);
            shopcart_price.html(html[1]);
            cart_num.html(html[2]);


            var header_cart_html = updatecartnum.init(res.goodslist);
            header_cart_num.append(header_cart_html);
        }
    })

    shopcart_content.on("click" , ".icon-left-plus" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;

        var data_id = $(target).parent().attr("data-id");

        var ls = localStorage.getItem("carts");
        var la = JSON.parse(ls);

        $.each(la , function(index , item){
            if(item.id === data_id){
                item.count++;
            }
        })

        localStorage.setItem("carts" , JSON.stringify(la));
        //刷新页面
        var html = rendershopcart.init(cache);

        shopcart_content.html(html[0]);
        shopcart_price.html(html[1]);
        cart_num.html(html[2]);
        
        //刷新上方购物车数量
        var header_cart_html = updatecartnum.init(cache);
            header_cart_num.append(header_cart_html);
    });

    shopcart_content.on("click" , ".icon-left-minus" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;

        var data_id = $(target).parent().attr("data-id");

        var ls = localStorage.getItem("carts");
        var la = JSON.parse(ls);

        $.each(la , function(index , item){
            if(item.id === data_id){
                item.count--;
                if(item.count == 0){
                    la.splice(index , 1);
                }
            }
        })

        localStorage.setItem("carts" , JSON.stringify(la));
        var html = rendershopcart.init(cache);

        shopcart_content.html(html[0]);
        shopcart_price.html(html[1]);
        cart_num.html(html[2]);


        var header_cart_html = updatecartnum.init(cache);
            header_cart_num.append(header_cart_html);
    })

}