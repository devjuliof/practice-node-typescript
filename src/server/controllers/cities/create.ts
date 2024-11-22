import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface City {
  name: string;
  state: string;
}

export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
});

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  return res.send("Create!");
};
