Package.describe({
  summary: "Next bike map package"
});

Package.on_use(function (api) {

	api.use(['nb','underscore', 'templating', 'nb-autocomplete', 'nb-markers', 'nb-infowindow', 'nb-directions', 'nb-geocoder', 'nb-markerlabel'], ['client']);

	api.add_files(['map.html', 'map.js'], ['client']);
});
