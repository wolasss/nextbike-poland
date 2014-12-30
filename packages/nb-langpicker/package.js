Package.describe({
  summary: "Nextbike lang picker"
});

Package.on_use(function (api) {
	api.use(['nb', 'iron:router','templating', 'mrt:reactive-store', 'l18n'], ['client', 'server']);
	api.add_files(['langpicker.html', 'langpicker.js'], ['client']);
});