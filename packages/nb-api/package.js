Package.describe({
  summary: "Nextbike api"
});

Package.on_use(function (api) {
	api.use(['nb', 'underscore', 'http'], ['client', 'server']);
	

	api.add_files(['api.js'], 'server');
});