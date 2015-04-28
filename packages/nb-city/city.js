NB.Cities = (function(){

	var _cities = {}, registerRoute, register, get, getAll, load;

	registerRoute = function(city, route){
		Router.map(function(){
			this.route(city, function(){
				GAnalytics.pageview(route);
				this.render();
			},{
				path: route,
				layoutTemplate: 'nbLayout',
				template: 'nbHome',
				yieldTemplates: {
					'nbHeader': {to: 'header'},
					'nbFooter': {to: 'footer'}
				},
				onBeforeAction: function() {
					ReactiveStore.set("nbCity", city);

					SEO.set({
						title: TAPi18n.__("seo."+city+".title"),
						meta: {
							'description': TAPi18n.__("seo."+city+".desc")
						}
					});

					this.next();
				}
			});
		});
	};

	register = function(city, options){
		_cities[city] = options;

		if(options.route && Meteor.isClient) registerRoute(city, options.route);
	};

	get = function(city) {
		return _cities[city];
	};

	getAll = function() {
		var cities = [];

		_.each(Object.keys(_cities), function(city) {
			cities.push(_cities[city]);
		});

		return cities;
	};

	load = function(lang, city) {
		NB.Map.init(lang, _cities[city].mapOptions);
	};

	return {
		get: get,
		getAll: getAll,
		register: register,
		load: load
	};

})();

