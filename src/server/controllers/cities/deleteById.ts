import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation({
  params: yup.object().shape({
    number: yup.number().integer().moreThan(0),
  }),
});

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  console.log(req.params.id);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Não implementado!");
};
