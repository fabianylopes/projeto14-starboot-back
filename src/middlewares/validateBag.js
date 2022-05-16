import { ObjectId } from "mongodb";

import db from "../db.js"

async function setCustomerID(req, res, next) {
    const { newCustomer_id, bag_token } = req.body;

    if (newCustomer_id && bag_token){
        try {
            const session = await db.collection("session").findOne({token: bag_token });
            const { bag_id, customer_id } = session;
            if (customer_id) next() //já possui customer_id
            else {
                await db.collection("bag").updateOne({ _id: new ObjectId(bag_id.toString()) },
                    {
                        $set: { customer_id: newCustomer_id }
                    }
                )  
                return res.sendStatus(200)
            }
        } catch (error) {
            res.sendStatus(500);
            console.log(error)
        };
    }
    next();
}

async function checkAvaliability(req, res, next) {
    const { product_id } = req.query
    const { requiredQuantity } = req.body

    if (!product_id || !requiredQuantity) return res.sendStatus(404);

    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(product_id) });
        const { quantity } = product;
        if (quantity < requiredQuantity) return res.status(403).send('Estoque insuficiente');

        next();
    } catch (error) {
        console.log('Deu ruim pra consultar o estoque do produto', error);
    }
}

export { checkAvaliability, setCustomerID }