Package.describe({
  summary: "Nextbike geolocalization"
});

Package.on_use(function (api) {
	api.use(['nb', 'mrt:nprogress', 'wolas:alerts'], ['client', 'server']);
	api.add_files(['geolocalization.js'], ['client']);
});