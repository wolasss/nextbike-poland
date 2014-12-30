Package.describe({
  summary: "i18next repackaged for Meteor"
});

Package.on_use(function (api) {
	api.use(['jquery', 'underscore'], 'client');

  api.add_files('i18next-1.7.4.js', ['client']);
});

