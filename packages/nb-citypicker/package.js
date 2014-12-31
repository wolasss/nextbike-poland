Package.describe({
  summary: "Nextbike city picker"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'nb-map', 'nb-city', 'templating', 'mrt:reactive-store', 'nb-cities'], ['client', 'server']);

	api.add_files(['citypicker.html','citypicker.js'], 'client');
});