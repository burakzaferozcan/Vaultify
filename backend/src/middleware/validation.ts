import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { RequestHandler } from "express";

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.type === "field" ? err.path : "",
        message: err.msg,
      })),
    });
  };
};
