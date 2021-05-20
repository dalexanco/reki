import { nanoid } from "nanoid";

export class HttpRequestHeaderModel {
  id: string;
  key: string;
  value: string;

  constructor(key: string, value: string, id: string | null = null) {
    this.id = id || nanoid()
    this.key = key
    this.value = value
  }

  public static clone(source: HttpRequestHeaderModel): HttpRequestHeaderModel {
    return new HttpRequestHeaderModel(
      source.key,
      source.value,
      source.id,
    )
  }
}
