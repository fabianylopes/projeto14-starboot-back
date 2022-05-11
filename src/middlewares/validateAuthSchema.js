import { signInSchemma, signUpSchemma } from "../schemas/authSchema.js";

function validateSignInSchema(req, res, next) {
    const signIn = req.body;

    const validation = signInSchemma.validate(signIn);
    if(validation.error){
        return res.send(422);
    }
    next();
}

function validateSignUpSchema(req, res, next) {
    const signUp = req.body;

    const validation = signUpSchemma.validate(signUp);
    if(validation.error){
        return res.send(422);
    }
    next();
}

export {validateSignInSchema, validateSignUpSchema}