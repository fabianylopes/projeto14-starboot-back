import { ObjectId } from "mongodb";
import db from "../db.js";
import { v4 as uuid } from 'uuid';

export async function createBag(req, res){
    const token = uuid()
    const temporaryToken = uuid()
try {
    await db.collection("bag").insertOne(
        {   
            owner_id: null, 
            products: [],
            temporaryToken
        }
    )

    const bag = await db.collection("bag").findOne({temporaryToken})
    if (bag){
        const {_id} = bag
    await db.collection("session").insertOne({
        bag_id: _id.toString(), 
        token
    })

    await db.collection("bag").updateOne({temporaryToken},
        { $unset: { temporaryToken: "" }}
    )

    } 
    res.status(201).send(token)
} catch (error) {
    res.sendStatus(500)
    console.log("deu ruim para criar a sacola", error)
}
}

export async function setBag(req, res) {

    /*
    [] atualizar o array produtos, com o novo produto inserido
    */
   const {bag_id, product_id} = req.query
   const product = req.body

    console.log(bag_id)
    try {
        const session = await db.collection("session").findOne({token: bag_id})
        await db.collection("bag").updateOne({ _id: new ObjectId(session.bag_id.toString()) },
            {
                $addToSet: {
                    "products":
                    {
                        product_id,
                        quantity: product.requiredQuantity
                    }
                }
            }
        )
            return res.sendStatus(200)

    } catch (error) {
        console.log("Deu ruim pra atualizar a sacola", error)
        return res.sendStatus(500)
    }

}