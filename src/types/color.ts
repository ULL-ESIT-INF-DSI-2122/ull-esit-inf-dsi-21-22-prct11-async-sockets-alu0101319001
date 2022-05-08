import chalk from 'chalk';

/**
 * Define a Color
 */
export type Color = "red" | "blue" | "yellow" | "green" | undefined;

/**
 * Translate a string to a Color
 * @param colorString The string to transalte
 * @returns The correct color
 */
export function translateColor(colorString: string): Color {
  let returnColor : Color;
  if (colorString == "red") {
    returnColor = "red";
  } else if (colorString == "blue") {
    returnColor = "blue";
  } else if (colorString == "yellow") {
    returnColor = "yellow";
  } else if (colorString == "green") {
    returnColor = "green";
  } else {
    returnColor = undefined;
  }
  return returnColor;
}

/**
 * Print a text with color
 * @param print Text to print
 * @param color Color of text
 * @returns The text with color
 */
export function printWithColor(print: string, color: Color): string {
  switch (color) {
    case 'red': {
      return chalk.red(print);
    }
    case 'yellow': {
      return chalk.yellow(print);
    }
    case 'blue': {
      return chalk.blue(print);
    }
    case 'green': {
      return chalk.green(print);
    }
    default: {
      return chalk.red('Error: Unrecognizable color');
    }
  }
}
