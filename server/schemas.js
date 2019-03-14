import Joi from 'joi'

// validation schema
const postSchema = Joi.object().keys({
  url: Joi.string().required()
})

const getSchema = Joi.object().keys({
  url: Joi.string().alphanum().length(10).required()
})

export default {
  'get/:url': getSchema,
  'post/': postSchema
}
