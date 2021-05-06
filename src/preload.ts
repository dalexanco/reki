/* eslint-disable @typescript-eslint/no-explicit-any */

import { IncomingMessage } from 'http'
import https, { RequestOptions } from "https";
import { HttpRequestModel } from "./models/HttpRequestModel";

function nodeFetch(requestOptions: RequestOptions): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const clientRequest = https.request(requestOptions, resolve);
    clientRequest.on('error', reject);
    clientRequest.end();
  });
}

function sendHttpRequest(request: HttpRequestModel): void {
  console.log(`Preparing request "${request.method} ${request.url}"`);
  const url = new URL(request.url || ''); // TODO : rewrite me
  const requestOptions: RequestOptions = {
    method: request.method,
    host: url.host,
    path: url.pathname,
    port: url.port || 443,
  }
  console.log(requestOptions)
  nodeFetch(requestOptions).then((response) => {
    if (response.statusMessage == null) {
      return 'unknown'
    }
    console.log(response.statusMessage)
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on('end', () => {
      console.log('No more data in response.');
    });

    return response;
  }).catch((error) => {
    console.error(error.message)
  });
}

window.addEventListener("DOMContentLoaded", () => {
  (window as any).sendHttpRequest = sendHttpRequest;
});
