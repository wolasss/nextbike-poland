Package.describe({
  summary: "Next bike autocomplete package"
});

Package.on_use(function (api) {
	api.use(['nb'], ['client']);

	api.add_files(['autocomplete.js'], ['client']);
});
