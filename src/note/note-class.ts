/* eslint-disable max-len */
import {Color} from '../types/color';

export class Note {
  private noteString: string;
  private noteJSON;
  constructor(public title: string, public body: string, public color: Color) {
    this.noteString = JSON.stringify({title: this.title, body: this.body, color: this.color});
    this.noteJSON = JSON.parse(this.noteString);
  }

  getNoteString(): string {
    return this.noteString;
  }

  getNoteJSON() {
    return this.noteJSON;
  }

  setValues(title?: string, body?: string, color?: Color): void {
    if (title != undefined) {
      this.title = title;
    }
    if (body != undefined) {
      this.body = body;
    }
    if (color != undefined) {
      this.color = color;
    }
    this.updatePrivatesValues();
    return;
  }

  setWithString(JSONstring : string) {
    const json = JSON.parse(JSONstring);
    this.setValues(json.title, json.body, json.color);
  }

  setWithJSON(json : any) {
    this.setValues(json.title, json.body, json.color);
  }

  private updatePrivatesValues(): void {
    this.noteString = JSON.stringify({title: this.title, body: this.body, color: this.color});
    this.noteJSON = JSON.parse(this.noteString);
  }
}
