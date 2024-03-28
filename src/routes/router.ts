import { Router } from 'express'
import countriesRouter from '../modules/countries/countries.router'

const router = Router()

console.log('Estoy en mainRouter')

router.use('/countries', countriesRouter)

export default router
