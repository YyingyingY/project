// 轮播图插件
/*
		面向对象轮播图使用方法：
			1、轮播图的结构为：	
				<div id="轮播图的唯一标识id">
					<ul></ul>--里面可以随意放图片，必须包含在li中；
					<ul></ul>--里面是小导航，使用li，添加样式active类，固定位置即可；
					<ul></ul>--左右箭头，里面只需要放两个li，设置样式添加类名即可；
				</div>
			2.只需要将【轮播图的唯一标识id】放进-- new ImgMover("#id或.class")--；
			3.需要将这个jquery链接放进页面的最上面：<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">< /script>
			4.就好了
		*/
function ImgMover(elem) {//  ------面向对象jQuery轮播图(1)
    this.elem = $(elem);//使用jquery获取到最外层的id
    this.index = 0;//设置下标的初始值
    this.setTime();//调用定时器运行模块
    this.clickNav();//调用点击小圆球切换图片的方法
    this.leftRight();//调用左右箭头切换图片的方法
    this.outTime();//调用鼠标移动到图片上停止定时器
}
ImgMover.prototype = {//  ------面向对象jQuery轮播图(2) 
    setTime: function () {// ------定时器运行模块
        this.time = setInterval(function () {//定时器开启
            this.lrmove("true");//调用运动模块
            this.simNAV(this.index >= this.elem.children().eq(0).children().length - 1 ? 0 : this.index);//调用小圆球跟随当前图片的切换；三木运算是因为，实现无缝轮播多添加了一张图片，需要判断，当签下表等于四的时候，就是说明当前已经运动到第五张图片了，但是因为在运动当中，第五张图片已经瞬移到了第一张，所以就要吧小圆球的下标改成0，也就是成了第一个。
        }.bind(this), 3000);//定时器里使用this获取到的是window，所以要使用bind，定时器时间是三秒；
    },
    outTime: function () {// ------鼠标移动到图片上停止定时器
        var byIndex = this;//是为了在事件中获取的this是window，所有需要先将this储存一下
        this.elem.mouseover(function () {//当鼠标移入外面最大的div内，就停止（清除）定时器；
            clearInterval(byIndex.time);
        });
        this.elem.mouseout(function () {//当鼠标移出时，就重新调用定时器。
            byIndex.setTime();
        });
    },
    lrmove: function (a) {// ------运动模块
        var Oul = this.elem.children().eq(0);//获取到当前的图片ul；
        if (a == "true") {//true 往右切换图片
            this.index++;//往右的就是图片按照 --> 箭头方向运动  index会一直加1
            if (this.index == this.elem.children().eq(0).children().length) {//如果当前元素等于5时，是因为this.index会一直加1，然后当index等当前li的最大下标时，还会进行加1，这时需要图片的总个数，如果等于总个数，就进入判断。
                Oul.css({ left: 0 })//当前的ul瞬移到0；第一张图片
                this.index = 1;//把当前的index改成1；
            }
            this.simNAV(this.index <= this.elem.children().eq(0).children().length - 2 ? this.index : 0);//小圆点跟随切换，三木运算是因为，小圆点只有四个，就是正确的个数，所以需要正确的下边，如果当前index小于等于(当前总图片减去与第一张相同的图片的个数)的下标，就继续按照当前的下标进行切换，如果大于就切换成0
            Oul.stop().animate({ left: -this.index * this.elem.children().eq(0).children().eq(0).width() })//将当前的ul进行运动、更改left值，*号后边的，是获取第一张图片的宽度
        } else if (a == "false") {//false 往左切换图片
            this.index--;//往左的就是图片按照 <-- 箭头方向运动  index会一直减1
            if (this.index < 0) {//如果当前的index值小于0，就是说明当前图片已经第一张图片还在往上一张运动
                let target = this.elem.children().eq(0).width() - this.elem.children().eq(0).children().eq(0).width();//获取的是ul的总宽度减去单张的图片的宽度
                Oul.css({ left: - target })//将ul瞬移到与第一张照图片一样的哪一张的前一张的位置
                this.index = this.elem.children().eq(0).children().length - 2;
            }
            this.simNAV(this.index);//小圆点跟随切换
            Oul.stop().animate({ left: -this.index * this.elem.children().eq(0).children().eq(0).width() })//将当前的ul进行运动、更改left值，*号后边的，是获取第一张图片的宽度
        }
    },
    simNAV: function (index) {// ------小圆球模块
        //自动跟随图片的小圆点 
        this.elem.children().eq(1).children().eq(index).addClass("active").siblings().removeClass("active");//jquery写法：获取到当前的元素，找到当前下标的元素给添加class类，然后找到当前元素的其他兄弟元素删除class类
    },
    clickNav: function () {// ------手动点击小圆球切换图片
        var byIndex = this;
        this.elem.children().eq(1).children().click(function () {
            byIndex.index = $(this).index() - 1;
            // 调用运动的模块
            byIndex.lrmove("true");
            // 调用小圆球跟随的模块
            byIndex.simNAV($(this).index());
        })
    },
    leftRight: function () {// ------手动点击箭头进行换图
        var byIndex = this;
        this.elem.children().eq(2).children().eq(0).click(function () {
            byIndex.lrmove("false");
        });
        this.elem.children().eq(2).children().eq(1).click(function () {
            byIndex.lrmove("true");
        })
    }
}
new ImgMover("#banner");//  ------面向对象jQuery轮播图(3)
new ImgMover("#banner2");
new ImgMover("#changeMainPart");
new ImgMover(".changeMainPart1")