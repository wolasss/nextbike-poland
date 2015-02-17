Router.map(function(){
    this.route('home', function(){
        GAnalytics.pageview('/');
        this.render();
    }, {
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
