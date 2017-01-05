/**
 * npm dependencies
 */
import Validator from 'validatorjs'

/**
 * local dependencies
 */
export default {
  validateUpload: async (data) => {
    const validation = new Validator(data, {
      width: 'required',
      height: 'required'
    })
    return validation.fails() ? validation.errors.errors : null
  }
}
