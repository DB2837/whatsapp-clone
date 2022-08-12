import { AnyZodObject } from 'zod'

export const validateInputs = (schema: AnyZodObject, inputs: any) => {
  try {
    /*  console.log(schema.shape)
    console.log(inputs) */
    schema.parse(inputs)

    return true
  } catch (e: any) {
    return false
  }
}
