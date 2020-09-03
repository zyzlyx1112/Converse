function RenderPageBtn(){}
$.extend(RenderPageBtn.prototype , {
    init : function(data , shownum){
        return this.RenderPageBtnFun(data , shownum);
    },
    RenderPageBtnFun : function(data , shownum){

        var total = Math.ceil(data / shownum);
        var html = "";
        for( var i = 0 ; i < total ; i++){
           html += `<span class="pg-num">${i+1}</span>`
        }
        return html;
    }
})
export default new RenderPageBtn();