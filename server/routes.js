import express from 'express'
import Validator from './validator'
import dbService from './db.service'
import config from './config'

// This must be set on environments vars
dbService.init(config.mongo)

const validateRequest = Validator(true)
const router = express.Router()
const host = process.env.HOST || 'http://localhost:8000'

router.get('/:key', validateRequest, (request, response) => {
  const key = request.params.key
  dbService.get(key)
    .then(doc => {
      if (doc && doc.url) return response.redirect(doc.url)
      response.status(404).end()
    })
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.post('/', validateRequest, (request, response) => {
  dbService.set(request.body)
    .then(url => response.json({ url: `${host}/${url}` }))
    .catch(reason => response.status(500).json({error: reason.message}))
})

export default router
