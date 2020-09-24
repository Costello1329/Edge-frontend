import {preferences} from "../preferences";


export type Serializer<Raw, Data> = (_: Data) => Raw;
export type Deserializer<Raw, Data> = (_: Raw) => Data;

export enum HttpMethod {
  get = "GET",
  post = "POST"
}

export class HttpConnection
<RequestData, ResponseData, RawRequestData, RawResponseData> {
  constructor (
    private readonly url: string,
    private readonly method: HttpMethod,
    private readonly requestSerializer:
      Serializer<RawRequestData, RequestData>,
    private readonly responseDeserializer:
      Deserializer<RawResponseData, ResponseData>
  ) {}

  public send (request?: RequestData): Promise<ResponseData> {
    return new Promise<ResponseData>((
      resolve: (response: ResponseData) => void,
      reject: () => void
    ): void => {
      const headers: HeadersInit = {};
      
      const fullRequest: RequestInit = {
        method: this.method,
        mode: "cors",
        headers
      };

      if (request !== undefined) {
        Object.assign(headers, { "Content-Type": "application/json" });
        Object.assign(
          fullRequest,
          { body: JSON.stringify(this.requestSerializer(request)) }
        );
      }

      fetch(preferences.apiHost + this.url, fullRequest)
        .then((response: Response): void =>
          response.status !== 200 ?
          reject() :
          void(response.json().then((responseData: any) =>
              resolve(this.responseDeserializer(responseData as RawResponseData))
          ))
        ).catch((_: any): void => reject());
    });
  }
}

export const getConnection =
  <
    RequestData,
    ResponseData,
    RawRequestData = RequestData,
    RawResponseData = ResponseData
  >(
    url: string,
    method: HttpMethod,
    requestSerializer: Serializer<RawRequestData, RequestData>,
    responseDeserializer: Deserializer<RawResponseData, ResponseData>
  ): HttpConnection<RequestData, ResponseData, RawRequestData, RawResponseData> =>
      new HttpConnection(url, method, requestSerializer, responseDeserializer);
