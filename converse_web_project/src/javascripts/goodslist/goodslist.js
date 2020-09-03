import livechat from "../index/livechat.js";
import search from "../index/search.js";
import loaddata from "../index/loaddata.js";
import renderNav from "../index/rendernav.js";
import renderGl from "./rendergl.js";
import renderpagebtn from "./renderpagebtn.js";
import updatecartnum from "../shopcart/updatecartnum.js";

export default function(){
    var product_list = $("#goodslist-box");
    var pagination   = $("#pagination");
    var left_tool    = $("#fcd");
    var type_box     = $("#type-box");
    var header_cart_num = $("#header-shop-carts")
    var shownum      = 36;
    var cache        = null;
    var imgs         = null;
    // var timer        = null;
    var pghtml       = null;
    var data         = null;

    livechat.init();
    search.init();
    var def = loaddata.init();
    def.done(function(res){
        renderNav.init(res.header_nav);

        cache = res.goodslist;
        
        var glhtml = renderGl.init(cache.slice(0 , shownum));
        product_list.html(glhtml);

        imgs = product_list.children(".goodslist").children("img");

        //将offsetTop添加进入图片属性中，方便取出
        $.each(imgs , function(index , item){
            item.setAttribute("data-top" , parseInt($(item).offset().top));
        });


        // console.log(paginationnum);
        //分页器内容;
        pghtml = renderpagebtn.init(res.goodslist.length , shownum);
        pagination.html(pghtml);

        var header_cart_html = updatecartnum.init(res.goodslist);
        header_cart_num.append(header_cart_html);
    });

    //-----------------懒加载功能--------------------
    $(window).on("scroll" , function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(timer != null)  return false;
        timer = setTimeout ( function(){
            var showimg = cache.slice(0,shownum);
            console.log(data);
            $.each(imgs , function(index , item){
                var img_offsetTop = item.getAttribute("data-top");
                if(scrollTop > img_offsetTop-900){
                    item.setAttribute("src" , showimg[index].img);
                }
            })
            timer = null;
        },200)  
    })

    pagination.on("click" , "span" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;

        var pagenum = target.innerHTML;
        data = interceptData(cache , pagenum);

        var html = renderGl.init(data);
        product_list.html(html);
    })

    function interceptData(data , pagenum){
        var min = shownum * (pagenum - 1);
        var max = shownum * pagenum - 1;
        data = data.filter(function(item , index){
            return index >= min && index <= max;
        })
        // console.log(min , max);
        return data;
    }

    //左边功能：实现一个动画;
    left_tool.on("click" , "dt" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;

        var dd = $(target).siblings("dd");
        if(dd.css("display") === "none"){
            dd.css("display" , "block");
        }else{
            dd.css("display" , "none");
        }
    })

    //顶部功能,有一个动画;
    type_box.on("click" , "a" , function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;

        $(target).css({"background-color" : "black" , "color" : "white"})
        .siblings().css({"background-color" : "white" , "color" : "black" , "border-color" : "#999"});
    })

    //携带id值跳转至商品详情页;
    product_list.on("click" , $.proxy(function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        window.open("http://127.0.0.1:5501/converse_web_project/src/goods.html?id="+$(target).parent(".goodslist").attr("data-id"));
    },this))
}