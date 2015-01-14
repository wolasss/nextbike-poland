Template.nbCoffeeWindow.events({
	'change .coffeeDismiss': function(event, template) {
		var checkbox = event.currentTarget;

		GAnalytics.event("coffee", "dismiss");
		if($(checkbox).is(':checked')) {
			ReactiveStore.set("nbCoffee", true);
		} else {
			ReactiveStore.set("nbCoffee", false);
		}
	}
});

Template.nbCoffeeToggle.events({
	'click .coffeeToggle': function() {
		GAnalytics.event("coffee", "open");
	}
});

Template.nbCoffeeToggle.helpers({
	hideCoffee : function() {
		return ReactiveStore.get("nbCoffee");
	}
});