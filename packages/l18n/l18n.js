l18n = (function(){
	var startupLang = ReactiveStore.get("nbLang") || "pl";

	var langs = ["pl", "en"];
	var initialized = false;
	var namespaces = [];
	var run = function(data){
		var tdata;
		if(data && data.length>0) {
			tdata = $(data);
		} else {
			tdata = $('[data-i18n]');
		}

		if(initialized && tdata.length>0 && tdata.i18n) {
			tdata.i18n();
		}
	};
	var init = function() {

		if(!initialized) {
			i18n.init({lng: startupLang, load: 'unespecific', preload: startupLang, debug: false, resGetPath: '/locales/__lng__/__ns__.json', fallbackLng: 'en', getAsync: false }, function(t) {
				run();
			});
			ReactiveStore.set("nbLang", startupLang);
			initialized = true;
		}
	};
	var loadNamespaces = function(namespace) {
		namespaces.push(namespace);
		if(initialized) {
			i18n.loadNamespace(namespace);
		}
	};

	var getNamespaces = function() {
		return namespaces;
	};

	var changeToCurrent = function() {
		i18n.setLng(ReactiveStore.get("nbLang"), function(){
			run();
		});
	}

	var changeLang = function(lang) {
		if(!initialized) {
			startupLang = lang;
		} else {
			if(lang.match(/\w\w/)) {
				ReactiveStore.set("nbLang", lang);
			}
		}
	};

	var getCurrentLang = function() {
		return ReactiveStore.get("nbLang") || "en";
	};

	var getLangs = function() {
		return langs;
	};

	Tracker.autorun(changeToCurrent);
	
	/* translating pragmatic approach */
	var t = function(item, details) {
		if(initialized) {
			return i18n.t(item, details);
		} else {
			return "";
		}
	};

	return {
		init: init,
		run: run,
		changeLang: changeLang,
		loadNamespaces: loadNamespaces,
		getNamespaces: getNamespaces,
		getCurrentLang: getCurrentLang,
		t: t,
		getLangs: getLangs
	};
})();

