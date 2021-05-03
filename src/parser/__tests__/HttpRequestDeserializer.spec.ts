import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import HtppRequestdeserializer from '../HttpRequestDeserializer'
import { HttpRequestModel } from '../../models/HttpRequestModel'
import HttpRequestDeserializer from '../HttpRequestDeserializer'

const rootPath = process.cwd()

describe('HttpRequestModel', () => {
  describe('Nominal case', () => {

    let request: HttpRequestModel
    before(async () => {
      const parser = new HttpRequestDeserializer();
      const nominalRequest = fs.readFileSync(path.resolve(rootPath, 'testcases/raw-request-json.http'))
      request = await parser.parse(nominalRequest.toString())
    })

    it('should have valid protocol', () => {
      expect(request).to.have.property('protocol', 'http')
    })

    it('should have valid method', () => {
      expect(request).to.have.property('method', 'GET')
    })

    it('should have valid host', () => {
      expect(request).to.have.property('host', 'petstore.swagger.io')
    })

    it('should have valid path', () => {
      expect(request).to.have.property('path', '/v2/pet/findByStatus?status=pending')
    })

    it('should have valid url', () => {
      expect(request).to.have.property('url', 'http://petstore.swagger.io/v2/pet/findByStatus?status=pending')
    })

    it('should have all valid headers', () => {
      expect(request).to.have.property('headers').that.is.ok
      const { headers } = request
      expect(headers).to.deep.include(['Sec-Ch-Ua', '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"'])
      expect(headers).to.deep.include(['Accept', 'application/json'])
      expect(headers).to.deep.include(['Sec-Ch-Ua-Mobile', '?0'])
      expect(headers).to.deep.include(['User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'])
      expect(headers).to.deep.include(['Origin', 'https://editor.swagger.io'])
      expect(headers).to.deep.include(['Sec-Fetch-Site', 'same-site'])
      expect(headers).to.deep.include(['Sec-Fetch-Mode', 'cors'])
      expect(headers).to.deep.include(['Sec-Fetch-Dest', 'empty'])
      expect(headers).to.deep.include(['Referer', 'https://editor.swagger.io/'])
      expect(headers).to.deep.include(['Accept-Encoding', 'gzip, deflate'])
      expect(headers).to.deep.include(['Accept-Language', 'fr-CA,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6'])
      expect(headers).to.deep.include(['Connection', 'close'])
    })
  })

  describe('Request with metas', () => {

    let request: HttpRequestModel
    before(async () => {
      const parser = new HttpRequestParser();
      const nominalRequest = fs.readFileSync(path.resolve(rootPath, 'testcases/meta-request-json.http'))
      request = await parser.parse(nominalRequest.toString())
    })

    it('should have valid meta', () => {
      expect(request).to.have.property('meta').that.is.an('array')
      expect(request.meta).to.have.deep.members([
        ['id', '123e4567-e89b-12d3-a456-426614174000'],
        ['name', 'GET findByStatus'],
        ['protocol', 'https'],
        ['createdAt', '2021-04-29 23:18:04'],
        ['updatedAt', '2021-04-29 23:18:04'],
        ['3xtr4', 'toto'],
      ]);
    })

    it('should have valid protocol', () => {
      expect(request).to.have.property('protocol', 'https')
    })

    it('should have valid model version', () => {
      expect(request).to.have.property('modelVersion', '1.0')
    })

    // TODO : check creation / update date

    it('should have valid method', () => {
      expect(request).to.have.property('method', 'PUT')
    })

    it('should have valid host', () => {
      expect(request).to.have.property('host', 'petstore.swagger.io')
    })

    it('should have valid path', () => {
      expect(request).to.have.property('path', '/v2/pet/findByStatus?status=pending')
    })

    it('should have valid url', () => {
      expect(request).to.have.property('url', 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending')
    })

    it('should have all comments', () => {
      expect(request).to.have.property('comments').that.is.an('array')
      const { comments } = request
      expect(comments).to.have.deep.members([
        { lineNumber: 13, value: '# A custom comment on a random line' },
        { lineNumber: 16, value: '# Another comment with some starting spaces' },
      ])
    })
  })
})
