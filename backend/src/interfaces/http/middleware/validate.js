import { AppError } from '../../../shared/AppError.js'

/** @param {(body: object) => string[]} validatorFn */
export function validateBody(validatorFn) {
  return (req, _res, next) => {
    const errors = validatorFn(req.body || {})
    if (errors.length) return next(new AppError(errors.join('; '), 400))
    next()
  }
}
