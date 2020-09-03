function Zoom(){
    this.small_img_wrapper = $("#small-img-wrapper");
    this.big_img_wrapper   = $("#big-img-wrapper");
    this.cube              = $("#cube");
    this.product_list_btn  = $("#product-bottom-list");
}
$.extend(Zoom.prototype , {
    init : function(){
        this.big_img           = $("#big-img");
        this.small_img_wrapper.on("mouseenter" , $.proxy(function(){
            this.cube.css({"display" : "block"});
            this.big_img_wrapper.css("display" , "block");
        },this))
        this.small_img_wrapper.on("mouseleave" , $.proxy(function(){
            this.cube.css("display" , "none");
            this.big_img_wrapper.css("display" , "none");
        },this))
        this.small_img_wrapper.on("mousemove" , $.proxy(this.cubeMove,this));
        this.small_img_wrapper.on("mousemove" , $.proxy(this.bigImgPosition , this));
    },
    cubeMove : function(evt){
        var e = evt || event;

        this.mouse_x  = e.offsetX;
        this.mouse_y  = e.offsetY;
        var cube_left = this.mouse_x - this.cube.width() / 2;
        var cube_top  = this.mouse_y - this.cube.height() / 2
        // this.cube.css({"left" : cube_left , "top" : cube_top});

        //增加边界检测;
        var cube_position = this.boundry(cube_left , cube_top);
        this.cube.css({"left" : cube_position.x , "top" : cube_position.y});
    },
    boundry : function(x , y){
        var max_x = this.small_img_wrapper.width() - this.cube.width();
        var max_y = this.small_img_wrapper.height() - this.cube.height();

        x = x <= 0 ? 0 : x;
        x = x >= max_x ? max_x : x;

        y = y <= 0 ? 0 : y;
        y = y >= max_y ? max_y : y;

        return {
            x : x,
            y : y
        }
    },
    bigImgPosition : function(){
        var cube_left = parseInt(this.cube[0].style.left);
        var cube_top  = parseInt(this.cube[0].style.top);

        var propx = cube_left / (this.small_img_wrapper.width() - this.cube.width());
        var propy = cube_top / (this.small_img_wrapper.height() - this.cube.height());

        var big_img_position = {
            x : parseInt( propx * (this.big_img.width() - this.big_img_wrapper.width())),
            y : parseInt( propy * (this.big_img.height() - this.big_img_wrapper.height()))
        }

        this.big_img.css({"left" : -big_img_position.x , "top" : -big_img_position.y});
    }
})

export default new Zoom();