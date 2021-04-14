/* eslint-disable @typescript-eslint/no-explicit-any */

import net from "net";

function sendHttpRequest(requestRaw: string): Promise<string> {
  console.log("Preparing request...");

  return new Promise((resolve) => {
    const client = new net.Socket(); // return a Node socket
    client.connect({ port: 80, host: "example.com" });
    client.on("close", () => {
      console.log("closed");
    });
    client.on("connect", () => {
      console.log("connected");
      client.write(requestRaw);
      client.on("data", (data) => {
        console.log("received : " + data);
        resolve(data.toString());
      });
    });
  });
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
