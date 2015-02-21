NB.Nav = (function(){
	var _google, _zoomin, _zoomout, _map, init, buttonsInit;

	init = function(google){
		_google = google;
		_map = NB.Map.getInstance();
		
		if(_zoomout) {
			_google.maps.event.addDomListener(_zoomout, 'click', function() {
				var currentZoomLevel = _map.getZoom();
				
				if(currentZoomLevel !== 0) {
					_map.setZoom(currentZoomLevel - 1);
				}
			});
		}
		
		if(_zoomin) {
			_google.maps.event.addDomListener(_zoomin, 'click', function() {
				var currentZoomLevel = _map.getZoom();
				
				if(currentZoomLevel !== 21) {
					_map.setZoom(currentZoomLevel + 1);
				}
			});
		}
		
	};

	buttonsInit = function(zoomin, zoomout) {
		_zoomin = zoomin;
		_zoomout = zoomout;
	};

	return {
		init: init,
		buttonsInit : buttonsInit
	};
})();

Template.nbMapnav.rendered = function() {
	NB.Nav.buttonsInit(this.find('.zoom-in'), this.find('.zoom-out'));
};

Template.nbSearchBox.events({
	'click .mobileNavToggler': function(event, template) {
		var nav = template.find('.navHeader');
		$(nav).toggle();
	},
	'click .usagechange' : function(event, template) {
		var currentUsage = Session.get("nbUsage");
		if(currentUsage=="bike") {
			currentUsage = "foot";
		} else {
			currentUsage = "bike";
		}
		GAnalytics.event("usage", "change", "nav");
		Session.set("nbUsage", currentUsage);
	},
	'click .buttonClosest' : function(e, t) {
		NProgress.start();
		GAnalytics.event("closest", "click", "nav");
		NB.Geolocalization.getCurrentPosition(function(position){
			var _map = NB.Map.getInstance();
			var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			
			NB.Directions.clear();
			if(NB.Markers.getCurrentPosition()) {
				NB.Markers.getCurrentPosition().setMap(null); //remove the old one
			}

			NB.Markers.setCurrentPosition(new google.maps.Marker({
				position: pos,
				map: _map,
				animation: google.maps.Animation.DROP,
				icon: '/images/icon_current.png',
				title: 'Your localization!'
		  	}));
		  	
			var dest = NB.Markers.findClosestMarker();
			if(dest) {
				NB.Directions.calculateRoute(NB.Markers.getCurrentPosition().position, dest.position);
			} else {
				//throw an error that there is no bikes/stations
				Alerts.error(l18n.t("errors.usage_no_"+Session.get("nbUsage")));
			}

			_map.setCenter(pos);
			_map.setZoom(17);
			NProgress.done();
		});	
	},
	'click .buttonSearch' : function(e, t) {
		var input = t.find(".search");
		if(input.value!=="") {
			GAnalytics.event("search", "click", "nav");
			NProgress.start();

			NB.Directions.clear();
			if(NB.Markers.getCurrentPosition()) {
				NB.Markers.getCurrentPosition().setMap(null); //remove the old one
			}

			NB.GeoCoder.getGeocode(document.querySelector(".search").value, function(){
				var dest = NB.Markers.findClosestMarker();
				if(!dest) {
					Alerts.error(l18n.t("errors.usage_no_"+Session.get("nbUsage")));
				} else {
					NB.Directions.calculateRoute(NB.Markers.getCurrentPosition().position, dest.position);
				}
			});
			NProgress.done();
		} else {
		    $(input).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		    	$(this).removeClass('animated shake');
		    })

		}
	},
	'change .search' : function(e, t) {
		var searchInput = t.find(".search"); 
		GAnalytics.event("search", "change", "nav");
		setTimeout(function(){
			var autocomplete = NB.Autocomplete.getInstance();
			NProgress.start();

			var input = searchInput.value;
			
			NB.Directions.clear();
			if(NB.Markers.getCurrentPosition()) {
				NB.Markers.getCurrentPosition().setMap(null); //remove the old one
			}

			if(input!=="") {
				NB.GeoCoder.getGeocode(input, function(){
					var dest = NB.Markers.findClosestMarker();
					if(!dest) {
						Alerts.error(l18n.t("errors.usage_no_"+Session.get("nbUsage")));
					} else {
						NB.Directions.calculateRoute(NB.Markers.getCurrentPosition().position, dest.position);
					}
				});
			}

			NProgress.done();
		}, 400); //getPlace wait
	}
});