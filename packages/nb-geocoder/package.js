Package.describe({
  summary: "Nextbike info window"
});

Package.on_use(function (api) {
	
	api.use(['nb'], ['client', 'server']);

	api.add_files(['geocoder.js'], ['client']);
});