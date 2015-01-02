Package.describe({
  summary: "Nextbike buy me a coffee window"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'templating', 'mrt:reactive-store'], ['client', 'server']);

	api.add_files(['coffee.html', 'coffee.js'], ['client']);
});