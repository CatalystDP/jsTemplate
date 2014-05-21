 var containerHeight=$("body")[0].scrollHeight,
                    e=document.documentElement||document.body,
                   	allHeight=e.clientHeight;
                    var footer=$(".js-footer-wp");
                    if(containerHeight<allHeight)
                    	footer.css({position:'absolute',bottom:'0px',zIndex:1});
/*这段代码是复制到需要的地方进行单页面页脚贴底边的，根据需要修改*/