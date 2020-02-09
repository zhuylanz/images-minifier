const CWebp = require("cwebp").CWebp;

async function webpize(path) {
	const encoder = new CWebp(path);
	try {
		await encoder.write(path.replace(/\.jpg|\.png/, ".webp"));
		console.green("> webpize " + path);
	} catch (e) {
		console.log("webpize Error -->");
		console.log(e);
		console.log("<-- webpize Error");
	}
}

module.exports = webpize;
