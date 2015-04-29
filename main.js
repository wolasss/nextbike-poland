if(Meteor.isClient) {
	Template.nbHome.rendered = function() {
		var _lang = ReactiveStore.get("nbLang") || "pl";

		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			
			if(city && _lang) {
				NB.Cities.load(_lang, city);
			}
		});
	};

	Session.set("nbUsage", "foot");
}