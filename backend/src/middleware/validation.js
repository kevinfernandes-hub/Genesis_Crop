// Request validation middleware
// Validate request data before processing

import { ValidationError } from '../utils/errorHandler.js'

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      // Simple validation - extend with Joi or similar for production
      const { error, value } = schema.validate(req.body)
      if (error) {
        throw new ValidationError(error.details[0].message)
      }
      req.validatedBody = value
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
