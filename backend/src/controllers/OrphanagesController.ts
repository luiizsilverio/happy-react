import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

export default {
  async index(req: Request, resp: Response) {
    const repository = getRepository(Orphanage)

    const orphanages = await repository.find()

    return resp.json(orphanages)
  },

  async show(req: Request, resp: Response) {
    const { id } = req.params
    const repository = getRepository(Orphanage)

    const orphanage = await repository.findOneOrFail(id)

    return resp.json(orphanage)
  },

  async create(req: Request, resp: Response) {
    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body
  
    const repository = getRepository(Orphanage)
  
    const orphanage = repository.create({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions,
      opening_hours,
      open_on_weekends
    })
  
    await repository.save(orphanage)
  
    return resp.status(201).json(orphanage)
  }
}