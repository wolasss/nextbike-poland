Package.describe({
  summary: "Nextbike markers"
});

Package.on_use(function (api) {
	api.use(['iron:router'], 'client');
	api.use(['nb', 'nb-infowindow', 'tracker', 'session', 'reactive-var'], ['client', 'server']);

	api.add_files(['markers.js'], 'client');
});