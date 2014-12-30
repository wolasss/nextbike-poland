Package.describe({
  summary: "Nextbike cities"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'nb-city','templating'], ['client', 'server']);

	api.add_files(['warsaw.js'], ['client', 'server']);
});