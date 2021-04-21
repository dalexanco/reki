import { RequestHeaders } from "./base";
import { FormParamEncodingStrategy } from "./FormParamEncodingStrategy";

export type HostCertificates = {
  [key: string]: {
      cert?: string;
      key?: string;
      pfx?: string;
      passphrase?: string;
  }
};

export class RestClientSettings {
  public followRedirect?: boolean;
  public defaultHeaders?: RequestHeaders;
  public timeoutInMilliseconds?: number;
  public showResponseInDifferentTab?: boolean;
  public requestNameAsResponseTabTitle?: boolean;
  public proxy?: string;
  public proxyStrictSSL?: boolean;
  public rememberCookiesForSubsequentRequests?: boolean;
  public enableTelemetry?: boolean;
  public excludeHostsForProxy?: string[];
  public fontSize?: number;
  public fontFamily?: string;
  public fontWeight?: string;
  public environmentVariables?: { [key: string]: { [key: string]: string } };
  public mimeAndFileExtensionMapping?: { [key: string]: string };
  public previewResponseInUntitledDocument?: boolean;
  public hostCertificates?: HostCertificates;
  public suppressResponseBodyContentTypeValidationWarning?: boolean;
  public disableHighlightResonseBodyForLargeResponse?: boolean;
  public disableAddingHrefLinkForLargeResponse?: boolean;
  public largeResponseBodySizeLimitInMB?: number;
  public previewResponsePanelTakeFocus?: boolean;
  public formParamEncodingStrategy?: FormParamEncodingStrategy;
  public addRequestBodyLineIndentationAroundBrackets?: boolean;
  public decodeEscapedUnicodeCharacters?: boolean;
  public enableSendRequestCodeLens?: boolean;
  public enableCustomVariableReferencesCodeLens?: boolean;
}
