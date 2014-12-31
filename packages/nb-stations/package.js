Package.describe({
  summary: "Nextbike stations"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'wolas:alerts', 'nb-ui', 'nb-city', 'templating', 'nb-api', 'mongo', 'underscore', 'nb-cities', 'peerlibrary:xml2js', 'tracker', 'mrt:reactive-store', 'nb-markers'], ['client', 'server']);

	api.add_files(['stations.js'], ['client', 'server']);
	api.add_files(['sync.js'], ['server']);
});