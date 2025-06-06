import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";


export const validRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      console.log("Request body is valid");
      next();
    } catch (error) {
      console.log("Request body is invalid");
       res.status(400).json({
        success: false,
        message: "Invalid request body",
        error: error,
      });
      return;
    }
  };
};
