const sharp = require("sharp");

async function webpize(path) {
	try {
		await sharp(path).webp().toFile(path.replace(/\.jpg|\.png|\.jpeg/, ".webp"));
		console.green("> webpize " + path);
	} catch (e) {
		console.log("webpize Error -->");
		console.log(e);
		console.log("<-- webpize Error");
	}
}

module.exports = webpize;
