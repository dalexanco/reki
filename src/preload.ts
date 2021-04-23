/* eslint-disable @typescript-eslint/no-explicit-any */

import { IncomingMessage } from 'http'
import https, { RequestOptions } from "https";
import axios, { Method } from 'axios';
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
  // return axios({
  //   method: <Method> request.method.toString(),
  //   url: request.url,
  //   data: request.body,
  //   headers: request.headers,
  // }).then(response => {
  //   console.log(response.statusText)

  //   return response.statusText
  // })

  const url = new URL(request.url);
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

  // return new Promise((resolve) => {
  //   const client = new net.Socket(); // return a Node socket
  //   client.connect({ port: 80, host: "example.com" });
  //   client.on("close", () => {
  //     console.log("closed");
  //   });
  //   client.on("connect", () => {
  //     console.log("connected");
  //     client.write(requestRaw);
  //     client.on("data", (data) => {
  //       console.log("received : " + data);
  //       resolve(data.toString());
  //     });
  //   });
  // });
}

window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  (window as any).sendHttpRequest = sendHttpRequest;
  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }
});
