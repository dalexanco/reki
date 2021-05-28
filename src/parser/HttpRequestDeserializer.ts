import { HttpRequestModel } from '@/models/HttpRequestModel'
import { PARSER_DEFAULT_HTTP_VERSION, PARSER_DEFAULT_PROTOCOL } from '@/constants'
import { HttpRequestMethodModel } from '@/models/HttpRequestMethodModel'
import { HttpRequestHeaderModel } from '@/models/HttpRequestHeaderModel'

enum ParseRequestState {
  Url,
  Header,
  Body,
}

enum ParseCommentState {
  MetaHead,
  MetaHeadSeparator,
  MetaField,
  SimpleComment,
}

export interface ParserOptions {
  defaultMethod: string;
  defaultModelVersion: string;
}

const DEFAULT_OPTIONS: ParserOptions = {
  defaultMethod: 'GET',
  defaultModelVersion: '1.0',
}

const REGEX_MODEL_VERSION = /^#\sHttpRequest-(\d\.\d)/
const REGEX_META_FIELD = /^#\s?(\w*):\s?(.*)/

export default class HttpRequestDeserializer {

  private _requestParseState: ParseRequestState
  private _commentParseState: ParseCommentState
  public options: ParserOptions
  public request: HttpRequestModel

  constructor(options?: ParserOptions) {
    this._requestParseState = ParseRequestState.Url
    this._commentParseState = ParseCommentState.SimpleComment
    this.options = { ...options, ...DEFAULT_OPTIONS }
    this.request = new HttpRequestModel()
  }

  public parse(rawRequest: string): Promise<HttpRequestModel> {
    return new Promise((resolve) => {
      let lineCount = 0
      rawRequest.split(/\r?\n/).forEach((rawLine) => {
        const trimLine = rawLine.trim()
        trimLine.startsWith('#') ?
          this.parseCommentLine(trimLine, lineCount++) :
          this.parseHttpLine(rawLine, lineCount++)
      })
      resolve(this.request)
    })
  }

  private parseHttpLine(rawLine: string, lineIndex: number): void {
    switch (this._requestParseState) {
      case ParseRequestState.Url:
        this.parseRootLine(rawLine)
        this._requestParseState = ParseRequestState.Header
        break;
      case ParseRequestState.Header:
        if (rawLine === '') {
          this._requestParseState = ParseRequestState.Body
          break
        }
        this.parseHeaderLine(rawLine)
        break;
      case ParseRequestState.Body:
        this.parseBodyLine(rawLine)
        break;
    }
  }

  private parseCommentLine(rawLine: string, lineIndex: number) {
    const metaFieldRegOutput = REGEX_META_FIELD.exec(rawLine)
    if (rawLine.startsWith('# HttpRequest-')) {
      this._commentParseState = ParseCommentState.MetaHead
      const modelVersionRegOutput = REGEX_MODEL_VERSION.exec(rawLine)
      this.request.modelVersion = modelVersionRegOutput ?
        modelVersionRegOutput[1] :
        this.options.defaultModelVersion
    } else if (rawLine === '#') {
      this._commentParseState = ParseCommentState.MetaHeadSeparator
    } else if (
      (
        this._commentParseState == ParseCommentState.MetaHeadSeparator ||
        this._commentParseState == ParseCommentState.MetaField
      ) && metaFieldRegOutput) {
      this.request.meta.push([metaFieldRegOutput[1], metaFieldRegOutput[2]])
    } else {
      this._commentParseState = ParseCommentState.SimpleComment
      this.request.comments.push({ lineNumber: lineIndex, value: rawLine })
    }
  }

  private parseRootLine(rawLine: string) {
    let method: string;
    let path: string;
    let httpVersion: string = PARSER_DEFAULT_HTTP_VERSION;

    const matchValidMethod = /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|CONNECT|TRACE)\s+/i.exec(rawLine);
    if (matchValidMethod) {
        method = matchValidMethod[1];
        path = rawLine.substr(matchValidMethod[0].length);
    } else {
        method = this.options.defaultMethod;
        path = rawLine;
    }

    path = path.trim();
    const matchValidProtocol = /\s+(HTTP\/.*)$/i.exec(path)
    if (matchValidProtocol) {
      path = path.substr(0, matchValidProtocol.index);
      httpVersion = matchValidProtocol[1]
    }
    this.request.protocol = this.request.getMeta('protocol') || PARSER_DEFAULT_PROTOCOL
    this.request.httpVersion = httpVersion
    this.request.method = <HttpRequestMethodModel> method
    this.request.path = path
    this._requestParseState = ParseRequestState.Header
  }

  private parseHeaderLine(rawLine: string) {
    const headers: Array<HttpRequestHeaderModel> = [];
    let fieldName: string;
    let fieldValue: string;
    const separatorIndex = rawLine.indexOf(':');
    if (separatorIndex === -1) {
        fieldName = rawLine.trim();
        fieldValue = '';
    } else {
        fieldName = rawLine.substring(0, separatorIndex).trim();
        fieldValue = rawLine.substring(separatorIndex + 1).trim();
    }

    // Catch host
    const normalizedFieldName = fieldName.toLowerCase();
    if (normalizedFieldName === 'host') {
      this.request.host = fieldValue
      return;
    }

    headers.push(new HttpRequestHeaderModel(fieldName, fieldValue));
    this.request.headers = [ ...this.request.headers, ...headers ];
  }

  private parseBodyLine(rawLine: string) {

  }

}
