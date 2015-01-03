Package.describe({
  summary: "Nextbike lublin"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['lublin.js'], ['client', 'server']);
});