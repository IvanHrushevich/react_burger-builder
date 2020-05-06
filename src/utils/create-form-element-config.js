export const createFormElementConfig = (
  placeholder,
  elementType = 'input',
  type = 'text',
  value = ''
) => ({
  elementType,
  elementConfig: {
    type,
    placeholder
  },
  value,
  validation: {
    required: true
  },
  valid: false,
  touched: false
});
