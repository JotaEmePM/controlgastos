import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { commonValidations } from '@/common/utils/commonValidation'

extendZodWithOpenApi(z)

export type Ingreso = z.infer<typeof IngresoSchema>
export const IngresoSchema = z.object({
  id: z.number(),
  name: z.string(),
  tipoId: z.number()
  // createdAt: z.date(),
  // updatedAt: z.date()
})

export const GetIngresoSchema = z.object({
  params: z.object({ id: commonValidations.id })
})

export const CrateIngresoSchema = z.object({
  // body: z.object({
  name: z.string().min(1, 'Name is required')
  // })
})
