NB.Cities = (function(){

	var _cities = {};

	var registerRoute = function(city, route){
		Router.map(function(){
		    this.route(city, function(){
		    	GAnalytics.pageview('/'+route);
		    	this.render();
		    },{
		        path: '/'+route,
		        layoutTemplate: 'nbLayout',
		        template: 'nbHome',
		        yieldTemplates: {
		          'nbHeader': {to: 'header'},
		          'nbFooter': {to: 'footer'}
		        },
		        onBeforeAction: function() {		        	
		            ReactiveStore.set("nbCity", city);
		            this.next();
		        },
		        onAfterAction: function() {
		        	SEO.set({
				        title: l18n.t("seo."+city+".title"),
				        meta: {
				          'description': l18n.t("seo."+city+".desc")
				        }
				    });
		        }
		    });
		}); 
	}

	var register = function(city, options){
		_cities[city] = options;

		if(options.route && Meteor.isClient) registerRoute(city, options.route);
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

