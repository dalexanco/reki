import { HttpRequestModel } from "../models/HttpRequestModel";

export default interface State {
  request: HttpRequestModel | undefined;
  raw: string | undefined;
}
