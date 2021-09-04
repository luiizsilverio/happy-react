import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default {
  async index(req: Request, resp: Response) {
    const repository = getRepository(Orphanage)

    const orphanages = await repository.find({
      relations: ['images']
    })

    return resp.json(orphanageView.renderAll(orphanages))
  },

  async show(req: Request, resp: Response) {
    const { id } = req.params
    const repository = getRepository(Orphanage)

    const orphanage = await repository.findOneOrFail(id, {
      relations: ['images']
    })

    return resp.json(orphanageView.render(orphanage))
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

    const reqImages = req.files as Express.Multer.File[]

    const images = reqImages.map(img => {
      return { path: img.filename }
    })
  
    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })
    
    const orphanage = repository.create(data)
  
    await repository.save(orphanage)
  
    return resp.status(201).json(orphanage)
  }
}