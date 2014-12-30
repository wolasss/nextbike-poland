NB.Geolocalization = (function(){
	var _position = null;
	var _callback = null;

	var readPosition = function(position) {
		if(position) {
			_position = position;
			if(_callback) _callback(position);
		}
	};

	var showError = function(error)
	{
	  switch(error.code) 
	    {
	    case error.PERMISSION_DENIED:
	    	Alerts.error(i18n.t("errors.geodenied"));
			break;
	    case error.POSITION_UNAVAILABLE:
	    	Alerts.error(i18n.t("errors.locnotfound"));
			break;
	    case error.TIMEOUT:
	   		Alerts.error(i18n.t("errors.timeout"));
			break;
	    case error.UNKNOWN_ERROR:
			Alerts.error(i18n.t("errors.unknown"));
			break;
	    }
	    NProgress.done();
	}

	var getCurrentPosition = function(callback) {
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