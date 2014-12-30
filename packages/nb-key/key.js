Template.nbKey.helpers({
	available: function() {
		return i18n.t("key.available_"+Session.get("nbUsage"));
	},
	noavailable: function() {
		return i18n.t("key.no_"+Session.get("nbUsage"));
	}
});