# Images Minifier

`images-minifier` is a small CLI that copies an image directory, then compresses the copied images or converts them to WebP.

It works on a whole folder at once, so your original images stay untouched.

## Installation

```bash
npm install -g images-minifier
```

## Usage

```bash
imini <input_dir> <output_dir>
```

## Options

`--beautify-dir, -b`
Beautify the output directory structure. Default: `false`

`--use-webp, -w`
Convert images to `.webp` instead of compressing their original format.
This now works after a normal `npm install` with no extra WebP package to install.

## Examples

```bash
imini ./images ./compressed-images
```

Convert everything to WebP:

```bash
imini --use-webp ./images ./compressed-images
```

Beautify the copied folder structure before processing:

```bash
imini --beautify-dir ./images ./compressed-images
```

## Programmatic usage

```js
const { minifyImages } = require("images-minifier");

await minifyImages("./compressed-images", { webp: true });
```

## Publish checklist

Before publishing:

```bash
npm test
npm pack --dry-run
npm publish
```

## Buy me a coffee

If you like this tool, consider buying me a coffee. Thanks a bunch!

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/zhuylanz)
