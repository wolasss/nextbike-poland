NB.InfoWindow = (function(){
	var infoWindow = null, _google;

	var init = function(google){
		_google = google;
		infoWindow = new _google.maps.InfoWindow();
	};

	return {
		init: init,
		getInstance: function() {
			return infoWindow;
		}
	}
})();