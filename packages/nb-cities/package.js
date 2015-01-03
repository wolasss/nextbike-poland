Package.describe({
  summary: "Nextbike cities umbrella package"
});

Package.on_use(function (api) {
	api.use(['nb', 'nb-poznan', 'nb-warsaw', 'nb-wroclaw', 'nb-krakow', 'nb-trojmiasto','nb-bialystok', 'nb-lublin', 'nb-opole', 'nb-grodzisk'], ['client', 'server']);
});