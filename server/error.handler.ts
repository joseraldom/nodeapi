import * as restify from 'restify'

export const handlerError = (req: restify.Request, res: restify.Response, err, done) => {

    err.toJSON = () => {
        return {
            message: err.message
        }
    }
    
    done()
}