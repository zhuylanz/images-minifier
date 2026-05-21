const test = require("node:test");
const assert = require("node:assert/strict");

test("package main exports image helpers", () => {
	const exported = require("../index");

	assert.equal(typeof exported.compressImage, "function");
	assert.equal(typeof exported.webpize, "function");
	assert.equal(typeof exported.minifyImages, "function");
});
