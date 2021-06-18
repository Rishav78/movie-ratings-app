import {Request, Response, NextFunction} from "express";
import {validate} from "class-validator";
import {plainToClass} from "class-transformer";

export class Validator {
  public static body(validator: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req;
      const transformed = plainToClass(validator, body);
      try {
        const error = await validate(transformed);
        if(error.length > 0) {
          return next(error);
        }
      next();
      }
      catch (error) {
        return next(error);
      }
    }
  }
}