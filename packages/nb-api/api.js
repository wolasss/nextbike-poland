(function () {
	"use strict";

	if ('undefined' === typeof NB.api) {
		NB.api = {};
	}

	NB.api.url = "https://nextbike.net/maps/nextbike-official.xml?city=";

	_.extend(NB.api, {
		
		request : function(method, city) {
			var response;
			try {
				response = HTTP.call(method, NB.api.url+city);
			} catch (e) {
				response = e.response || e;
			} finally {
				return response;
			}
		}

	});  // end _.extend(NB.api ...)
}());
