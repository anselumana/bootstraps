import { ZodError, ZodObject } from "zod";


interface ValidationOutput {
  success: boolean;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string,
  message: string,
}

const getErrors = (err: ZodError): ValidationError[] => {
  return err.issues.map(issue => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

/**
 * Validates an object against the expected schema.
 * Returns the full list of validation errors, if any.
 * @param obj the object to validate
 * @param expected the expected object described as a ZodObject
 * @returns a boolean indicating success and eventually a list of errors
 */
export function validate(obj: any, expected: ZodObject<any> | ZodObject<any, "strict">): ValidationOutput {
  const res = expected.safeParse(obj);
  if (res.success) {
    return { success: true };
  }
  else {
    return {
      success: false,
      errors: getErrors(res.error),
    }
  }
}