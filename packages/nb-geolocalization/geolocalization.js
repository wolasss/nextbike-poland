NB.Geolocalization = (function(){

	var _position = null, _callback = null, readPosition, getCurrentPosition;

	readPosition = function(position) {
		if(position) {
			_position = position;
			if(_callback) _callback(position);
		}
	};

	showError = function(error)
	{
		switch(error.code) {
			case error.PERMISSION_DENIED:
				Alerts.error(TAPi18n.__("errors.geodenied"));
				break;
			case error.POSITION_UNAVAILABLE:
				Alerts.error(TAPi18n.__("errors.locnotfound"));
				break;
			case error.TIMEOUT:
				Alerts.error(TAPi18n.__("errors.timeout"));
				break;
			case error.UNKNOWN_ERROR:
				Alerts.error(TAPi18n.__("errors.unknown"));
				break;
		}
		
		NProgress.done();
	};

	getCurrentPosition = function(callback) {
		_callback = callback;
		navigator.geolocation.getCurrentPosition(readPosition, showError);
	};

	return {
		getCurrentPosition: getCurrentPosition,
		position: (function() {
			return _position;
		})()
	};
})();