#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { copyDir, beautifyDirStruct } = require("lamodules").Utils;
const { minifyImages } = require("./engine");

const argv = yargs(hideBin(process.argv))
	.usage("Usage: $0 <input_dir> <output_dir>")
	.option("beautify-dir", {
		alias: "b",
		type: "boolean",
		description: "Should the output directory be beautified?",
		default: false
	})
	.option("use-webp", {
		alias: "w",
		type: "boolean",
		description:
			"Convert original images to webp format instead of compressing them.",
		default: false
	})
	.demandCommand(2, "You need to specify both input and output directories")
	.help().argv;

const IN_DIR = argv._[0];
const OUT_DIR = argv._[1];
const FLAGS = {
	beautifyDir: argv.beautifyDir,
	useWebp: argv.useWebp
};

main();

async function main() {
	if (OUT_DIR) {
		await copyDir(IN_DIR, OUT_DIR);
		if (FLAGS.beautifyDir) {
			beautifyDirStruct(OUT_DIR);
		}
		minifyImages(OUT_DIR, { webp: FLAGS.useWebp });
	}
}
