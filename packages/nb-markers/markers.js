NB.Markers = (function(){
	var _google,
		_usage,
		_map,
		_currentPosition,
		_markersReady = new ReactiveVar(false),
		_mapReady = new ReactiveVar(false),
		_markers = [],
		_stations = [];

	var rad = function(x) {
		return x*Math.PI/180;
	}
	
	var createMarkers = function() {
		var count = null;
		Tracker.autorun(function(){
			if(_mapReady.get()) {
				if(count !== NB.Stations.find({}).count()) {	
					removeAllStations();
					_.each(NB.Stations.find({}).fetch(), function(station){
						_markers.push(createMarker(station));
					});
					_markersReady.set(true);
					count = NB.Stations.find({}).count();
				}
			}
		});
	}

	Tracker.autorun(function(){
		if(_markersReady.get() && _mapReady.get()) {
			renderStations();
		}
	});

	var amountDisplayed = function(bikes, stands) {
		if(_usage==="bike") {
			return stands;
		} else {
			return bikes;
		}
	}

	var changeIcon = function(marker) {
		var amount, icon, labelClass, labelAnchor;

		amount = amountDisplayed(marker.bikes, marker.stands);

		if(parseInt(amount,10)===0) {
			icon = "/images/icon_red.png"; 
		} else {
			icon = "/images/icon.png"
		}
		
		if(parseInt(amount,10)/10 < 1) {
			labelAnchor = new google.maps.Point(5, 26);
            labelClass =  "markerLabelSingle"; // the CSS class for the label
		} else {
			labelAnchor = new google.maps.Point(8, 26);
            labelClass = "markerLabelDouble"; // the CSS class for the label
		}

		if(marker.labelContent !== amount) {
			marker.set('labelContent', amount);
			marker.set('labelAnchor', labelAnchor);
			marker.set('labelClass', labelClass);
		}

		if(marker.icon !== icon) {
			marker.set('icon', icon);
		}
		return marker;
	}

	var changeIcons = function() {		
		for(var i=0, len = _markers.length; i<len; i++) {
			_markers[i] = changeIcon(_markers[i]);
		}
	}

	var init = function(google) {
		_google = google;
		_map = NB.Map.getInstance();
		_usage = Session.get("nbUsage"); 
		
		_mapReady.set(true);

		_google.maps.event.addListener(_map, 'idle', renderStations);

		
		if(_markersReady.get()) {
			
		}
	}

	var clearMarkers = function() {
		for(var i=0, len = _markers.length; i<len; i++) {
			_markers[i].setMap(null);
		}
	}

	var updateMarker = function(i, station) {
		_markers[i].set('bikes', station.bikes);
		_markers[i].set('stands', station.bike_racks);

		changeIcon(_markers[i]);
	}

	var createMarker = function(station) {
		var map = _map,
			amount = amountDisplayed(station.bikes, station.bike_racks),
			labelAnchor,
			labelClass;

		//figure out weather amount is single digit or double
		if(parseInt(amount,10)/10 < 1) {
			labelAnchor = new google.maps.Point(5, 26);
            labelClass =  "markerLabelSingle"; // the CSS class for the label
		} else {
			labelAnchor = new google.maps.Point(8, 26);
            labelClass = "markerLabelDouble"; // the CSS class for the label
		}

		var MarkerWithLabel = NB.Markerlabel.MarkerWithLabel();

		var marker = new MarkerWithLabel({
			position: new _google.maps.LatLng(station.lat, station.lng),
			map: _map,
			title: station.name,
			bikes: station.bikes,
			stands: station.bike_racks,
			number: station.number,
			name: station.name,
			uid: station.uid,
			labelContent: amount,
            labelAnchor: labelAnchor,
            labelClass: labelClass, // the CSS class for the label
            labelInBackground: false
	  	});

	  	marker = changeIcon(marker);

	  	_google.maps.event.addListener(marker, 'click', function() {
			var info = NB.InfoWindow.getInstance();
			//add info about last sync

		    info.setContent("<strong>"+i18n.t("station.station")+" "+marker.number+"</strong><p> "+marker.name+" </p><p>"+i18n.t("station.bikes")+" "+marker.bikes+"<br>"+i18n.t("station.stands")+" "+marker.stands+"<br>");
		    info.open(_map, marker);
		});
		

		_google.maps.event.addListener(marker, 'dblclick', function() {
	        _map.setCenter(marker.position);
		});

	  	return marker;
	}

	var stationChanged = function(station) {
		var markerTitles = _markers.map(function(e) { return e.title; });
		if( markerTitles ) {
			var marker_pos = markerTitles.indexOf(station.name);
			if(marker_pos>-1) {
				updateMarker(marker_pos, station);
			} else {
				_markers.push(createMarker(station));
			}
		}
	};

	var renderStations = function() {
		_map = NB.Map.getInstance();
		var bounds = _map.getBounds();

		for(var i=0, len = _markers.length; i<len; i++) {
			var pos = _markers[i].getPosition();
			if(pos && bounds && bounds.contains(_markers[i].getPosition())) {
				if(_markers[i].map != _map) _markers[i].setMap(_map);
			} else {
				 _markers[i].setMap(null);
			}
		}
	}

	var removeStation = function(station) {
		var markerTitles = _markers.map(function(e) { return e.title; });
		if( markerTitles ) {
			var marker_pos = markerTitles.indexOf(station.name);
			if(marker_pos>-1) {
				_markers[marker_pos].setMap(null);
				_markers.splice(marker_pos,1);
			}
		}
	}

	var findClosestMarker = function(){
	    var lat = _currentPosition.position.lat();
	    var lng = _currentPosition.position.lng();
	    var R = 6371; // radius of earth in km
	    var distances = [];
	    var closest = -1;
	    var stations = [];

	    var num = null;
	    
	    if(_usage==="bike") {
	    	num = 'stands';
	    } else {
	    	num = 'bikes';
	    }


	    for(var i=0,len=_markers.length; i<len; i++) {
	    	if(parseInt(_markers[i][num],10)>0) {
	    		stations.push(_markers[i]);
	    	}
	    }

	    for(var i=0;i<stations.length; i++ ) {
	    	if(stations[i].position) {
		        var mlat = stations[i].position.lat();
		        var mlng = stations[i].position.lng();
		        var dLat  = rad(mlat - lat);
		        var dLong = rad(mlng - lng);
		        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		        var d = R * c;
		        distances[i] = d;
		        if ( closest == -1 || d < distances[closest] ) {
		            closest = i;
		        }
	    	}
	    }

	    if(stations[closest]) return stations[closest];

	    return null;
	}
	var removeAllStations = function() {
		for(var i=0, len=_markers.length; i<len; i++) {
			_markers[i].setMap(null);
		}
		_markers=[];
	};

	Tracker.autorun(function(){
		_usage = Session.get("nbUsage");

		changeIcons();
	})

	return {
		init: init,
		markers: function(){
			return _markers
		},
		stations: _stations,
		createMarkers: 	createMarkers,
		renderStations: renderStations,
		stationChanged: stationChanged,
		removeStation: removeStation,
		removeAllStations: removeAllStations,
		findClosestMarker: findClosestMarker,
		getCurrentPosition: function(){
			return _currentPosition
		},
		setCurrentPosition: function(marker) {
			_currentPosition = marker;
		}
	}
})();