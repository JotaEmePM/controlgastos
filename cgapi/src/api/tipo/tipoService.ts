import { StatusCodes } from 'http-status-codes'

import type { Tipo } from '@/api/tipo/tipoModel'
import { TipoRepository } from '@/api/tipo/tipoRepository'
import { ServiceResponse } from '@/common/models/serviceResponse'
import { logger } from '@/server'

export class TipoService {
  private tipoRespository: TipoRepository

  constructor (repository: TipoRepository = new TipoRepository()) {
    this.tipoRespository = repository
  }

  async findAll (): Promise<ServiceResponse<Tipo[] | null>> {
    try {
      const result = await this.tipoRespository.findAll()
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
