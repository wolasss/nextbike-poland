Package.describe({
  summary: "Nextbike usage picker"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'nb-map', 'nb-city', 'templating', 'mrt:reactive-store'], ['client', 'server']);

	api.add_files(['usagepicker.html','usagepicker.js'], 'client');
});