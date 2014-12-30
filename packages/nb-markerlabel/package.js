Package.describe({
  summary: "Nextbike cities"
});

Package.on_use(function (api) {
	
	api.use(['nb'], ['client', 'server']);

	api.add_files(['markerlabel.js'], ['client', 'server']);
});