NB.Directions = (function(){
	
	var directionsService = null,
		directionsDisplay = null,
		_google, _map;

	var init = function(selector, google){
		_google = google;
		_map = NB.Map.getInstance();

		var infoWindow = new _google.maps.InfoWindow();

		directionsService = new _google.maps.DirectionsService();
		directionsDisplay = new _google.maps.DirectionsRenderer({suppressMarkers: true, infoWindow: infoWindow});
		directionsDisplay.setPanel(document.querySelector(selector)); //directions-panel
		directionsDisplay.setMap(_map);
	};

	var calculateRoute = function(start, end) {

		var request = {
		    origin: start,
		    destination: end,
		    travelMode: _google.maps.TravelMode.WALKING
		};

		directionsService.route(request, function(response, status) {
		    if (status == _google.maps.DirectionsStatus.OK) {
		    	_response = response;
		    	directionsDisplay.setDirections(response);
		    	var textDirections = document.querySelector('.directions');
		    	textDirections.style.display = 'block';
		    } else {
		    	Alerts.error(i18n.t("errors.routefail"));
		    }
		});

		directionsDisplay.setMap(_map);
	}

	return {
		init: init,
		calculateRoute: calculateRoute,
		getInstance: function() {
			return directionsDisplay;
		},
		clear: function() {
			directionsDisplay.setMap(null);
		}
	}
})();

Template.nbDirections.events({
	'click .close' : function(e, t) {
		var textDirections = t.find(".directions");
	    	textDirections.style.display = 'none';
	}
});