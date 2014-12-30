Package.describe({
  summary: "Nextbike layout"
});

Package.on_use(function (api) {
	api.use(['iron:router'], 'client');
	api.use(['nb', 'wolas:alerts', 'nb-ui','templating', 'l18n'], ['client', 'server']);

	api.add_files(['layout.html'], 'client');
	api.add_files(['router.js'], 'client');
});