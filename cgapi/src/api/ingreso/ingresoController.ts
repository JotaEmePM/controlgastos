import type { Request, RequestHandler, Response } from "express"

import { IngresoService } from "@/api/ingreso/ingresoService"
import { handleServiceResponse } from "@/common/utils/httpHandlers"
import { logger } from "@/server"

class IngresoController {
  private ingresoService: IngresoService

  constructor() {
    this.ingresoService = new IngresoService()
  }

  public getIngresos: RequestHandler = async (_req: Request, res: Response) => {
    // logger.info('Ingreso a getIngresos')
    const serviceResponse = await this.ingresoService.findAll()
    return handleServiceResponse(serviceResponse, res)
  }

  public getIngreso: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10)
    const serviceResponse = await this.ingresoService.findById(id)
    return handleServiceResponse(serviceResponse, res)
  }

  public newIngreso: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await this.ingresoService.newIngreso(req.body)
    return handleServiceResponse(serviceResponse, res)
  }
}

export const ingresoController = new IngresoController()
