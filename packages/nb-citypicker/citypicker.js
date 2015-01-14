Template.nbCitypicker.helpers({
	city: function() {
		return ReactiveStore.get("nbCity");
	},
	cities: function() {
		return NB.Cities.getAll();
	}
});

Template.nbCityOption.events({
	'click .citySelect': function(event, template) {
		GAnalytics.event("city", "change", "main");
		ReactiveStore.set("nbCity", this.name);
	}
});

Template.nbCitypickernav.helpers({
	currentCity: function() {
		var template = UI._templateInstance();
		setTimeout(function(){
			l18n.run(template.findAll('[data-i18n]'));
		}, 100);
		return ReactiveStore.get("nbCity") || "nocity";
	},
	cities: function() {
		return NB.Cities.getAll();
	}
});

Template.nbCitypickernav.events({
	'click .menuitem' : function(event, template) {
		ReactiveStore.set("nbCity", this.name);
		GAnalytics.event("city", "change", "nav");
		setTimeout(function(){
			l18n.run(template.findAll('[data-i18n]'));
		}, 100);
	}
});