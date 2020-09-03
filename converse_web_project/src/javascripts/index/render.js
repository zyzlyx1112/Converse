function Render(){
    this.nav_wrapper     = $("#second-list");
    this.nav             = $("#nav").children("ul");
    this.male            = $("#nav-male");
    this.female          = $("#nav-female");
    this.children        = $("#nav-children");
    this.nav_first_list  = $("#first-floor");
    this.nav_second_list = $("#second-floor");
    this.timer           = null;
}
$.extend(Render.prototype , {
    init : function(data){
        this.nav.on("mouseover" , "a" ,this.renderNav.bind(this , data));
        this.nav.on("mouseout" , "a" , this.hideNav.bind(this));
        this.nav_wrapper.on("mouseover" , function(){
            clearTimeout(this.timer);//当鼠标滑入二级菜单关闭延时器;
            this.nav_wrapper.css({"opacity" : "1" , "transition" : "all .5s"});
        }.bind(this));
        this.nav_wrapper.on("mouseout" , function(){
            this.hideNav();//鼠标滑出二级菜单时延时隐藏二级菜单;
        }.bind(this));
    },
    renderNav : function(data , evt){
        var e      = evt || event;
        var target = e.target || e.srcElement;
        var data_type = target.getAttribute("data-type");
        var html1 = "";
        var html2 = "";

        //每次清空延时器;
        clearTimeout(this.timer);

        this.nav_wrapper.css({"opacity" : "1" , "transition" : "all .5s"});
        this.nav_wrapper.css("display" , "block");

        $.each(this.nav.children() , function(index , item){
            if(item.children[0] === target){
                if(data[data_type].length < 6){
                    for(var i = 0 ; i < data[data_type].length; i ++){
                        html1 += `<li>
                                    <img src="${data[data_type][i].src}" alt="">
                                    <span>${data[data_type][i].title}</span>
                                </li>`
                    }
                }else{
                    for(var i = 0 ; i < 6; i++){
                        html1 += `<li>
                                    <img src="${data[data_type][i].src}" alt="">
                                    <span>${data[data_type][i].title}</span>
                                </li>`
                    }
                    for(var i = 6; i < 12 ; i++){
                        html2 += `<li>
                                    <img src="${data[data_type][i].src}" alt="">
                                    <span>${data[data_type][i].title}</span>
                                </li>`
                    }
                }
            }
        })
        if(data[data_type].length > 6){
            this.nav_second_list.css("display" , "block");
            this.nav_first_list.html(html1);
            this.nav_second_list.html(html2);
        }else{
            this.nav_first_list.html(html1);
            this.nav_second_list.css("display" , "none");
        }

    },
    hideNav : function(){
        //每次清空延时器;
        clearTimeout(this.timer);
        this.nav_wrapper.css({"opacity" : "0" , "transition" : "all .5s"});
        this.timer = setTimeout(function(){
            this.nav_wrapper.css("display" , "none");
        }.bind(this) , 500)
    }
})

export default new Render();