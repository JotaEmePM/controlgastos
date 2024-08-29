import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi"

import { egresoRegistry } from "@/api/egreso/egresoRouter"
import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter"
import { ingresoRegistry } from "@/api/ingreso/ingresoRouter"
import { tipoRegistry } from "@/api/tipo/tipoRouter"
import { userRegistry } from "@/api/user/userRouter"

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    tipoRegistry,
    ingresoRegistry,
    egresoRegistry,
  ])
  const generator = new OpenApiGeneratorV3(registry.definitions)

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  })
}
