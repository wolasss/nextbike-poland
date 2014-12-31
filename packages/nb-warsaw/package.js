Package.describe({
  summary: "Nextbike cities"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['warsaw.js'], ['client', 'server']);
});