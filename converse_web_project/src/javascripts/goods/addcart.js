import updatecartnum from "../shopcart/updatecartnum.js";

function AddCart(){}
$.extend(AddCart.prototype , {

    init : function(data){
        this.add_shopcart = $("#add-shopcart");
        this.header_cart_num = $("#header-shop-carts");

        var loc  = location.href;
        var n1   = loc.length;
        var n2   = loc.indexOf("=");
        this.id  = decodeURI(loc.substr(n2+1 , n1-n2));

        this.add_shopcart.on("click" , this.saveCart.bind(this , data));
    },
    saveCart : function(data){
        var s = localStorage.getItem("carts");
        if(s === null){
            var a = [{
                id : this.id,
                count : 1
            }]
            localStorage.setItem("carts" , JSON.stringify(a));
        }else{
            var la = JSON.parse(s);
            var has_same_id = false;
            $.each(la , $.proxy(function(index , item){
                if(item.id === this.id){
                    item.count++;
                    has_same_id = true;
                }
            },this))
            if(!has_same_id){
                la.push({
                    id : this.id,
                    count : 1
                })
            }
            localStorage.setItem("carts" , JSON.stringify(la));
        }
        var header_cart_html = updatecartnum.init(data);
        this.header_cart_num.append(header_cart_html);
    }
})

export default new AddCart();