import { Request, Response } from 'express'
import { errorHandle } from '../../utils/error.handle'
import { getCountriesFromDB } from './countries.service'

const getAllCountries = async (req: Request, res: Response) => {
  try {
    console.log('Controlador de Countries')
    const allCountries = await getCountriesFromDB()

    res.status(200).send(allCountries)
  } catch (error) {
    errorHandle(res, 'ERROR_GET_COUNTRIES', error)
  }
}

export { getAllCountries }
