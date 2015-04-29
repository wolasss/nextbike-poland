if(Meteor.isClient) {
	Template.nbHome.rendered = function() {
		var initialized = false;

		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			var lang = ReactiveStore.get("nbLang") || "pl";
			
			if(city && lang && !initialized) {
				NB.Cities.load(lang, city);
				initialized = true;
			}
		});
	};

	Session.set("nbUsage", "foot");
}