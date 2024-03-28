import { Router } from 'express'
import { getAllCountries } from './countries.controller'

const countriesRouter = Router()

console.log('Estoy en countriesRouter')

countriesRouter.get('', getAllCountries)

export default countriesRouter
