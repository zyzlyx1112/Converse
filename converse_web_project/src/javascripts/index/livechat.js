function LiveChat(){
    this.livechat  = $("#livechat")[0];
    this.timer     = null;
    this.cHeight   = document.documentElement.clientHeight;
}
$.extend(LiveChat.prototype , {
    init : function(){
        $(window).on("scroll" , this.move.bind(this));
    },
    move : function(){
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.scrollTop);
        this.livechat.style.top = (this.cHeight - this.livechat.offsetHeight) / 2 + this.scrollTop + "px";
    }
})

export default new LiveChat();