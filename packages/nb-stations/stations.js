NB.Stations = new Mongo.Collection("stations");

if(Meteor.isClient) {
	var cursor;

	Tracker.autorun(function(){
		var sub = Meteor.subscribe("stations", ReactiveStore.get("nbCity"));

		if(sub.ready()) {
			NB.Markers.createMarkers();
		}
	
		cursor = NB.Stations.find({city: ReactiveStore.get("nbCity")});
		
		cursor.observe({
			changed: function(document) {
				console.log("changed:", document)
				NB.Markers.handleStation(document);
			},
			removed: function(document) {
				console.log("removed", document);
				//NB.Markers.removeStation(document)
			}
		})
	});

	
}

if(Meteor.isServer) {
	Meteor.publish('stations', function(city) {
		return NB.Stations.find({city: city});
	});
}