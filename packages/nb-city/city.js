NB.Cities = (function(){

	var _cities = {};

	var register = function(city, options){
		_cities[city] = options;
	}

	var get = function(city) {
		return _cities[city];
	}

	var getAll = function() {
		var cities = [];

		_.each(Object.keys(_cities), function(city) {
			cities.push(_cities[city]);
		})

		return cities;
	}

	var load = function(lang, city) {
		NB.Map.init(lang, _cities[city].mapOptions);
	}

	return {
		get: get,
		getAll: getAll,
		register: register,
		load: load
	}

})();

