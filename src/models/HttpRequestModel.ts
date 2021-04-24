import { getContentType } from "@/utils/httpMisc";
import { Stream } from "stream";

import { RequestHeaders } from "./base";

export class HttpRequestModel {
  public isCancelled: boolean;

  public constructor(
    public method: string,
    public url: string,
    public headers: RequestHeaders,
    public body?: string | Stream,
    public rawBody?: string,
    public name?: string,
    public raw?: string
  ) {
    this.method = method.toLocaleUpperCase();
    this.isCancelled = false;
  }

  public get contentType(): string | undefined {
    return getContentType(this.headers);
  }

  public cancel(): void {
    this.isCancelled = true;
  }
}
