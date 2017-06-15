var ww=document.body.clientWidth;
$(document).ready(function(){
	$(".nav-menu li a").each(function(){
		if($(this).next().length>0){
			$(this).addClass("parent");
		};
	})
	adjustMenu();
}) 
$(window).bind('resize orientationchange',function(){ww=document.body.clientWidth;adjustMenu();});
var adjustMenu=function(){
	if(ww<767){
		var menuht=$(window).height()-100;$(".sub-menu").hide();
		$('#branding').addClass('narrow-header');
		$('#access a').removeClass('hidden'); 
		$('#access a').removeClass('active hidden'); 
		$('#main-menu').removeClass('in');
		$('#main-menu').addClass('mobile-menu');
		$(".nav-menu li").unbind('mouseenter mouseleave');
		$(".nav-menu li a.parent").unbind('click').bind('click',function(e){e.preventDefault();menuscroll();
		if($(this).next().is(":hidden")){
			$('.sub-menu').hide();
			$(this).next().show();
		}else{
			$(this).next().hide();}});
			$(".hamburger ").click(function(){
				if($('.hamburger').hasClass('active')){
					$('.mobile-menu').css('height',menuht);
				}else{
					$('.mobile-menu').css('height',0);
				}
			});
	}else if(ww>=767){
		$(".nav-menu li").removeClass("hover");
		$(".nav-menu li a").unbind('click');
		$('#main-menu').removeClass('mobile-menu');
		$(".nav-menu li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave',function(){
			$(this).toggleClass('hover');
		});
	}
}