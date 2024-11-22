import { Router } from "express";
import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hello World");
});

router.get(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

router.post("/cities", CitiesController.getValidation, CitiesController.getAll);

router.get(
  "/cities/:id",
  CitiesController.getByIdValidation,
  CitiesController.getById
);

router.put(
  "/cities/:id",
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);

router.delete(
  "/cities/:id",
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

export { router };
