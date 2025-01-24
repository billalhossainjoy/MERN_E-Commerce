class ErrorApi extends Error {
  public status: number;
  public errors?: object | string | null;

  constructor(status: number, message: string, errors?: object | string | null) {
    super(message);
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}


export default ErrorApi