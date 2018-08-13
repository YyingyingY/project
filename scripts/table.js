+function($){
   

           

// 关于放大镜加上选项卡

function ChoiceTable2(){

}
ChoiceTable2.prototype.init=function(btnSelector,show1Selector,show2Selector){
    //找属性
    this.show1 = $(show1Selector);
    this.show2 = $(show2Selector);
    this.btn=$(btnSelector)
    this.show1.first().show().siblings().hide() 
    this.show2.first().show().siblings().hide() 
   
    this.index=0
    //参数判断
    if(this.btn.length==0||this.btn==null||this.show1.length==0||this.show1==null||this.show2.length==0||this.show2==null){
        return 0
    }
    //调用绑定事件
    this.handleEvent()
}
ChoiceTable2.prototype.handleEvent=function(){
    for(let i=0;i<this.btn.length;i++){
        this.btn.eq(i).click(function(){
            this.show1.eq(i).show().siblings().hide()
            this.show2.eq(i).show().siblings().hide()
        
        }.bind(this)
    )
    }
}
ChoiceTable2.prototype.changeIndex=function(index){
this.index=index
}

var choiceTable2=new ChoiceTable2()
choiceTable2.init("#xiaotu li",".small img",".big img")


}(jQuery)