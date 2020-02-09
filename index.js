#!/usr/bin/node
require("./prototype");
const fs = require("fs-extra");
const { copyDir, beautifyDirStruct, isDirectory } = require("lamodules").Utils;
const { compressImage } = require("./engine");

run();

async function run() {
	const IN_DIR = process.argv[2];
	const OUT_DIR = process.argv[3];

	if (OUT_DIR) {
		await copyDir(IN_DIR, OUT_DIR);
		beautifyDirStruct(OUT_DIR);
		minifyImages(OUT_DIR);
	}
}

async function minifyImages(dir) {
	const targets = extractImagePaths(dir);
	for (let target of targets) {
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
