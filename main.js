if(Meteor.isClient) {
	Template.nbHome.rendered = function() {
		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			var lang = ReactiveStore.get("nbLang") || "pl";
			
			console.log(ReactiveStore.get("nbCity"), ReactiveStore.get("nbLang"));

			if(city && lang) {
				NB.Cities.load(lang, city);
			}
		});
	};

	Session.set("nbUsage", "foot");
}