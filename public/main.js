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

		$('.card-container').isotope({
			itemSelector: '.quoteBlock',
			columnWidth: '.quoteBlock',
		});

		var quoteNum = window.location.hash.substr(1); 

		$("#" + quoteNum).addClass("activeQuote");

		$(".quoteBody").each(function(){
			if($(this).text().length < 25){
	            $(this).parent().parent().addClass("col-md-2 ");
	        } else if ($(this).text().length < 75){
	        	$(this).parent().parent().addClass("col-md-2 ");
	        } else if ($(this).text().length < 150){
	        	$(this).parent().parent().addClass("col-md-4 ");
	        } else {
	        	$(this).parent().parent().addClass("col-md-6 ")
	        }
	        var filterValue = $('.form-control').val();
			$('.card-container').isotope({ filter: filterValue });
		});
		$(".card-grid").flip({
			trigger:"click"
		});

	});

	$('.form-control').change(function() {
	  	var filterValue = $(this).val();
		$('.card-container').isotope({ filter: filterValue });
	});
	$(".nav a").on("click", function(){
	   $(".nav").find(".active").removeClass("active");
	   $(this).parent().addClass("active");
	});
	



});

// ZeroClipboard.config( { moviePath: "ZeroClipboard.swf"} );

// var client = new ZeroClipboard( $(".btn-share") );

// $(document).on("click", client, function(client) {
//   client.on( 'datarequested', function(client) {
//     var text = "test";
//     client.setText(text);
//   });
//   // callback triggered on successful copying
//   client.on( 'complete', function(client, args) {
//     console.log("Text copied to clipboard: \n" + args.text );
//   });
// });
// // In case of error - such as Flash not being available
// client.on( 'wrongflash noflash', function() {
//   ZeroClipboard.destroy();
// } );

function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	var myID = 1;
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
				elem["myID"] = myID;
			}
			
		});
		myID++;
		formatted_json.unshift(elem);
	});
	return formatted_json;
};
