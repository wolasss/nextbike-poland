Template.nbCoffeeWindow.events({
	'change .coffeeDismiss': function(event, template) {
		var checkbox = event.currentTarget;

		if($(checkbox).is(':checked')) {
			ReactiveStore.set("nbCoffee", true);
		} else {
			ReactiveStore.set("nbCoffee", false);
		}
	}
});

Template.nbCoffeeToggle.helpers({
	hideCoffee : function() {
		return ReactiveStore.get("nbCoffee");
	}
});