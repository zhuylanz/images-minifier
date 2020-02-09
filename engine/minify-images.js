const fs = require("fs-extra");
const { isDirectory } = require("lamodules").Utils;
const compressImage = require("./compress-image");
const webpize = require("./webpize");

async function minifyImages(dir, { webp } = {}) {
	const targets = extractImagePaths(dir);
	for (let target of targets) {
		if (webp) {
			webpize(target);
		}
		compressImage(target);
	}
}

function extractImagePaths(dir) {
	let imagePaths = [];
	let subImagePaths = [];
	const items = fs.readdirSync(dir);

	for (let item of items) {
		const path = dir + "/" + item;

		if (isImageFile(path)) {
			imagePaths.push(path);
		} else if (isDirectory(path)) {
			subImagePaths.push(extractImagePaths(path));
		}
	}

	for (let imagePath of subImagePaths) {
		imagePaths = imagePaths.concat(imagePath);
	}

	return imagePaths;
}

function isImageFile(path) {
	if (path.search(/\.jpg|\.png/) > -1) {
		return true;
	}
	return false;
}

module.exports = minifyImages;
