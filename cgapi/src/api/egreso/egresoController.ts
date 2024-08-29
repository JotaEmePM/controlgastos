import type { Request, RequestHandler, Response } from "express"

import { EgresoService } from "@/api/egreso/egresoService"
import { handleServiceResponse } from "@/common/utils/httpHandlers"
import { logger } from "@/server"

class EgresoController {
  private egresoService: EgresoService

  constructor() {
    this.egresoService = new EgresoService()
  }

  public getEgresos: RequestHandler = async (_req: Request, res: Response) => {
    // logger.info('Egreso a getEgresos')
    const serviceResponse = await this.egresoService.findAll()
    return handleServiceResponse(serviceResponse, res)
  }

  public getEgreso: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10)
    const serviceResponse = await this.egresoService.findById(id)
    return handleServiceResponse(serviceResponse, res)
  }

  public newEgreso: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await this.egresoService.newEgreso(req.body)
    return handleServiceResponse(serviceResponse, res)
  }
}

export const egresoController = new EgresoController()
