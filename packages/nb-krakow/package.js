Package.describe({
  summary: "Nextbike krakow"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['krakow.js'], ['client', 'server']);
});