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
		ReactiveStore.set("nbCity", this.name);
	}
});

Template.nbCitypickernav.helpers({
	currentCity: function() {
		return ReactiveStore.get("nbCity");
	},
	cities: function() {
		return NB.Cities.getAll();
	}
});

Template.nbCitypickernav.events({
	'click .menuitem' : function(event, template) {
		ReactiveStore.set("nbCity", this.name);
		setTimeout(function(){
			l18n.run(template.findAll('[data-i18n]'));
		}, 100);
	}
});