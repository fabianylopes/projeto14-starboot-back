import { ObjectId } from "mongodb";
import db from "../db.js";

export async function setBag(req, res) {

    /*
    [] atualizar o array produtos, com o novo produto inserido
    */
   const {bag_id} = req.query
   const product = req.body


    try {

        await db.collection("bag").updateOne({ _id: new ObjectId(bag_id) },
            {
                $addToSet: {
                    "products":
                    {
                        product_id: product.product_id,
                        quantity: product.requiredQuantity
                    }
                }
            }
        )
            return res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(500)
        console.log("Deu ruim pra atualizar a sacola", error)
    }

}