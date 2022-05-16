import { ObjectId } from "mongodb";

import db from "../db.js";

export async function getUser(req, res){
    const {id} = req.query;

    try {
        const customer = await db.collection("customers").findOne({_id: new ObjectId(id)});
        const customerInfo = 
        {
            name: customer.name,
            street: customer.street,
            number: customer.number,
            city: customer.city,
            state: customer.state
        }
        res.status(200).send(customerInfo);
    } catch (error) {
        res.sendStatus(500);
        console.log("Deu ruim pra buscar o usuário no banco", error);
    }
}