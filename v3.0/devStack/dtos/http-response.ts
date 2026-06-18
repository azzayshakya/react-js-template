interface IHttpResponse<T> {
    /** API response data object */
    data: T;
  
    /** API response status code */
    statusCode: number;
  
    /** API response execution's result message. Max length is 255 characters */
    message: string;
  }
  
  export { type IHttpResponse };
  