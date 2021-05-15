import { PARSER_DEFAULT_PROTOCOL } from "@/constants";
import HttpRequestComment from "./HttpRequestCommentModel";
import { HttpRequestMethodModel } from "./HttpRequestMethodModel";
import { HttpRequestHeaderModel } from "./HttpRequestHeaderModel";

export class HttpRequestModel {
  name?: string;
  id?: string;
  modelVersion?: string;
  httpVersion?: string;
  protocol?: string;
  method?: HttpRequestMethodModel;
  host?: string;
  path?: string;
  body?: string;
  headers: Array<HttpRequestHeaderModel>;
  meta: Array<[string, string]>;
  comments: Array<HttpRequestComment>;

  constructor () {
    this.headers = []
    this.meta = []
    this.comments = []
  }

  get url(): string | null {
    const { host, path, protocol } = this
    if (!host || !path || !protocol) {
      return null
    }
    const normalizedProtocol = protocol || PARSER_DEFAULT_PROTOCOL

    return `${normalizedProtocol}://${host}${path}`
  }

  getHeader(key: string) {
    return this.headers.find((header) => key === header.key)
  }

  getMeta(key: string) {
    const meta = this.meta.find(([headerKey]) => key === headerKey)

    return meta ? meta[1] : undefined
  }
}
