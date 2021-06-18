import { Response, Request } from "express";
import {configuration} from "../../core/config";

import {HttpError} from "http-errors";

type ReqRes = (req: Request, res: Response) => ResponseHandler;
type SetError = (error: HttpError, status?: number, description?: string) => ResponseHandler;
type ServerError = (error: HttpError, description?: string) => ResponseHandler;
type Send = (payload?: string | object) => void;
type SetStatus = (status: number) => ResponseHandler;
type SetData = (payload: any) => ResponseHandler;

export class ResponseHandler {
  private req!: Request;
  private res!: Response;
  private status: number = 200;
  private error?: HttpError;
  private payload?: any;

  public reqRes: ReqRes = (req, res) => {
    this.req = req;
    this.res = res;
    return this;
  };

  public setStatus: SetStatus = (status) => {
    this.status = status;
    return this;
  }

  public setError: SetError = (error, status = 500, description?) => {
    this.error = error;
    return this;
  };

  public setData: SetData = (payload) => {
    this.payload = payload;
    return this;
  }

  public serverError: ServerError = (message: HttpError, description?) => {
    this.setError(message, 500, description);
    return this;
  };

  public send: Send = async (payload?) => {
    if (payload) {
      await this.setData(payload)
    }
    if (!this.res) {
      throw new Error("please set req Res function to get start");
    }
    if (this.error) {
      const { code, message: error, stack } = this.error;
      this.res.status(code)
        .json({ 
          code,
          error,
          stack:  configuration.env === "development" ? 
            stack : null,
        });
    }
    else {
      this.res.status(this.status)
        .json({ code: this.status, data: this.payload });
    }
  }

}

export const getResponseHandler = () => {
  return new ResponseHandler();
}