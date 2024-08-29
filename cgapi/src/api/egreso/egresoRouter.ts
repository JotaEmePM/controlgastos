import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import express, { type Router } from "express"
import { z } from "zod"

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders"
import { validatePostRequest, validateRequest } from "@/common/utils/httpHandlers"
import { egresoController } from "./egresoController"
import { CrateEgresoSchema, EgresoSchema, GetEgresoSchema } from "./egresoModel"

export const egresoRegistry = new OpenAPIRegistry()
export const egresoRouter: Router = express.Router()

egresoRegistry.register("Egresos", EgresoSchema)

egresoRegistry.registerPath({
  method: "get",
  path: "/egresos",
  tags: ["Egresos"],
  responses: createApiResponse(z.array(EgresoSchema), "Success"),
})
egresoRouter.get("/", egresoController.getEgresos)

egresoRegistry.registerPath({
  method: "get",
  path: "/tipos/{id}",
  tags: ["Tipos"],
  responses: createApiResponse(EgresoSchema, "Success"),
})
egresoRouter.get("/:id", validateRequest(GetEgresoSchema), egresoController.getEgreso)

egresoRegistry.registerPath({
  method: "post",
  path: "/egresos",
  tags: ["Egresos"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CrateEgresoSchema,
        },
      },
    },
  },
  responses: createApiResponse(EgresoSchema, "Success"),
})
egresoRouter.post("/", validatePostRequest(CrateEgresoSchema), egresoController.newEgreso)
