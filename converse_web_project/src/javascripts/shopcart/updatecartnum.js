function UpdateCartNum(){}
$.extend(UpdateCartNum.prototype , {
    init : function(data){
        return this.renderCartNum(data);
    },
    renderCartNum : function(data){
        var ls = localStorage.getItem("carts");
        var la = JSON.parse(ls === null ? [] : ls);

        data = data.filter(function(data_item){
            return la.some(function(carts_item){
                if(data_item.id == carts_item.id){
                    data_item.count = carts_item.count;
                    return true;
                }
            })
        })

        var cart_count = 0;
        var html = "";

        $.each(data , function(index , item){
            cart_count += item.count;
        })

        html = `<span>${cart_count}</span>`;
        return html;
    }
})

export default new UpdateCartNum();