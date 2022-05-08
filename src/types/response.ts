import {Note} from "../note/note-class";
import {Command} from "./commands";

export type ResponseType = {
  type: Command;
  success: boolean;
  notes?: Note[];
}
