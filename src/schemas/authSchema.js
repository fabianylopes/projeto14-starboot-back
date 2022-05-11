import joi from "joi";

const signInSchemma = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

const signUpSchemma = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    cep: joi.string().required(),
    street: joi.string().required(),
    number: joi.number().required(),
    city: joi.string().required(),
    state:joi.string().required(),
    cardName: joi.string().required(),
    cardNumber: joi.string().required(),
    cvv: joi.number().required(),
    expiry: joi.string().required()
});

export {signInSchemma, signUpSchemma}
