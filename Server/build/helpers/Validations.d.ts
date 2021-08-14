/// <reference types="hapi__joi" />
import { ObjectSchema, ValidationOptions } from "@hapi/joi";
export declare const DEFAULT_VALIDATION_OPTIONS: ValidationOptions;
declare function validObjectOrThrowError(schema: ObjectSchema, value: unknown, options?: ValidationOptions): void;
declare const _default: {
    validObjectOrThrowError: typeof validObjectOrThrowError;
};
export default _default;
//# sourceMappingURL=Validations.d.ts.map