import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import express, { type Router } from 'express'
import { z } from 'zod'

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders'
import {
  validatePostRequest,
  validateRequest
} from '@/common/utils/httpHandlers'
import { ingresoController } from './ingresoController'
import {
  CrateIngresoSchema,
  GetIngresoSchema,
  IngresoSchema
} from './ingresoModel'

export const ingresoRegistry = new OpenAPIRegistry()
export const ingresoRouter: Router = express.Router()

ingresoRegistry.register('Ingresos', IngresoSchema)

ingresoRegistry.registerPath({
  method: 'get',
  path: '/ingresos',
  tags: ['Ingresos'],
  responses: createApiResponse(z.array(IngresoSchema), 'Success')
})
ingresoRouter.get('/', ingresoController.getIngresos)

ingresoRegistry.registerPath({
  method: 'get',
  path: '/tipos/{id}',
  tags: ['Tipos'],
  responses: createApiResponse(IngresoSchema, 'Success')
})
ingresoRouter.get(
  '/:id',
  validateRequest(GetIngresoSchema),
  ingresoController.getIngreso
)

ingresoRegistry.registerPath({
  method: 'post',
  path: '/ingresos',
  tags: ['Ingresos'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CrateIngresoSchema
        }
      }
    }
  },
  responses: createApiResponse(IngresoSchema, 'Success')
})
ingresoRouter.post(
  '/',
  validatePostRequest(CrateIngresoSchema),
  ingresoController.newIngreso
)
