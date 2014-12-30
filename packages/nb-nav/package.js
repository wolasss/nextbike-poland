Package.describe({
  summary: "Nextbike nav"
});

Package.on_use(function (api) {
	api.use(['iron:router'], 'client');
	api.use(['nb', 'wolas:alerts', 'nb-ui','templating', 'nb-geolocalization'], ['client', 'server']);

	api.add_files(['nav.html'], 'client');
	api.add_files(['nav.js'], 'client');
});