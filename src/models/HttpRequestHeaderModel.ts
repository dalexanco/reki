import { nanoid } from "nanoid";

export class HttpRequestHeaderModel {
  id: string;
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.id = nanoid()
    this.key = key
    this.value = value
  }
}
