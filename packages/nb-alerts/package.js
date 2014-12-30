Package.describe({
  summary: "Nextbike alerts"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts'], ['client', 'server']);

	api.add_files(['alerts.html', 'alerts.js'], ['client']);
});