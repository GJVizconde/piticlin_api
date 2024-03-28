import { NextFunction, Request, Response } from 'express'

const errorHandle = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw)

  res.status(500).send(error)
}

export { errorHandle }
