Router.map(function(){
    this.route('home', {
        path: '/',
        layoutTemplate: 'nbLayout',
        template: 'nbHome',
        yieldTemplates: {
          'nbHeader': {to: 'header'},
          'nbFooter': {to: 'footer'}
        },
        onBeforeAction: function() {
            Alerts.clear(null);
            l18n.changeLang("pl");
            l18n.init();
               
            this.next();     
        }
    });
});

Iron.Location.configure({
    'linkSelector' : 'a:not([ironskip])'
});
