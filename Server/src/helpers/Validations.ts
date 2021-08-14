import { ObjectSchema, ValidationOptions } from "@hapi/joi";

/**
 * Default options for validator
 */
export const DEFAULT_VALIDATION_OPTIONS: ValidationOptions = {
	abortEarly: true,
};

/**
 * Verify if value is according to schema object othwerwise
 * throw a Joi validation error
 * @param schema
 * @param value Value to validate
 * @param options Additional options
 * @throws ValidationError
 */
function validObjectOrThrowError(
	schema: ObjectSchema,
	value: unknown,
	options: ValidationOptions = {}
): void {
	const { error } = schema.validate(value, { ...DEFAULT_VALIDATION_OPTIONS, ...options });

	if (error) throw error;
}

export default {
	validObjectOrThrowError,
};