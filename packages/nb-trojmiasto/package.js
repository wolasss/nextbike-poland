Package.describe({
  summary: "Nextbike trojmiasto"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['trojmiasto.js'], ['client', 'server']);
});