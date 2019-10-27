const toCase = require("to-case");
const removeAccents = require("remove-accents-diacritics");

String.prototype.toSlug = function() {
	const withoutAccents = removeAccents.remove(this);
	return toCase.slug(withoutAccents);
};

String.prototype.toFormalPath = function() {
	const withoutAccents = removeAccents.remove(this);
	return withoutAccents.replace(/\s/g, "-").toLowerCase();
};
