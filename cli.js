#!/usr/bin/env node

const meow = require("meow");

const cli = meow(
	`
	Usage
	  $ images-minifier <input dir> <output dir>

	Options
	  --beautify-dir, -b  Beautify directories' name
`,
	{
		flags: {
			"beautify-dir": {
				type: "boolean",
				alias: "b"
			}
		}
	}
);

const IN_DIR = cli.input[0];
const OUT_DIR = cli.input[1];
const beautifyDir = cli.flags["beautify-dir"];
console.log(cli.flags);

async function main() {}
