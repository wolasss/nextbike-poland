NB.InfoWindow = (function(){
	var infoWindow = null, _google, init, getInstance;

	init = function(google){
		_google = google;
		infoWindow = new _google.maps.InfoWindow();
	};

	getInstance = function() {
		return infoWindow;
	};

	return {
		init: init,
		getInstance: getInstance
	};

})();