(function () {
	"use strict";

	var apiUrl = "https://nextbike.net/maps/nextbike-official.xml?city=";

	if ('undefined' === typeof NB.api) {
		NB.api = {};
	}

	_.extend(NB.api, {
		
		request : function(method, city) {
			var response;
		    try {
		      	response = HTTP.call(method, apiUrl+city);
		    } catch (e) {
		      response = e.response || e;
		    } finally {
		      return response;
		    }  
		}

	});  // end _.extend(NB.api ...)
}());
