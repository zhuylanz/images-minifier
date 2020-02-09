#!/usr/bin/node
require("./prototype");
const { copyDir, beautifyDirStruct } = require("lamodules").Utils;
const { compressImages } = require("./engine");

run();

async function run() {
	const IN_DIR = process.argv[2];
	const OUT_DIR = process.argv[3];

	if (OUT_DIR) {
		await copyDir(IN_DIR, OUT_DIR);
		beautifyDirStruct(OUT_DIR);
		compressImages(OUT_DIR);
	}
}
