"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = (req, res, err, done) => {
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    done();
};
