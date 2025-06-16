"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (validateSchema = {}) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { body, params, query, headers } = validateSchema;
        try {
            if (body) {
                const validateResult = yield body.validateAsync(req.body, { abortEarly: true });
                req.body = validateResult;
            }
            if (params) {
                const validateResult = yield params.validateAsync(req.params, { abortEarly: true });
                req.params = validateResult;
            }
            if (query) {
                const validateResult = yield query.validateAsync(req.query, { abortEarly: true });
                req.query = validateResult;
            }
            if (headers) {
                const validateResult = yield headers.validateAsync(req.headers, { abortEarly: true });
                req.headers = validateResult;
            }
            next();
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
            else {
                res.status(500).json({
                    message: "Unexpected error has occurred"
                });
            }
        }
    });
};
exports.default = validate;
