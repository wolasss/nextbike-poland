Package.describe({
  summary: "Nextbike wroclaw"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['wroclaw.js'], ['client', 'server']);
});