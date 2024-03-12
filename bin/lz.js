#!/usr/bin/env node
import { program } from "commander";
import LottieCompress from "lottie-compress";
import fs from "fs";
import { createRequire } from "module";
import { resolve } from "path";

import { error, info } from "../lib/logger.js";

/**
 * Usage.
 */
program.usage("lottie_file [option]").option("-c, --cover", "覆盖原文件");

/**
 * Help.
 */
program.on("--help", function () {
  console.log();
  console.log("Examples:");
  console.log("  $ lz lottie_file");
  console.log("  $ lz lottie_file -c");
});

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) {
    program.help();
  }
}
help();

const cwd = process.cwd();
const require = createRequire(import.meta.url);

const args = program.opts();
const isCover = args.cover || false;

const fileName = program.args[0];
if (!fileName) {
  error("参数不能为空!");
  process.exit(0);
}
if (/.json$/.test(fileName)) {
  const json = require(resolve(cwd, fileName));

  const lottieCompress = new LottieCompress.default(json);
  const ret = await lottieCompress.execute();

  const generateFileName = isCover
    ? fileName
    : `${fileName.slice(0, -5)}_zip.json`;

  fs.writeFileSync(resolve(cwd, generateFileName), JSON.stringify(ret));

  info("Lottie JSON 文件压缩完成!");
  process.exit(0);
} else {
  error(`参数 ${fileName} 非 Lottie JSON 文件!`);
  process.exit(0);
}
