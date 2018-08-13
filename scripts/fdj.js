 function Magnifier(){

        }
        $.extend(Magnifier.prototype,{
            init:function(){
                // 元素选择
                this.smallBox = $(".small");
                this.bigBox = $(".big");
                this.grayBox = this.smallBox.find(".grayBox");
                this.bigImg = this.bigBox.find("img");
                this.smallImg = this.smallBox.find("img");
                // 计算比例;
                this.widthProp = this.bigBox.width() / this.grayBox.width();
                this.heightProp = this.bigBox.height() / this.grayBox.height();
                // 计算比例 --end;
                // 缩放图片;
                this.bigImg.width(this.widthProp * this.smallBox.width()) 
                this.bigImg.height(this.heightProp * this.smallBox.height()) 

                // console.log(this.widthProp,this.heightProp)

                this.handleEvent();
            },
            handleEvent:function(){
                this.smallBox.on("mouseenter",$.proxy(this.overEvent,this))
                this.smallBox.on("mouseleave",$.proxy(this.outEvent,this))
                this.smallBox.on("mousemove",$.proxy(this.moveEvent,this))
                this.smallBox.mousewheel($.proxy(this.boxScale,this))

            },
            overEvent:function(){
                // console.log("鼠标移入");
                this.grayBox.fadeIn();
                this.bigBox.fadeIn();
                this.smallImg.animate({
                    opacity:0.3
                })

            },
            outEvent:function(){
                // console.log("鼠标移出");
                this.grayBox.fadeOut();
                this.bigBox.fadeOut();
                this.smallImg.animate({
                    opacity:1
                })
            },
            moveEvent:function(event){
                // console.log("鼠标移动");
                var evt = event || window.event;
                var nLeft = evt.offsetX;
                var nTop = evt.offsetY;

                this.posElem({
                    left:nLeft - this.grayBox.width() / 2,
                    top:nTop- this.grayBox.height() / 2
                })
            },
            posElem:function(pos){
                // 给定位置定位元素
                // console.log(pos);
                // 边界检测;
                var maxLeft = this.smallBox.width() - this.grayBox.width();
                pos.left = pos.left <= 0 ? 0 : pos.left;
                pos.left = pos.left >= maxLeft  ? maxLeft : pos.left;

                var maxTop = this.smallBox.height() - this.grayBox.height();
                pos.top = pos.top <= 0 ? 0 : pos.top;
                pos.top = pos.top >= maxTop ? maxTop : pos.top;
                // 边界检测 -- end;

                this.grayBox.css({
                    left:pos.left,
                    top:pos.top
                });
                //运动小灰框背景图;
                this.grayBox.css({
                    backgroundPosition:-pos.left+"px "+ -pos.top + "px"
                })
                
                // 小图总路程;
                var totalleftRoad = this.smallBox.width() - this.grayBox.width();
                var totaltopRoad = this.smallBox.height() - this.grayBox.height();
                // 行进路程的比例;
                var leftProp =  parseInt(pos.left / totalleftRoad * 100 ) / 100;
                var topProp =  parseInt( pos.top / totaltopRoad * 100) / 100 ;

                //大图总路程;
                var totalLeft = this.bigImg.width() - this.bigBox.width();
                var totalTop = this.bigImg.height() - this.bigBox.height()
                
                // console.log(leftProp,topProp);

                this.bigImg.css({
                    left:-totalLeft * leftProp,
                    top:-totalTop * topProp
                })

            },
            boxScale:function(event,detal,detalX,detalY){
                // console.log(detal)


                if(detal <= -1){
                    if(this.grayBox.width() <= 50){
                        return 0;
                    }
                    //向下; => 缩小;
                    this.grayBox.css({
                        width:"-=2",
                        height:"-=2",
                        left:"+=1",
                        top:"+=1"
                    })
                }else if(detal >= 1){
                    if(this.grayBox.width() >= 200){
                        return 0;
                    }
                    //向上; => 放大;
                    this.grayBox.css({
                        width:"+=2",
                        height:"+=2",
                        left:"-=1",
                        top:"-=1"
                    })
                }
                // 计算比例;
                this.widthProp = this.bigBox.width() / this.grayBox.width();
                this.heightProp = this.bigBox.height() / this.grayBox.height();
                // 计算比例 --end;
                // 缩放图片;
                this.bigImg.width(this.widthProp * this.smallBox.width()) 
                this.bigImg.height(this.heightProp * this.smallBox.height()) 

                this.posElem({
                    left:this.grayBox.position().left,
                    top:this.grayBox.position().top
                })
                return false;
            }
        })
        
        var magnifier = new Magnifier();
        magnifier.init();  