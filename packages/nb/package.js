Package.describe({
  summary: "Next bike main package"
});

Package.on_use(function (api) {
	api.add_files(['common.js'], ['client', 'server']);
	api.export && api.export('NB');
});
