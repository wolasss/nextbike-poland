NB.Autocomplete = (function(){
	
	var _google, autocomplete, init, getInstance;

	init = function(google, selector, config) {
		_google = google;

		var input = document.querySelector(selector);

		autocomplete = new _google.maps.places.Autocomplete(input, {
			location: new _google.maps.LatLng(config.center.x, config.center.y),
			radius: config.radius,
			componentRestrictions: {country: config.country}
		});
	};

	getInstance = function() {
		return autocomplete;
	};

	return {
		init: init,
		getInstance: getInstance
	};
	
})();
