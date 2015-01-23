Package.describe({
  summary: "Nextbike bialystok"
});

Package.on_use(function (api) {
	api.use(['nb', 'nb-city'], ['client', 'server']);

	api.add_files(['bialystok.js'], ['client', 'server']);
});