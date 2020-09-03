function RenderShopCart(){}
$.extend(RenderShopCart.prototype , {
    init : function(data){
        return this.renderCartPageFun(data);
    },
    renderCartPageFun : function(data){
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

        var total_price  = 0;
        var goods_num    = 0;
        var pagehtml     = "";
        
        $.each(data , $.proxy(function(index , item){
            pagehtml += `<div class="shopcart-list">
                        <div class="goods-box">
                            <div class="goods-img">
                                <a href="http://127.0.0.1:5500/src/goods.html?id=${item.id}" target="_blank">
                                    <img src="${item.img}" alt="">
                                </a>
                            </div>
                            <div class="goods-detial">
                                <h4>
                                    <a href="#">${item.title}</a>
                                </h4>
                                <p>型号：10018575212</p>
                                <p>颜色：小麦色</p>
                                <p>尺码：OS</p>
                            </div>
                            <div class="goods-price">
                                <p>￥${item.price * item.count}.00</p>
                                <div class="shopcart-qty">
                                    <label>数量</label>
                                    <div class="calculate-num events-calculateNum"  data-id="${item.id}">
                                        <i class="icon icon-left-minus"></i>
                                        <input type="text" value="${item.count}" class="qty-input events-input">
                                        <i class="icon icon-left-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            goods_num += item.count;
            total_price += item.count * item.price;
        },this))

        var pricehtml = `<div>
                            <div class="tit">商品原价：</div>
                            <div class="info">￥ ${total_price}.00</div>
                        </div>
                        <div>
                            <div class="tit">店铺活动：</div>
                            <div class="info">￥ 0.00</div>
                        </div>
                        <div>
                            <div class="tit">商品金额:</div>
                            <div class="info">￥ ${total_price}.00</div>
                        </div>`
        var goodsnumhtml = `<p>您的购物车:${goods_num}件商品</p>`

        var html = [pagehtml , pricehtml , goodsnumhtml];
        

        return html;
    }
})

export default new RenderShopCart();