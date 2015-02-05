Sync = function() {
	var cities = NB.Cities.getAll();
	
	_.each(cities, function(city) {

		var ids = city.id;
		if(!(ids instanceof Array)) {
			ids = [ids];
		}

		_.each(ids, function(id){
			var response = NB.api.request("GET", id);

			if(response.statusCode === 200) {
				var markers = xml2js.parseStringSync(response.content).markers;
				if(markers) {
					if(markers.country) {
						var cityObj = markers.country[0].city[0];

						var stations = cityObj.place;

						_.each(stations, function(station){
							var s = station.$;
							s.city = city.name;

							var stationDoc = NB.Stations.findOne({uid: s.uid});
							if(stationDoc) {
								//update if anything changed
								if((s.bikes !== stationDoc.bikes) || (s.bikes !== stationDoc.bike_racks)) {
									NB.Stations.update({_id: stationDoc._id}, {$set: s});
								}
							} else {
								NB.Stations.insert(s);
							}
						});
					}
				}
			}

		});
	});
};

Sync();