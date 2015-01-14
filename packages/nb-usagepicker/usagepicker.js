Template.nbUsagepicker.helpers({
	usage: function() {
		return (ReactiveStore.get("nbCity") && !Session.get("nbUsage"));
	}
})

Template.nbUsagepicker.events({
	'click .box' : function(event, template) {
		var usage = event.currentTarget.getAttribute('name');
		GAnalytics.event("usage", "change", "main");
		Session.set("nbUsage", usage);
	}
})