#!/usr/bin/env node
const meow = require("meow");
const { copyDir, beautifyDirStruct } = require("lamodules").Utils;
const { minifyImages } = require("./engine");

const cli = meow(
	`
	Usage
	  $ images-minifier <input dir> <output dir>

	Options
	  --beautify-dir, -b  Beautify directories' name
	  --use-webp, -w  Use WebP
`,
	{
		flags: {
			"beautify-dir": {
				type: "boolean",
				alias: "b"
			},
			"use-webp": {
				type: "boolean",
				alias: "w"
			}
		}
	}
);

const IN_DIR = cli.input[0];
const OUT_DIR = cli.input[1];
const FLAGS = {
	beautifyDir: cli.flags.beautifyDir,
	useWebp: cli.flags.useWebp
};

main();

async function main() {
	if (cli.input.length == 0) {
		console.log(cli.help.replace("\n", ""));
	}

	if (OUT_DIR) {
		await copyDir(IN_DIR, OUT_DIR);
		if (FLAGS.beautifyDir) {
			beautifyDirStruct(OUT_DIR);
		}
		minifyImages(OUT_DIR, { webp: FLAGS.useWebp });
	}
}
