Package.describe({
  summary: "Nextbike cities"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'nb-map', 'templating', 'underscore'], ['client', 'server']);

	api.add_files(['city.js'], ['client', 'server']);
});