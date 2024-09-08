# Images Minifier

This program is a CLI tool that minifies images in a given directory.

Instead of compressing 1 image at a time, this program compresses all images in a directory at once. It will make a copy of the original folder and compress the images in the new folder making sure the original images are not lost.

## Installation

```bash
npm install -g images-minifier
```

## Usage

```bash
imini <input_dir> <output_dir>
```

**Some options:**

`--beautify-dir, -b`
Should the output directory be beautified? (default: false)

`--use-webp, -w`
Convert original images to webp format instead of compressing them.

## Example

```bash
imini ./images ./compressed-images
```

or to convert images to webp format:

```bash
imini --use-webp ./images ./compressed-images
```

## Buy me a coffee

If you like this tool, consider buying me a coffee. Thanks a bunch!

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/zhuylanz)
