import { HttpRequestModel } from '../models/HttpRequestModel';

export interface RequestParser {
    parseHttpRequest(name?: string): Promise<HttpRequestModel>;
}
