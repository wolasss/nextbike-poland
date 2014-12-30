Package.describe({
  summary: "Nextbike directions"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'templating'], ['client', 'server']);

	api.add_files(['directions.html', 'directions.js'], ['client']);
});