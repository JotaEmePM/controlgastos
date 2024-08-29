import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

import { commonValidations } from "@/common/utils/commonValidation"

extendZodWithOpenApi(z)

export type Egreso = z.infer<typeof EgresoSchema>
export const EgresoSchema = z.object({
  id: z.number(),
  name: z.string(),
  tipoId: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date()
})

export const GetEgresoSchema = z.object({
  params: z.object({ id: commonValidations.id }),
})

export const CrateEgresoSchema = z.object({
  // body: z.object({
  name: z.string().min(1, "Name is required"),
  // })
})
