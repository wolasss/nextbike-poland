Package.describe({
  summary: 'Local internationalization'
});

Package.on_use(function(api){
  api.use(['jquery','i18next-meteor','tracker','templating', 'underscore', 'mrt:reactive-store'], 'client');

  api.add_files(['l18n.js', 'main.js'], 'client');
  api.add_files('startup.js', 'client');

  api.export && api.export('l18n');
});
