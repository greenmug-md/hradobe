"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VALIDATION_OPTIONS = void 0;
exports.DEFAULT_VALIDATION_OPTIONS = {
    abortEarly: true,
};
function validObjectOrThrowError(schema, value, options = {}) {
    const { error } = schema.validate(value, { ...exports.DEFAULT_VALIDATION_OPTIONS, ...options });
    if (error)
        throw error;
}
exports.default = {
    validObjectOrThrowError,
};
//# sourceMappingURL=Validations.js.map