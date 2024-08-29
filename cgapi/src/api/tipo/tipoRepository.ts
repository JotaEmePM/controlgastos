import type { Tipo } from "@/api/tipo/tipoModel"
import { PrismaClient } from "@prisma/client"

export class TipoRepository {
  prisma = new PrismaClient()

  async findAll(): Promise<Tipo[]> {
    return await this.prisma.tipo.findMany()
  }
}

//export class TipoRepository extends SqliteApi
