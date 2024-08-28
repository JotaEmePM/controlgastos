import { Ingreso } from '@/api/ingreso/ingresoModel'
import { PrismaClient } from '@prisma/client'

export class IngresoRepository {
  prisma = new PrismaClient()

  /**
   * Finds all ingresos.
   *
   * @return {Promise<Ingreso[]>} A Promise that resolves to an array of all ingresos.
   */
  async findAll (): Promise<Ingreso[]> {
    return await this.prisma.ingreso.findMany()
  }

  /**
   * Finds a single ingreso by its ID.
   *
   * @param {number} id - The ID of the ingreso to find.
   * @return {Promise<Ingreso | null>} A Promise that resolves to the ingreso with the given ID, or null if no ingreso is found.
   */
  async findByIdAsync (id: number): Promise<Ingreso | null> {
    return this.prisma.ingreso.findUnique({ where: { id } })
  }

  async newIngreso (ingreso: Ingreso): Promise<Ingreso> {
    return await this.prisma.ingreso.create({
      data: {
        name: ingreso.name,
        tipoId: 1
      }
    })
  }
}
