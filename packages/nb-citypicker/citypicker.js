var changeSEOinfo = function(city) {

	SEO.set({
        title: TAPi18n.__("seo."+city+".title"),
        meta: {
          'description': TAPi18n.__("seo."+city+".desc")
        }
    });

};

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
		changeSEOinfo(this.name);
		ReactiveStore.set("nbCity", this.name);
	}
});

Template.nbCitypickernav.helpers({
	cities: function() {
		return NB.Cities.getAll();
	}
});

Template.registerHelper("currentCityKey", function(name) {
	return "cities."+( this.name ? this.name : (ReactiveStore.get("nbCity") || "nocity"));
});

Template.nbCitypickernav.events({
	'click .menuitem' : function(event, template) {
		ReactiveStore.set("nbCity", this.name);
		GAnalytics.event("city", "change", "nav");
		changeSEOinfo(this.name);
	}
});