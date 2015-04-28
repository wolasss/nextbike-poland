Package.describe({
  summary: 'Local internationalization'
});

Package.on_use(function(api){
  api.use(['jquery','tap:i18n','tracker','templating', 'underscore', 'mrt:reactive-store', 'manuelschoebel:ms-seo'], 'client');

  api.add_files(['l18n.js'], 'client');

  api.export && api.export('l18n');
});
