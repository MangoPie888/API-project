const {validationResult} = require('express-validator');


const handleValidationErrors = (req, _res, next)=>{
    const validationError = validationResult(req);

    if(!validationError.isEmpty()) {
        const errors = validationError
        .array() 
        .map((error)=>`${error.msg}`);

        const err = Error('Validation Error');
        err.errors = errors;
        err.status = 400;
        err.title = 'Validation Error.';
        next(err);
    }
    next();
};


module.exports = {
    handleValidationErrors
};