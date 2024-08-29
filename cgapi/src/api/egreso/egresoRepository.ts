import type { Egreso } from "@/api/egreso/egresoModel"
import { PrismaClient } from "@prisma/client"

export class EgresoRepository {
  prisma = new PrismaClient()

  /**
   * Finds all Egresos.
   *
   * @return {Promise<Egreso[]>} A Promise that resolves to an array of all Egresos.
   */
  async findAll(): Promise<Egreso[]> {
    return await this.prisma.egreso.findMany()
  }

  /**
   * Finds a single Egreso by its ID.
   *
   * @param {number} id - The ID of the Egreso to find.
   * @return {Promise<Egreso | null>} A Promise that resolves to the Egreso with the given ID, or null if no Egreso is found.
   */
  async findByIdAsync(id: number): Promise<Egreso | null> {
    return this.prisma.egreso.findUnique({ where: { id } })
  }

  async newEgreso(egreso: Egreso): Promise<Egreso> {
    return await this.prisma.egreso.create({
      data: {
        name: egreso.name,
        tipoId: 2,
      },
    })
  }
}
