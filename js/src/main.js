


// onload
$(document).ready(function() {

	// cookie names
	var cookie_one = 'redwood-jNIbNC7EnjGOn3lI';
	var cookie_two = 'redwood-ntyzvEW4A0F5cqYn';


	// move the slideshow html to just before the closing body tag
	$(document.body).append( $('.ph-slideshow-container').detach() );


	// function to go to previous slide
	var go_to_prev_slide = function() {
			
		// select previous slide
		var previous_slide = $('.ph-slideshow .ph-slide.visible').prev( '.ph-slide' );

		// if there is no previous slide, go to the last
		if ( previous_slide.length == 0 ) {
			previous_slide = $('.ph-slideshow .ph-slide:last' );
		}
		
		// hide visible
		$( '.ph-slideshow .ph-slide.visible' ).removeClass( 'visible' );

		// show previous
		previous_slide.addClass( 'visible' );

	}


	// function to go to the next slide
	var go_to_next_slide = function() {

		// select previous slide
		var next_slide = $('.ph-slideshow .ph-slide.visible').next( '.ph-slide' );

		// if there is no previous slide, go to the last
		if ( next_slide.length == 0 ) {
			next_slide = $('.ph-slideshow .ph-slide:first' );
		}
		
		// hide visible
		$( '.ph-slideshow .ph-slide.visible' ).removeClass( 'visible' );

		// show next
		next_slide.addClass( 'visible' );

	};


	// function to close the slideshow
	var close_slideshow = function() {

		// hide the slideshow
		$( '.ph-slideshow-container' ).hide();

		// if the lightbox hasn't been shown once already
		if ( cookies.get( cookie_one ) == null ) {

			// set a cookie saying it has been shown once
			cookies.set( cookie_one, 'true' );

		} else {

			// it's been shown once already, so set a second cookie when it's been shown twice
			cookies.set( cookie_two, 'true' );
			
		}

	}


	// keypress handler, feed it a key and a callback function
	var keypress = function( key, callback ){

		// track keyups on the body
		$( 'body' ).on( 'keyup', function(e){

			// if it matches the specified keycode
			if ( e.keyCode == key ) {

				// run the callback
				callback();

			}

		});

	}


	// a function to open the slideshow.
	var open_slideshow = function() {

		// show the slideshow
		$( '.ph-slideshow-container' ).show();

		// only if the slideshow is visible after the cookie check, should we bind these actions
		if ( $( '.ph-slideshow-container').is(':visible') ) {


			// previous slide arrow
			$( '.ph-slideshow .prev' ).on( 'click', go_to_prev_slide );

			// keypress previous slide
			keypress( 37, go_to_prev_slide );


			// next slide arrow
			$( '.ph-slideshow .next' ).on( 'click', go_to_next_slide );

			// keypress next slide
			keypress( 39, go_to_next_slide );


			// handle swipe events in both directions
			$( '.ph-slideshow' ).swipe( {
				swipe:function( event, direction, distance, duration, fingerCount, fingerData ) {
					if ( direction == 'left' ) {
						go_to_next_slide();
					}
					if ( direction == 'right' ) {
						go_to_prev_slide();
					}
				}
			});


			// close slideshow by click on container
			$( '.ph-slideshow-container' ).on( 'click', function( event ){

				// make sure that the click event target was the container and not the contents.
				if ( $(event.target).is('.ph-slideshow-container') ) {

					// close the slideshow
					close_slideshow();

				}

			});

			// when the user clicks an x button
			$( '.ph-slideshow-container .close' ).on( 'click', close_slideshow );

			// when the user presses the escape key
			keypress( 27, close_slideshow );

		}

	}


	// if the slideshow hasn't been shown and hidden twice already
	if ( cookies.get( cookie_two ) == null ) {

		// open the slideshow on load
		open_slideshow();

	}


	// add alternate way to re-show the popup if the user clicks a link with a certain id.
	$( '#newwebsitemodal2021' ).on( 'click', function(e){

		// prevent default link behavior
		e.preventDefault();

		// open the slideshow
		open_slideshow();

	});

});

