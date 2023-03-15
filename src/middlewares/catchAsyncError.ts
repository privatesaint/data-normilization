import { NextFunction, Request, Response, RequestHandler } from "express";

export default (func: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);
