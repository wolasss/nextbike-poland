NB.Stations = new Mongo.Collection("stations");

if(Meteor.isClient) {
	var cursor;

	Tracker.autorun(function(){
		var sub = Meteor.subscribe("stations", ReactiveStore.get("nbCity")||"");

		if(sub.ready()) {
			NB.Markers.createMarkers();
		}
	
		cursor = NB.Stations.find({city: ReactiveStore.get("nbCity")});
		
		cursor.observe({
			changed: function(document) {
				NB.Markers.stationChanged(document);
			},
			removed: function(document) {
				//NB.Markers.removeStation(document)
			}
		});
	});
	
	Template.registerHelper("nbStations", function(){
		return NB.Stations.find({}, {sort: {name: 1}});
	});
}


if(Meteor.isServer) {
	Meteor.publish('stations', function(city) {
		check(city, String);
		return NB.Stations.find({city: city});
	});
}