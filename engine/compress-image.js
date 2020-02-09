const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

async function compressImage(path) {
	await imagemin([path], {
		destination: extractDir(path),
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});
	console.log(`> ${path} --> compressed`);
}

function extractDir(path) {
	return path.slice(0, path.lastIndexOf("/"));
}

module.exports = compressImage;
