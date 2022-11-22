

export function validateEnvironment(env: any) {
  const errors = validateFields(env);
  if (errors.length > 0) {
    const error = errors[0];
    return `invalid environment variable '${error.field}' (reason: ${error.reason})`;
  }
  else {
    return null;
  }
}


function validateFields(env: any) {
  const errors = [];
  const msg = "invalid environment variable '${error.field}' (reason: ${error.message})"
  if (!env.PORT) {
    errors.push({
      field: "PORT",
      reason: "required",
    });
  }
  if (+env.PORT === NaN) {
    errors.push({
      field: "PORT",
      reason: "must be a number",
    });
  }
  if (!env.MONGODB_CONNECTION) {
    errors.push({
      field: "MONGODB_CONNECTION",
      reason: "required",
    });
  }
  return errors;
}