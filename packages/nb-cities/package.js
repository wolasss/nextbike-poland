Package.describe({
  summary: "Nextbike cities umbrella package"
});

Package.on_use(function (api) {
	
	api.use(['nb', 'nb-poznan', 'nb-warsaw', 'nb-wroclaw', 'nb-krakow', 'nb-bialystok'], ['client', 'server']);
});