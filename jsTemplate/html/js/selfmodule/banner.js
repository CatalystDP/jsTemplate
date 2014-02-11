(function($,f) {
    var lastDiv,divArr,option, i=0,length;
    function changeDisplay(current){
        $(divArr).css("display","none");
       current.css("display","block");
    }
    function changeOpacity(current){
        current.animate({opacity:1},option.speed,option.easing);
    }
    function restoreOpacity(){
        if(lastDiv!=undefined)
            lastDiv.css("opacity",0);
    }
    function step(num){
        num=num||1;
        i+=num;
        if(i>(length-1))
            i=0;
    }
    function autoSwitchPic(){
        var c=$(divArr[i]);
        changeDisplay(c);
        restoreOpacity();
        changeOpacity(c);
        lastDiv=c;
        step();
    }
	var Banner=function(){
		var banner=this,
            divs=banner.children();
        divs.css({opacity:0,display:"none"}).
            last().css({opacity:1,display:"block"});
        length=divs.length;
        divArr=Array.prototype.slice.call(divs,0).reverse();
        var intV=setInterval(autoSwitchPic,option.delay);
    };

	$.fn.bannerFade = function(op) {
		var defaultOp = {
			speed: 1000,
			delay: 3000,
			easing: 'swing',
			keys:f,
			dots:f
		};
		if (option ===undefined)
			option = defaultOp;
		else
			option = $.extend(defaultOp, op);
		Banner.call(this);
	};
})(jQuery,false);


