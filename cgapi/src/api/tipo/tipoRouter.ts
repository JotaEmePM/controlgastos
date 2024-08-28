import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import express, { type Router } from 'express'
import { z } from 'zod'

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders'
import { validateRequest } from '@/common/utils/httpHandlers'
import { tipoController } from './tipoController'
import { TipoSchema } from './tipoModel'

export const tipoRegistry = new OpenAPIRegistry()
export const tipoRouter: Router = express.Router()

tipoRegistry.register('Tipos', TipoSchema)

tipoRegistry.registerPath({
  method: 'get',
  path: '/tipos',
  tags: ['Tipos'],
  responses: createApiResponse(z.array(TipoSchema), 'Success')
})

tipoRouter.get('/', tipoController.getTipos)
