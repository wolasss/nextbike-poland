NB.GeoCoder = (function(){

	var _geocoder = null, _google;

	var init = function(google){
		_google = google;

		_geocoder = new _google.maps.Geocoder();
	};

	var getGeocode = function(place, callback) {
		var _map = NB.Map.getInstance();

		_geocoder.geocode( { 'address': place}, function(results, status) {
	      if (status == _google.maps.GeocoderStatus.OK) {
	        if(NB.Markers.getCurrentPosition()) NB.Markers.getCurrentPosition().setMap(null);
	        _map.setCenter(results[0].geometry.location);
	        _map.setZoom(17);
	        
	        NB.Markers.setCurrentPosition(new _google.maps.Marker({
	            map: _map,
	            animation: google.maps.Animation.DROP,
				icon: '/images/icon_current.png',
	            position: results[0].geometry.location
	        }));

	        if(callback) callback();
	      } else {
	      	Alerts.error(i18n.t("errors.geocodefail"));
	      }
	    });
	};

	return {
		init: init,
		getGeocode: getGeocode
	}
})(); 