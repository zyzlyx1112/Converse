function RenderGl(){}
$.extend(RenderGl.prototype , {
    init : function(data){
        return this.renderGlFun(data);
    },
    renderGlFun : function(data){
        var html = "";
        $.each(data , function(index , item){
            html += `<div class="goodslist" data-id="${item.id}">
                        <img src="${item.img}" alt="">
                        <span class="goodslist-title">${item.title}</span>
                        <span class="goodslist-price">￥${item.price}.00</span>
                    </div>`
        })
        return html;
    }
})

export default new RenderGl();