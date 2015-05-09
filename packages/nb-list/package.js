Package.describe({
  summary: "Next bike list package"
});

Package.on_use(function (api) {

	api.use(['nb','underscore', 'templating', 'nb-autocomplete', 'nb-markers', 'nb-infowindow', 'nb-directions', 'nb-geocoder', 'nb-markerlabel', 'nb-citypicker'], ['client']);

	api.add_files(['list.html', 'list.js'], ['client']);
});
