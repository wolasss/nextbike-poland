Package.describe({
  summary: "Next Bike ui"
});

Package.on_use(function (api) {
	api.use(['fourseven:scss', 'mizzao:bootstrap-3'], ['client', 'server']);
	
	api.add_files(['styles/styles.scss'], 'client');
});