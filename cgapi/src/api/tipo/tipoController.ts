import type { Request, RequestHandler, Response } from 'express'

import { TipoService } from '@/api/tipo/tipoService'
import { handleServiceResponse } from '@/common/utils/httpHandlers'
import { logger } from '@/server'

class TipoController {
  private tipoService: TipoService

  constructor () {
    this.tipoService = new TipoService()
  }

  public getTipos: RequestHandler = async (_req: Request, res: Response) => {
    logger.info('Ingreso a getTipos')
    const serviceResponse = await this.tipoService.findAll()
    return handleServiceResponse(serviceResponse, res)
  }

  // public getTipo: RequestHandler = async (req: Request, res: Response) => {
  //   const id = Number.parseInt(req.params.id as string, 10)
  //   const serviceResponse = await TipoService.findById(id)
  //   return handleServiceResponse(serviceResponse, res)
  // }
}

export const tipoController = new TipoController()
