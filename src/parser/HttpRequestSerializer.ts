import Stream from 'stream'
import readLine from 'readline'
import { HttpRequestModel } from '@/models/HttpRequestModel'
import { PARSER_DEFAULT_PROTOCOL } from '@/constants'
import { HttpRequestMethodModel } from '@/models/HttpRequestMethodModel'

export interface SerializerOptions {
}

export default class HttpRequestSerializer {

  public options: SerializerOptions

  constructor(options?: SerializerOptions) {
    this.options = { ...options }
  }

  public parse(request: HttpRequestModel): string {
    const output: Array<string> = []
    this.appendMeta(output, request)
    this.appendRequestRootLine(output, request)
    this.appendRequestHeaders(output, request)
    this.appendComments(output, request)

    return output.join('\n')
  }

  private appendMeta(output: Array<string>, request: HttpRequestModel) {
    const metaHeader = `# HttpRequest-${request.modelVersion}`
    const metaFields = request.meta.map(([key, value]) => `# ${key}: ${value}`)
    output.splice(output.length, 0, metaHeader, '#', ...metaFields)
  }

  private appendRequestRootLine(output: Array<string>, request: HttpRequestModel) {
    const requestRootLine = `${request.method} ${request.path} ${request.httpVersion}`
    output.splice(output.length, 0, requestRootLine)
  }

  private appendRequestHeaders(output: Array<string>, request: HttpRequestModel) {
    const requestHeaders = request.headers.map(({ key, value }) => `${key}: ${value}`)
    output.splice(output.length, 0, ...requestHeaders)
  }

  private appendComments(output: Array<string>, request: HttpRequestModel) {
    request.comments.forEach(({ lineNumber, value }) => {
      output.splice(lineNumber, 0, value)
    })
  }

}
