$(document).ready(function() {
	$('#fcside').click(function () {
		$("body").css({ overflow: 'inherit' });
		$(".sphinxsidebarwrapper").fadeOut(100);
		$("#fcside").fadeOut(100);
	});

	$.fn.autoScoll= function(activate){
		if ($.isNumeric(activate) || activate==true){
			var offset = 0
			if ($.isNumeric(activate)){
				offset = activate
			}
			$(this.selector+" a[href^='#']").click(function(event){

				normalscroll=true;
				event.preventDefault();
				var place = $($(this).attr('href'))
				if(!(place && place.offset() && place.offset().top)){
					return
				}
				$('html,body').clearQueue()
				$('html,body').stop()
				if(activate==true){
					offset =$(window).height()/2-place.parent("div").height()/2
				}
				$('html,body').animate({
					scrollTop: place.offset().top - offset //auf Nullinie Scrollen
				},1000,
					function(){
					setTimeout(function(){normalscroll=false},500);
					}
				);
			})
		}
	};

	$("body").autoScoll(100);
});





var thescroll=0;
var scrolling =false;

function scrolleventhandler (e) {

	if( thescroll > $(window).scrollTop()){
		scrolldir=-1;
	}else{
		scrolldir=1;
	}
	thescroll=$(window).scrollTop();
	wh=parseInt($("body").css("height").replace("px", ""))

	if (scrolldir>0) {
		$('.logo').addClass("is-scrolled");
		$('.is2').addClass("is-scrolled2");
		$('.is3').addClass("is-scrolled3");
		$('.is4').addClass("is-scrolled4");
		$('.is5').addClass("is-scrolled5");
		$('.viur').addClass("is-scrolled6");
		$('.sphinxsidebarwrapper').addClass("is-scrolled7");

	} else {
		$('.logo').removeClass("is-scrolled");
		$('.is2').removeClass("is-scrolled2");
		$('.is3').removeClass("is-scrolled3");
		$('.is4').removeClass("is-scrolled4");
		$('.is5').removeClass("is-scrolled5");
		$('.viur').removeClass("is-scrolled6");
		$('.sphinxsidebarwrapper').removeClass("is-scrolled7");

	}

}

$(window).scroll(scrolleventhandler);
$(window).resize(scrolleventhandler);