$(document).ready(function(){
    url = "https://spreadsheets.google.com/feeds/list/1BhshwcHXL7pQ_VJLFf3Ue3e85BW5Hhi9qRAgC4vvgVw/1/public/values?alt=json"

	$.getJSON(url, function(json){
		var data = clean_google_sheet_json(json);

		var theTemplateScript = $("#quote-template").html();

		// Compile the template
		var theTemplate = Handlebars.compile(theTemplateScript);

		// Pass our data to the template
		var theCompiledHtml = theTemplate({
			"shireQuotes":data
		});

 		
		// Add the compiled html to the page
		$('.content-placeholder').html(theCompiledHtml);
		var data = clean_google_sheet_json(json);

		$('.quoteContainer').isotope({
			itemSelector: '.quoteBlock',
			columnWidth: '.quoteBlock',
		});

		var quoteNum = window.location.hash.substr(1); 

		$("#" + quoteNum).addClass("activeQuote");

		$(".quoteBody").each(function(){
			if($(this).text().length < 75){
	            $(this).parent().parent().addClass("col-md-2 ");
	        } else if ($(this).text().length < 150){
	        	$(this).parent().parent().addClass("col-md-4 ");
	        } else {
	        	$(this).parent().parent().addClass("col-md-6 ")
	        }
	        var filterValue = $('.form-control').val();
			$('.quoteContainer').isotope({ filter: filterValue });
		});

		$('.form-control').change(function() {
		  	var filterValue = $(this).val();
			$('.quoteContainer').isotope({ filter: filterValue });
		});
		$('html,body').animate({
			scrollTop: $("#" + quoteNum).offset().top - 100
		},500);


	});

	$('.form-control').change(function() {
	  	var filterValue = $(this).val();
		$('.quoteContainer').isotope({ filter: filterValue });
	});
	$(".nav a").on("click", function(){
	   $(".nav").find(".active").removeClass("active");
	   $(this).parent().addClass("active");
	});



});


var client = new ZeroClipboard( $("#target-to-copy") );

client.on( "ready", function( readyEvent ) {
  // alert( "ZeroClipboard SWF is ready!" );

  client.on( "aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"] );
  } );
} );

function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
};
