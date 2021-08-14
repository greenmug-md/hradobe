"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapper(route) {
    return async (req, res, next) => {
        try {
            const returnValue = route(req, res, next);
            if (returnValue instanceof Promise)
                await returnValue;
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = wrapper;
//# sourceMappingURL=RouteWrapper.js.map