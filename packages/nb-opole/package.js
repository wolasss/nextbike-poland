Package.describe({
  summary: "Nextbike opole"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['opole.js'], ['client', 'server']);
});