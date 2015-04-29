NB.Map = (function(){
	var _loading = false;
	var _map, _config, _initialized = false, init, load, getInstance;

	_config = {
		zoom: 14,
		maxZoom: 20,
		minZoom: 11,
		disableDefaultUI: true,
		id: "map"
    };

	init = function() {
		_config.center = new google.maps.LatLng(_config.center.x, _config.center.y);

		if(!_initialized) {
			_initialized = true;
			_loading = true;
			_map = new google.maps.Map(document.getElementById(_config.id), _config);

			NB.Markerlabel.init(google);
			NB.GeoCoder.init(google);
			NB.Autocomplete.init(google, ".search", _config);
			NB.Directions.init(".directions", google);
			NB.InfoWindow.init(google);
			NB.Markers.init(google);
			NB.Nav.init(google);

			_loading = false;
		} else {
			if(!_loading) {
				_map.set(_config);
				_map.setCenter(_config.center);
			}
		}
	};

	load = function(lang, options) {
		console.log("map load", _initialized);
		$.extend(true, _config, options);

		if(!_initialized) {
			console.log("adding script");
			var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=&v=3.20&libraries=places&sensor=false&callback=NB.Map.initialize';
			
			if (lang) {
				script.src += '&language=' + lang;
			}

			script.id = "google-maps-script";
			document.body.appendChild(script);
		} else {
			init();
		}
	};

	getInstance = function() {
		return _map;
	};

	return {
		init: load,
		initialize: init,
		getInstance: getInstance
	};
})();