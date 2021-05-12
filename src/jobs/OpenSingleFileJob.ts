import { HttpRequestModel } from "@/models/HttpRequestModel";
import { PathLike } from "original-fs";
import {promises as fsp} from 'fs'

import INativeJob from "./INativeJob";
import HttpRequestDeserializer from "@/parser/HttpRequestDeserializer";

export default class OpenSingleFileJob implements INativeJob<PathLike, HttpRequestModel> {
  async run(filePath: PathLike): Promise<HttpRequestModel> {
    const fileContent = await fsp.readFile(<PathLike> filePath, 'utf8')
    const deserializer = new HttpRequestDeserializer()
    const request = deserializer.parse(fileContent)

    return Promise.resolve(request)
  }
}
