/* translate all templates - workaround */

var renderCallback = function(oldFn) {
	return function() {
		if(oldFn) oldFn.apply(this);

		var self = this;
		var data;
		if(self.findAll) {
			data = self.findAll('[data-i18n]');
			if(data.length !== 0) {
				l18n.run(data);
			}
		}
	}
};

Meteor.startup(function(){
	l18n.init();
	for(var property in Template){
		var fn;
		if(Blaze.isTemplate(Template[property])){
			var template = Template[property];
			fn = template.rendered;
			template.rendered = renderCallback(fn);
		}
	}
});