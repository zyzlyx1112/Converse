function SearchBox(){
    this.search_button = $("#search-button");
    this.search_box = $("#search-box");
    this.close_btn  = $("#close-btn");
    this.search_btn = $("#search-btn");
}
$.extend(SearchBox.prototype , {
    init : function(){
        this.search_button.on("click" , this.searchBoxShow.bind(this));
        this.close_btn.on("click" , this.searchBoxclose.bind(this));
        this.search_btn.on("click" , this.kaiwanxiao.bind(this));
    },
    searchBoxShow : function(){
        this.search_box.css("display") === "none" ? this.search_box.css("display" , "block") : this.search_box.css("display" , "none");
    },
    searchBoxclose : function(){
        this.search_box.css("display") === "block" ? this.search_box.css("display" , "none") : "";
    },
    kaiwanxiao : function(){
        alert("你还当真了？");
    }
})
export default new SearchBox();