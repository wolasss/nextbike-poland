Package.describe({
  summary: "Nextbike grodzisk"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['grodzisk.js'], ['client', 'server']);
});