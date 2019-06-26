var container = document.getElementById("container");
var inner = document.getElementById("inner");
var weiz = document.getElementById("weiz");
var tomingkuang = document.getElementById("tomingkuang");
var small = document.getElementById("small");
var onMouseEnterHandler = function(event){
    updated(event);
}

var onMouseLeaveHandler = function(){
    inner.style="";
    tomingkuang.style.display = "none";
    small.style.display = "none";
}

var onMouseMoveHandler = function(event){
        mouse.setOrigin(inner);
        mouse.updatePosition(event);
        weiz.innerHTML=mouse.showx()+'*******'+mouse.showy();
        var tmh = tomingkuang.offsetHeight;
        var tmw = tomingkuang.offsetWidth;
        tomingkuang.style.display = "flex";
        small.style.display = "flex";
        var theheight = 0;
        var theweight = 0;
        if(mouse.showy()>inner.offsetHeight - tmh/2){
            theheight = inner.offsetHeight - tmh/2;
        }else if(mouse.showy()<tmh/2){
            theheight = tmh/2;
        }else{
            theheight = mouse.showy();
        }
        if(mouse.showx()>inner.offsetWidth - tmw/2){
            theweight = inner.offsetWidth - tmw/2;
        }else if(mouse.showx()<tmw/2){
            theweight = tmw/2;
        }else{
            theweight = mouse.showx();
        }
        var marginh = theheight - tmh/2;
        var marginw = theweight - tmw/2;
        var ipp = marginh + 'px';
        tomingkuang.style.marginTop = ipp;
        var ipp2 = marginw + 'px';
        tomingkuang.style.marginLeft = ipp2;

        var bei = small.offsetHeight / tomingkuang.offsetHeight;
        size = bei*250 + '%' + ' ' + bei*150 + '%';
        small.style.backgroundSize = size;
        var ipp3 =  marginw*(-bei) + 'px' + ' ' + marginh*(-bei) + 'px';
        small.style.backgroundPosition = ipp3;

        var biggerpx = bigger + 'px';
        tomingkuang.style.height = biggerpx;
        tomingkuang.style.width = biggerpx;  

}

//鼠标滚轮时间监听
var bigger = 100;
$(document).on('mousewheel DOMMouseScroll',throttle(onMouseScroll,500));

    function throttle(func, wait) {
        let previous = 0;
        return function() {
            let now = Date.now();
            let context = this;
            let args = arguments;
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }
    }

    function onMouseScroll(e){
        e.preventDefault();
        var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1, Math.min(1, wheel) );
        if(delta<0){
            if(bigger<=50){
                bigger = 50;
            }else{
                bigger = bigger - 25;
            }
        }else{//向上滚动
            if(bigger>=200){
                bigger = 200;
            }else{
                bigger = bigger + 25;
            }
        } 
        var biggerpx = bigger + 'px';
        tomingkuang.style.height = biggerpx;
        tomingkuang.style.width = biggerpx;  
    }

inner.onmouseenter = onMouseEnterHandler;
inner.onmouseleave = onMouseLeaveHandler;
inner.onmousemove = onMouseMoveHandler;

var counter = 0;
var updateRate = 1;
var isTimeUpDate = function(){
    return counter++ % updateRate === 0;
}

var mouse = {
    _x:0,
    _y:0,
    x:0,
    y:0,
    updatePosition:function(event){
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = e.clientY - this._y;
    },
    setOrigin:function(e){
        this._x = e.offsetLeft;
        this._y = e.offsetTop;
    },
    showx:function(){
        return this.x;
    },
    showy:function(){
        return this.y;
    },
}
