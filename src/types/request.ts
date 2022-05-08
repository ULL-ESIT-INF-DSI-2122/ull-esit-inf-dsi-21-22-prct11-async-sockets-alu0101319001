import {Color} from "./color";
import {Command} from "./commands";

export type RequestType = {
  type: Command;
  user: string;
  title?: string;
  newTittle?: string;
  body?: string;
  color?: Color;
}
