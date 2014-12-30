Package.describe({
 	summary: "Nextbike key"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'templating', 'mrt:reactive-store', 'nb-langpicker'], ['client', 'server']);

	api.add_files(['key.html','key.js'], 'client');
});