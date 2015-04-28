Meteor.startup(function(){
	TAPi18n.setLanguage(ReactiveStore.get("nbLang")||"pl").done(function(){
		SEO.config({
			title: TAPi18n.__("seo.global.title"),
			meta: {
				'description': TAPi18n.__("seo.global.desc")
			},
			rel_author: 'https://www.adamwolski.com'
		});
	});
});

l18n = (function(){
	var startupLang = ReactiveStore.get("nbLang") || "pl";

	var langs = ["pl", "en"];

	var changeToCurrent = function() {
		
		if(ReactiveStore.get("nbLang") && ReactiveStore.get("nbLang") !== TAPi18n.getLanguage()) {
			TAPi18n.setLanguage(ReactiveStore.get("nbLang")).done(function(){
				SEO.config({
					title: TAPi18n.__("seo.global.title"),
					meta: {
						'description': TAPi18n.__("seo.global.desc")
					},
					rel_author: 'https://www.adamwolski.com'
				});
			});
		}
		
	};

	var getLangs = function() {
		return langs;
	};

	Tracker.autorun(changeToCurrent);

	return {
		getLangs: getLangs
	};
})();

