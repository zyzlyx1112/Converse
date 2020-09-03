function RenderHotselling(){
    this.hp_selector    = $("#hp-selector");
    this.brand_menu     = $("#brand-menu");
    this.hp_list_first  = $("#hp-list-first");
    this.hp_list_second = $("#hp-list-second");
}
$.extend(RenderHotselling.prototype , {
    init : function(data){
        this.hp_selector.on("mouseover" , "img" , this.renderHot.bind(this ,data));
    },
    renderHot : function(data , evt){
        var e         = evt || event;
        var target    = e.target || e.srcElement;
        // console.log(target);
        // console.log(target.getAttribute("data-type"));
        var data_type = target.getAttribute("data-type");
        var html1     = "";
        var html2     = "";

        var arr = [].slice.call(this.hp_selector[0].children);

        //当前target所在位置;
        var signal = arr.indexOf(target.parentNode);

        this.brand_menu.css({"left" : 25*signal+"%" , "transition" : "all 1s"});

        $.each(this.hp_selector.children() , function(index , item){
            // console.log(this.brand_menu);
            if(item.children[1] === target){
                for(var i = 0 ; i < 4 ; i++){
                    html1 += `<li>
                                <img src="${data[data_type][i].img}" alt="">
                                <span class="hp-product-title">${data[data_type][i].title}</span>
                                <span class="hp-product-price">￥${data[data_type][i].price}</span>
                            </li>`;
                }
                for(var i = 4 ; i < 8 ; i++){
                    html2 += `<li>
                                <img src="${data[data_type][i].img}" alt="">
                                <span class="hp-product-title">${data[data_type][i].title}</span>
                                <span class="hp-product-price">￥${data[data_type][i].price}</span>
                            </li>`;
                }
            }
        })
        this.hp_list_first.html(html1);
        this.hp_list_second.html(html2);

    }
})
export default new RenderHotselling();