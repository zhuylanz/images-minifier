#!/usr/bin/node
require("./prototype");
const fs = require("fs-extra");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

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

async function copyDir(inDir, outDir) {
	try {
		await fs.emptyDir(outDir);
		await fs.copy(inDir, outDir);
	} catch (e) {
		console.log("copyDir Error -->");
		console.log(e);
		console.log("copyDir Error <--");
		process.exit();
	}
}

function beautifyDirStruct(dir) {
	const subDirs = extractDirPaths(dir);

	if (subDirs.length > 0) {
		for (let path of subDirs) {
			const newPath = path.toFormalPath();
			fs.renameSync(path, newPath);
			console.log(`> ${path} --> ${newPath}`);

			beautifyDirStruct(newPath);
		}
	}
}

function extractDirPaths(dir) {
	let subDirs = [];
	const items = fs.readdirSync(dir);

	for (let item of items) {
		const path = dir + "/" + item;

		if (isDirectory(path)) {
			subDirs.push(path);
		}
	}

	return subDirs;
}

function isDirectory(path) {
	return fs.lstatSync(path).isDirectory();
}

async function minifyImages(dir) {
	const targets = extractImagePaths(dir);
	for (let target of targets) {
		compressImage(target);
	}
}

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
