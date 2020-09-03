function Banner(){
    this.banner      = $("#banner");
    this.img_wrapper = $("#img-wrapper");
    this.imgs        = this.img_wrapper.children();
    this.prev_btn    = $("#prev-btn");
    this.next_btn    = $("#next-btn");
    this.pagination  = $("#pagination");
    this.showIndex   = 0;
    this.timer       = null;
    this.init();
}
$.extend(Banner.prototype,{
    init : function(){
        this.prev_btn.on("click" , this.prevIndex.bind(this));
        this.next_btn.on("click" , this.nextIndex.bind(this));
        //点击事件处理函数
        this.banner.on("click" , this.fade.bind(this));

        //点击banner跳转
        this.pagination.on("click" , this.paginationClick.bind(this));
        this.img_wrapper.on("mouseover" , function(){
            clearInterval(this.timer);
        }.bind(this));
        this.img_wrapper.on("mouseout" , function(){
            this.pageAutoChange();
        }.bind(this));

        this.pageAutoChange();
    },
    prevIndex : function(){
        if(this.showIndex === 0){
            this.showIndex = this.imgs.length - 1;
        }else{
            this.showIndex --;
        }
    },
    nextIndex : function(){
        if(this.showIndex === this.imgs.length - 1){
            this.showIndex = 0;
        }else{
            this.showIndex ++ ;
        }
    },
    fade : function(){
        $.each(this.imgs , function(index , item){
            item.style.opacity    = 0;
            item.style.transition = "all 1s";
        });
        this.imgs[this.showIndex].style.opacity = 1;
    },
    paginationClick : function(evt){
        clearInterval(this.timer);
        var e      = evt || event;
        var target = e.target || e.srcElement;
        var children = [].slice.call(target.parentNode.children);
        // console.log(children);
        // console.log(children.indexOf(target));
        for(var i = 0 ; i < children.length ; i++){
            if(target === children[i]){
                this.showIndex = i;
                break;
            }
        }
        this.pageAutoChange();
    },
    pageAutoChange : function(){
        // var event = new Event("click");
        clearInterval(this.timer);
        this.timer = setInterval(function(){
            this.nextIndex();
            this.fade();
        }.bind(this),2000);
    }
})
// new Banner();
export default new Banner();
