import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { UserService } from "../services";
import SignUpValidator from "../validators/SignUp";
import FilterDictionaryValidator from "../validators/FilterDictionary";

/**
 * @route POST /user
 * @description Create new user profile
 */
export const signUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await SignUpValidator(req.body);

    const user = await UserService.create(validatedData);

    res.status(201).json({
      message: "Account created successfully",
      data: user,
    });
  }
);

/**
 * @route GET /search
 * @description Filter dictonary
 */
export const filterWord = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await FilterDictionaryValidator(req.query);

    const words = await UserService.filterDictionary(
      validatedData.query,
      validatedData.userId
    );

    res.status(200).json({
      message: "",
      data: words,
    });
  }
);
