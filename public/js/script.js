function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

function date_time() {
	var current_datetime = new Date();
	let hours = zero_first_format(current_datetime.getHours());
   	let minutes = zero_first_format(current_datetime.getMinutes());

   	document.querySelector('.time').innerHTML = hours + ":" + minutes;
   	setTimeout("date_time()", 1000);
}

function openDelivery() {
	document.getElementById("delivery-popup").classList.toggle("show");
}

function openRestaurant() {
	document.getElementById("restaurants-popup").classList.toggle("show");
}

function openSort() {
	document.getElementById("sort-popup").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.restaurant-toggle') && !event.target.matches('.arrow')) {

    var dropdowns = document.getElementsByClassName("restaurants-list-popup");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

jQuery(function($){
	$(document).mouseup(function (e){
		var block = $(".delivery-list-popup");
		var toggle = $(".phones-toggle");

		if (!block.is(e.target) && !toggle.is(e.target) && !toggle.children().is(e.target) && block.has(e.target).length === 0) {
			document.getElementById("delivery-popup").classList.remove("show");
		}
	});
});

function BlockScroll() {
	let scrollX = window.scrollX;
	let scrollY = window.scrollY;
	window.onscroll = function () { 
		window.scrollTo(scrollX, scrollY); 
	};
}

function ResumeScroll() {
	window.onscroll = function () { 
		return false;
	}
}

var flag = false;

$(document).ready(function($) {
	$('.callme').click(function() {
		$('.popup').fadeIn();
		return false;
	});

	$('.like-toggle').click(function() {
		$('#cart').fadeOut();
		$('.cart-container').slideUp(300);
		$('.like-popup').fadeIn();
		BlockScroll();
		return false;
	});

	$('.cart-toggle').click(function() {
		if(flag) {
			$('#cart').fadeOut();
			$('.cart-container').slideUp(300);
			flag = false;
			ResumeScroll()
		} else {
			$('#cart').fadeIn();
			$('.cart-container').slideDown(300);
			flag = true;
			BlockScroll()
		}
		return false;
	});

	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup').fadeOut();
			$('.ok-popup').fadeOut();
			$('.like-popup').fadeOut();
			$('#cart').fadeOut();
			$('.cart-container').slideUp(300);
			ResumeScroll()
		}
	});

	$('.popup-close').click(function() {
		$(this).parents('.popup').fadeOut();
		$(this).parents('.ok-popup').fadeOut();
		$(this).parents('.like-popup').fadeOut();
		ResumeScroll()
		return false;
	});	
	
	$('.popup').click(function(e) {
		if ($(e.target).closest('.popup-container').length == 0) {
			$(this).fadeOut();					
		}
	});

	$('html').click(function(e) {
		if ($(e.target).closest('.cart-container').length == 0) {
			$('#cart').fadeOut();
			$('.cart-container').slideUp(300);
			ResumeScroll()			
		}
	});

	$('.ok-popup').click(function(e) {
		if ($(e.target).closest('.ok-popup-container').length == 0) {
			$(this).fadeOut();					
		}
	});

	$('.like-popup').click(function(e) {
		if ($(e.target).closest('.like-popup-container').length == 0) {
			$(this).fadeOut();
			ResumeScroll()			
		}
	});
});

