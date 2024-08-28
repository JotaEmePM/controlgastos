import { StatusCodes } from 'http-status-codes'

import type { Egreso } from '@/api/egreso/egresoModel'
import { EgresoRepository } from '@/api/egreso/egresoRepository'
import { ServiceResponse } from '@/common/models/serviceResponse'
import { logger } from '@/server'

export class EgresoService {
  private egresoRespository: EgresoRepository

  /**
   * Constructs a new instance of EgresoService, optionally injecting a repository.
   *
   * @param {EgresoRepository} [repository=new EgresoRepository()] - The repository to inject. If not provided, a new instance of EgresoRepository will be created.
   */
  constructor (repository: EgresoRepository = new EgresoRepository()) {
    this.egresoRespository = repository
  }

  /**
   * Retrieves all egresos from the database.
   *
   * @return {Promise<ServiceResponse<Egreso[] | null>>} A promise that resolves to a ServiceResponse object
   * containing the retrieved egresos or an error if the retrieval fails.
   */
  async findAll (): Promise<ServiceResponse<Egreso[] | null>> {
    try {
      const result = await this.egresoRespository.findAll()
      return ServiceResponse.success('Success', result)
    } catch (error) {
      logger.error(error)
      return ServiceResponse.failure(
        'Error',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }

  /**
   * Retrieves a single egreso by their ID.
   *
   * @param {number} id - The ID of the egreso to retrieve.
   * @return {Promise<ServiceResponse<Egreso | null>>} A promise that resolves to a ServiceResponse object
   * containing the retrieved egreso or an error if the retrieval fails.
   */
  async findById (id: number): Promise<ServiceResponse<Egreso | null>> {
    try {
      const egreso = await this.egresoRespository.findByIdAsync(id)
      if (!egreso) {
        return ServiceResponse.failure(
          'egreso not found',
          null,
          StatusCodes.NOT_FOUND
        )
      }
      return ServiceResponse.success<Egreso>('User found', egreso)
    } catch (ex) {
      const errorMessage = `Error finding egreso with id ${id}:, ${
        (ex as Error).message
      }`
      logger.error(errorMessage)
      return ServiceResponse.failure(
        'An error occurred while finding egreso.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }

  async newEgreso (egreso: Egreso): Promise<ServiceResponse<Egreso | null>> {
    try {
      const result = await this.egresoRespository.newEgreso(egreso)
      return ServiceResponse.success('Success', result)
    } catch (error) {
      logger.error(error)
      return ServiceResponse.failure(
        'Error',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }
}
