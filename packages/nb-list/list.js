Template.nbList.helpers({
	availability: function() {
		var n = parseInt(this.bikes, 10);

		if(n>=5) return "high";
		if(n>=2) return "medium";
		if(n>=0) return "low";
	},
	currentCity: function() {
		var city = ReactiveStore.get("nbCity");
		if(city) {
			return TAPi18n.__("cities."+city);
		}
	}
})