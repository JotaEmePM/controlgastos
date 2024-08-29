import { StatusCodes } from "http-status-codes"

import type { Ingreso } from "@/api/ingreso/ingresoModel"
import { IngresoRepository } from "@/api/ingreso/ingresoRepository"
import { ServiceResponse } from "@/common/models/serviceResponse"
import { logger } from "@/server"

export class IngresoService {
  private ingresoRespository: IngresoRepository

  /**
   * Constructs a new instance of IngresoService, optionally injecting a repository.
   *
   * @param {IngresoRepository} [repository=new IngresoRepository()] - The repository to inject. If not provided, a new instance of IngresoRepository will be created.
   */
  constructor(repository: IngresoRepository = new IngresoRepository()) {
    this.ingresoRespository = repository
  }

  /**
   * Retrieves all ingresos from the database.
   *
   * @return {Promise<ServiceResponse<Ingreso[] | null>>} A promise that resolves to a ServiceResponse object
   * containing the retrieved ingresos or an error if the retrieval fails.
   */
  async findAll(): Promise<ServiceResponse<Ingreso[] | null>> {
    try {
      const result = await this.ingresoRespository.findAll()
      return ServiceResponse.success("Success", result)
    } catch (error) {
      logger.error(error)
      return ServiceResponse.failure("Error", null, StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Retrieves a single ingreso by their ID.
   *
   * @param {number} id - The ID of the ingreso to retrieve.
   * @return {Promise<ServiceResponse<Ingreso | null>>} A promise that resolves to a ServiceResponse object
   * containing the retrieved ingreso or an error if the retrieval fails.
   */
  async findById(id: number): Promise<ServiceResponse<Ingreso | null>> {
    try {
      const ingreso = await this.ingresoRespository.findByIdAsync(id)
      if (!ingreso) {
        return ServiceResponse.failure("Ingreso not found", null, StatusCodes.NOT_FOUND)
      }
      return ServiceResponse.success<Ingreso>("User found", ingreso)
    } catch (ex) {
      const errorMessage = `Error finding ingreso with id ${id}:, ${(ex as Error).message}`
      logger.error(errorMessage)
      return ServiceResponse.failure(
        "An error occurred while finding ingreso.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async newIngreso(ingreso: Ingreso): Promise<ServiceResponse<Ingreso | null>> {
    try {
      const result = await this.ingresoRespository.newIngreso(ingreso)
      return ServiceResponse.success("Success", result)
    } catch (error) {
      logger.error(error)
      return ServiceResponse.failure("Error", null, StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}
