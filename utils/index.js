const VALID_ROLES = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role',
};
const nameRegex = /^[a-zA-Z][a-zA-Z]*(\s[a-zA-Z][a-zA-Z]*)?(\s[a-zA-Z][a-zA-Z]*)?$/;
const validateName = name => nameRegex.test(name);

const handleError = errors => {
  return Object.keys(errors).reduce((result, field) => ({
    ...result,
    [field]: errors[field].message,
  }), {});
};
/**
 * 
 * @param {fields of model in database} modelFields 
 * @param {fields to compare} fields 
 */
const validateFieldsExists = (modelFields, fields) => fields.reduce((result, field) => !modelFields.includes(field) ? [...result, field] : result, []);

module.exports = {
  VALID_ROLES,
  validateName,
  handleError,
  validateFieldsExists,
};