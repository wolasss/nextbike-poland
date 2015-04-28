if(Meteor.isClient) {
	Template.nbHome.rendered = function() {
		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			var lang = TAPi18n.getLanguage();			
			if(city && lang) {
				NB.Cities.load(lang, city);
			}
		});
	}

	Session.set("nbUsage", "foot");
}