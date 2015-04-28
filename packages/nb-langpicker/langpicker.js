Router.map(function(){
	this.route('lang', function(){

		GAnalytics.pageview();

		this.render();
	},{
	    path: '/lang/:lang',
	    layoutTemplate: 'nbLayout',
        template: 'nbHome',
        yieldTemplates: {
          'nbHeader': {to: 'header'},
          'nbFooter': {to: 'footer'}
        },
	    onBeforeAction: function() {
	    	if(this.params.lang.match(/\w\w/)) {
	    		var lang = this.params.lang;
	    		ReactiveStore.set("nbLang", lang);

	    		SEO.set({
			        title: TAPi18n.__("seo.global.title"),
			        meta: {
			          'description': TAPi18n.__("seo.global.desc")
			        }
			    });
	    		
	    		this.next();
	    	}
	    } 
 	});
});