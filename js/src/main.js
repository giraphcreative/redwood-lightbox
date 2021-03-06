


// onload
$(document).ready(function() {

	// cookie names
	var cookie_one = 'redwood-JWPQBZq6BDHdz9q2';
	var cookie_two = 'redwood-UQB8kD2ddMCnbqMX';


	// move the slideshow html to just before the closing body tag
	$(document.body).append( $('.ph-slideshow-container').detach() );



	// --------------------------------
	// functions
	// --------------------------------

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


	// function to return to the first slide
	var go_to_start = function() {

		// hide visible slide.
		$( '.ph-slideshow .ph-slide.visible' ).removeClass( 'visible' );
		$( '.ph-slideshow .ph-slide:first' ).addClass( 'visible' );

	}


	// function to close the slideshow
	var close_slideshow = function() {

		// hide the slideshow
		$( '.ph-slideshow-container' ).hide();

		// if the lightbox hasn't been shown once already
		if ( Cookies.get( cookie_one ) == null ) {

			// set a cookie saying it has been shown once
			Cookies.set( cookie_one, 'true', { expires: 30 });

		} else {

			// it's been shown once already, so set a second cookie when it's been shown twice
			Cookies.set( cookie_two, 'true', { expires: 30 });
			
		}

	}


	// function to open the slideshow.
	var open_slideshow = function() {

		// show the slideshow
		$( '.ph-slideshow-container' ).show();

	}


	// --------------------------------
	// set up bindings
	// --------------------------------

	// if the slideshow code exists in the page
	if ( $( '.ph-slideshow-container' ).length > 0 ) {

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


	// ---------------------------------------------------
	// trigger the slideshow initially and on link click
	// ---------------------------------------------------

	// a variable that checks whether the string 'fuzeurl' is in the current url
	var is_fuze = ( location.href.indexOf( 'fuzeurl' ) > 0 ? true : false );

	// if the slideshow hasn't been shown and hidden twice already
	if ( Cookies.get( cookie_two ) == null && !is_fuze ) {

		// open the slideshow on load
		open_slideshow();

	}


	// add alternate way to re-show the popup if the user clicks a link with a certain id.
	$( '.newwebsitemodal2021' ).on( 'click', function(e){

		// prevent default link behavior
		e.preventDefault();

		// go to first slide..
		go_to_start();

		// open the slideshow
		open_slideshow();

	});

});

