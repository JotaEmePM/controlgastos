import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { commonValidations } from '@/common/utils/commonValidation'

extendZodWithOpenApi(z)

export type Tipo = z.infer<typeof TipoSchema>
export const TipoSchema = z.object({
  id: z.number(),
  name: z.string()
  // createdAt: z.date(),
  // updatedAt: z.date()
})

export const GetTipoSchema = z.object({
  params: z.object({ id: commonValidations.id })
})
