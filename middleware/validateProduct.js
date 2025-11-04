const ValidationError = require('../errors/ValidationError');

// returns middleware that validates product body
// isUpdate = true -> partial update allowed
module.exports = function validateProduct(isUpdate = false) {
  return (req, res, next) => {
    const body = req.body || {};
    const errors = [];

    function checkPresent(key) {
      if (!Object.prototype.hasOwnProperty.call(body, key)) return false;
      return true;
    }

    if (!isUpdate || checkPresent('name')) {
      if (typeof body.name !== 'string' || body.name.trim() === '') {
        errors.push('name is required and must be a non-empty string');
      }
    }

    if (!isUpdate || checkPresent('description')) {
      if (typeof body.description !== 'string') {
        errors.push('description is required and must be a string');
      }
    }

    if (!isUpdate || checkPresent('price')) {
      if (typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
        errors.push('price is required and must be a non-negative number');
      }
    }

    if (!isUpdate || checkPresent('category')) {
      if (typeof body.category !== 'string' || body.category.trim() === '') {
        errors.push('category is required and must be a non-empty string');
      }
    }

    if (!isUpdate || checkPresent('inStock')) {
      if (typeof body.inStock !== 'boolean') {
        errors.push('inStock is required and must be a boolean');
      }
    }

    if (errors.length > 0) return next(new ValidationError(errors.join('; ')));
    next();
  };
};
