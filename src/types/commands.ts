export type Command = 'add' | 'modify' | 'remove' | 'read' | 'list' | undefined;

export function translateCommand(commandString: string): Command {
  let command: Command;
  if (command === "add") {
    command = 'add';
  } else if (commandString === "modify") {
    command = 'modify';
  } else if (commandString === "remove") {
    command = 'remove';
  } else if (commandString === "read") {
    command = 'read';
  } else if (commandString === "list") {
    command = 'list';
  } else {
    command = undefined;
  }
  return command;
}
