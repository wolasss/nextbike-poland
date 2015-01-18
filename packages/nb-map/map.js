NB.Map = (function(){
	
	var _map, _config, _initialized = false;

	var _config = {
          center: {
          	x: 48.8588589,
          	y: 2.3470599
          },
          zoom: 14,
          maxZoom: 20,
          minZoom: 11,
          disableDefaultUI: true,
          id: "map"
    };

	var init = function() {
		_google = google;
		
		var mapOptions = {
	          center: new _google.maps.LatLng(_config.center.x, _config.center.y),
	          zoom: _config.zoom,
	          maxZoom: _config.maxZoom,
	          minZoom: _config.minZoom,
	          disableDefaultUI: _config.disableDefaultUI
	    };
	    
	    if(!_initialized) {
	    	_map = new _google.maps.Map(document.getElementById(_config.id), mapOptions);

	    	NB.Markerlabel.init(_google);
			NB.GeoCoder.init(_google);
			NB.Autocomplete.init(_google, ".search", _config);
			NB.Directions.init(".directions", _google);
			NB.InfoWindow.init(_google);
			NB.Markers.init(_google);
			NB.Nav.init(_google);
	    } else {
	    	_map.set(mapOptions);
	    	_map.setCenter(mapOptions.center);
	    }

		if(!_initialized) _initialized = true;
	};

	var load = function(lang, options) {
		$.extend(true, _config, options);

		if(!_initialized) {
			var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = 'https://maps.googleapis.com/maps/api/js?v=&v=3.15&libraries=places&sensor=false&' +
		        'callback=NB.Map.initialize';
		    if (lang) {
		        script.src += '&language=' + lang;
		    }

		    script.id = "google-maps-script";
		    document.body.appendChild(script);
		} else {
			init();
		}
	};

	return {
		init: load,
		initialize: init,
		getInstance: function() {
			return _map;
		}
	}
})();