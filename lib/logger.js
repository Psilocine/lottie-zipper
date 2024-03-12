import chalk from "chalk";
import stripAnsi from "strip-ansi";

export const error = (msg) => {
  console.error(format(chalk.bgRed(" ERROR "), chalk.red(msg)));
};

export const info = (msg) => {
  console.log(format(chalk.bgBlue.black(" INFO "), msg));
};

const format = (label, msg) => {
  return msg
    .split("\n")
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : line.padStart(stripAnsi(label).length + line.length + 1);
    })
    .join("\n");
};
