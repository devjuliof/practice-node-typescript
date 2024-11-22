import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
  id?: number;
}

interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const updateById = (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.params.id);
  console.log(req.body.name);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
