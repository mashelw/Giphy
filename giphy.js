var topics = ["The Office","Game of Thrones","Prison Break","The Simpsons","SNL","Gilmore Girls","One Tree Hill","Grey's Anatomy","Parks of Rec","Real Housewives"];

function renderButtons() {
	var tempDiv = $("<div>")
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button class='showButton'>");
		newButton.attr("data-name",topics[i]);
		newButton.text(topics[i]);
		tempDiv.append(newButton);
	}
	$('#buttonsDiv').html(tempDiv);

};
renderButtons();

$("#submit").on('click',function(e) {
	e.preventDefault();
	topics.push($('#entry').val());
	renderButtons();
})

$(document).on('click',".showButton",function() {
	var show = $(this).attr("data-name")
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var result = response.data;
		for (var i = 0; i < result.length; i++) {
			var newDiv = $("<div class='block'>");
			
			var rating = $("<p>").text("Rating: " + result[i].rating);

			newDiv.append(rating);

			var newGIF = $("<img class='gif'>");
			newGIF.attr("src", result[i].images.fixed_height_still.url);
			newGIF.attr("data-animate", result[i].images.fixed_height.url);
			newGIF.attr("data-still", result[i].images.fixed_height_still.url);
			newDiv.append(newGIF);
			$('#display').prepend(newDiv);
		}

	});
});

$(document).on('click', '.gif', function() {
	if ($(this).attr("src") === $(this).attr('data-still')) {
		$(this).attr("src", $(this).attr("data-animate"));
	} else {
		$(this).attr("src", $(this).attr("data-still"));
	}
})


