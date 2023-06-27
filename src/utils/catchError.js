const Boom = require('@hapi/boom');

function catchError(error) {
    if (Boom.isBoom(error)) {
        return error;
    }else{
    throw Boom.badRequest("something wrong",error) 
    }
}

module.exports = catchError;