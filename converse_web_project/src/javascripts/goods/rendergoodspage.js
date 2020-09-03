function RenderGoodsPage(){}
$.extend(RenderGoodsPage.prototype , {
    init : function(data){
        var loc  = location.href;
        var n1   = loc.length;
        var n2   = loc.indexOf("=");
        this.id  = decodeURI(loc.substr(n2+1 , n1-n2));
        var html = [];
        var small_img_html = this.renderSmallImg(data);
        var big_img_html   = this.renderBigImg(data);
        var img_list       = this.renderImgList(data);
        html.push(small_img_html , big_img_html , img_list);

        return html;
    },
    renderSmallImg : function(data){
        var html = "";
        $.each(data , $.proxy(function(index , item){
            if(item.id == this.id){
                html = `<img src="${item.detail.smallimg}" alt="">`
            }
        },this));
        return html;
    },
    renderBigImg : function(data){
        var html = "";
        $.each(data , $.proxy(function(index , item){
            if(item.id == this.id){
                html = `<img id="big-img" src="${item.detail.bigimg}">`
            }
        } , this));
        return html;
    },
    renderImgList : function(data){
        var html = "";
        $.each(data , $.proxy(function(index , item){
            if(item.id == this.id){
                $.each(item.detail.imglist , function(index1 ,item1){
                    html += `<span><img src="${item1}" alt=""></span>`;
                })
            }
        } , this))
        return html;
    }
})

export default new RenderGoodsPage();