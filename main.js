if(Meteor.isClient) {
	Template.nbHome.rendered = function() {
		Deps.autorun(function(){
			var city = ReactiveStore.get("nbCity");
			var lang = l18n.getCurrentLang();			
			if(city && lang) {
				NB.Cities.load(lang, city);
			}
		});
	}
}
