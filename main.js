if(Meteor.isClient) {
	Template.nbHome.rendered = function() {

		var lastLang;

		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			var lang = ReactiveStore.get("nbLang") || "pl";
			
			if(city && lang && lastLang !== lang) {
				NB.Cities.load(lang, city);
				lastLang = lang;
			}
		});
	};

	Session.set("nbUsage", "foot");
}