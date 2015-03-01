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

	Session.set("nbUsage", "foot");
}

Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: l18n.t("seo.global.title"),
        meta: {
          'description': l18n.t("seo.global.desc")
        },
        rel_author: 'https://www.adamwolski.com'
      });
    }
});

