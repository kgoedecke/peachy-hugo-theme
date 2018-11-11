import MicroModal from 'micromodal';

MicroModal.init();

require('./../scss/main.scss');


// NOTE: TO use Jquery, just call the modules you want
// var $ = require('jquery/src/core');
// require('jquery/src/core/init');
// require('jquery/src/manipulation');

// OR, use all of them
var $ = require('jquery/src/jquery');

// And write your code
// $('body').append('<p>Jquery is working</p>');
//
// You can also "require" any script from its location in the node modules folder. Webpack often knows what to look for, but you can add a script directly like this:
// var javascriptthingy = require('name/folder/file.js');

$(document).ready(function() {

	 $('.cancel-button').click(function(e) {
      	$('#modal-1').removeClass('is-open');
      	e.preventDefault();
      });
	 
	 $('a[href="/#sign-up"]').click(function(e) {
	 	MicroModal.show('modal-1');
	 	e.preventDefault();
	 });

	$('.modal__form--beta').submit(function(e) {
      let formHubspotFormId = $(this).data('hubspot-form-id');
      let hubspotPortalId = '5106615';
      let formPostUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${formHubspotFormId}`;

      let formData = $(this).serializeArray();
      let form = $(this);

      $.ajax(
	          {
	            url: formPostUrl,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify({
	              'context': {
	              'pageUri': window.location.href,
	              'pageName': document.title,
	              },
	              'submittedAt': Date.now(),
	              'fields': formData,
	            }),
	            success: (msg) => {
	            	$('.message-body').addClass('is-hidden');
	            	MicroModal.close();
	            },
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	            	var err = eval("(" + XMLHttpRequest.responseText + ")");
	            	let errorMsgs = err.errors.map(e => e.message.split('.')[2]).join("<br>");
	            	$('.message-body').removeClass('is-hidden');
				    $('.message-body').html(errorMsgs);
				  }
	          });
      e.preventDefault();
	    });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");



  });
});


