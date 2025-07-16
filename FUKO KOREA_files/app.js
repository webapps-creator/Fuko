jQuery(document).ready(function($) {

	// nav
	$('#open_mobile_nav').click(function(event) {
		$('html').addClass('overflow_hidden');
		$('#mobile_nav').addClass('active').fadeIn(300);
	});
	$('#mobile_nav .btn_close').click(function(event) {
		$('html').removeClass('overflow_hidden');
		$('#mobile_nav').removeClass('active').fadeOut(300);
	});



	// Fix nav to top
	
	var fixmeTop = 100;

	$(window).scroll(function() {                  // assign scroll event listener
	    var currentScroll = $(window).scrollTop(); // get current position
	    if (currentScroll >= fixmeTop) {           // apply position: fixed if you
	        $('#header').addClass('fixed');
	    } else {                                   // apply position: static
	        $('#header').removeClass('fixed');
	    }
	});


	$('.scroll_to_top').click(function(event) {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	$('#hero_frontpage .scroll_down').click(function(event) {
		$("html, body").animate({ scrollTop:  $("#front_offer").offset().top }, "slow");
	});
	

/*
	$('some').click(function(event) {
		if($(this).hasClass('active'))
			return false;

		$(this).addClass('active');


		// 

		
	});
*/


	var marquee_speed = 50;
	if($(window).width() < 1200)
		marquee_speed = 30;
	
	$('.locations_scroller').marquee({
		duplicated : true,
		speed : marquee_speed,
		pauseOnHover : true,
		startVisible : true,
	});





	$('#faq_box .items .item h4').click(function(){
		var box = $(this).parents('.item');
		if(!box.hasClass('active')) {
			box.addClass('active');
			box.find('p').slideDown(400);
		} else {
			box.removeClass('active');
			box.find('p').slideUp(400);
		}
	});


	$('.link_download').click(function(event) {
		/* Act on the event */
	});


});

(function(){
	function id(v){ return document.getElementById(v); }
	function loadbar() {

		var ovrl = id("overlay"),
				prog = id("progress"),
				// stat = id("progstat"),
				img = document.images,
				c = 0,
				tot = img.length;
		if(tot == 0) return doneLoading();

		function imgLoaded(){
			c += 1;
			var perc = ((100/tot*c) << 0) +"%";
			prog.style.width = perc;
			// stat.innerHTML = "Loading "+ perc;
			if(c===tot) return doneLoading();
		}
		function doneLoading(){

			if(typeof WOW === 'function')
				new WOW().init();

				var long_load = true;

				if(jQuery(window).width() < 1200) {
					long_load = true;
				}

				if (long_load) {

					jQuery('#overlay .bird').addClass('first'); 

					if (typeof loadSlider === 'function') {
						loadSlider();
					}

					setTimeout(function(){
						jQuery('#overlay .bird').addClass('second');

						setTimeout(function(){
							jQuery('#overlay').fadeOut(1500);

						}, 1500);

						
						

					}, 1500);

					setTimeout(function(){
						jQuery('#header').addClass('loaded');
					}, 3100);

				}
				else {
					jQuery('#overlay').fadeOut(300);
					setTimeout(function(){
						jQuery('#header').addClass('loaded');
					}, 300);
				}


				

				





		}
		for(var i=0; i<tot; i++) {
			var tImg     = new Image();
			tImg.onload  = imgLoaded;
			tImg.onerror = imgLoaded;
			tImg.src     = img[i].src;
		}    
	}
	document.addEventListener('DOMContentLoaded', loadbar, false);
}());

function sendEmail() {
    if (document.querySelector("#your-name").value != "" && document.querySelector("#your-email").value != "" && document.querySelector("#your-subject").value != "" && document.querySelector("#your-text").value != "") {
        showModalConfirm("loading", "Sending!", "Your message is being sent. Please wait.");
        var formData = new FormData(document.getElementById('contactForm'));
        formData.append('emails_array', JSON.stringify(['enquiry@fukokorea.co.uk']));
        fetch('ajax/send_email_ajax.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showModalConfirm("success", "Great!", "Your message has been sent successfully.");
                // console.log('Email sent successfully:', data.result);
            } else {
                showModalConfirm("error", "Oops!", 'Error');
                // console.error('Error:', data.error);
            }
        })
        .catch(error => {
            showModalConfirm("error", "Oops!", 'Fetch request failed:');
            // console.error('Fetch request failed:', error);
        });
    } else {
        showModalConfirm("error", "Oops!", "Complete all fileds before submit the form.");
    }
}


function showModalConfirm(status, title, message) { // status=error,success,loading
    $('#modalConfirm').modal('hide');
    setTimeout(function() {
        if (status == "error") {
            document.querySelector("#modalConfirm h4").style.color = "red";
        } else if (status == "success") {
            document.querySelector("#modalConfirm h4").style.color = "lightgreen";
        } else if (status == "loading") {
            document.querySelector("#modalConfirm h4").style.color = "#aed2ff";
        }
        document.querySelector("#modalConfirm h4").innerHTML = title;
        document.querySelector("#modalConfirm p").innerHTML = message;
        $('#modalConfirm').modal('show');    
    }, 500);
}

function hideModalConfirm() {
    $('#modalConfirm').modal('hide');
}