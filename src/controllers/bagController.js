import { ObjectId } from "mongodb";
import db from "../db.js";

export async function setBag(req, res) {

    /*
    [] atualizar o array produtos, com o novo produto inserido
    */

    try {

        await db.collection("bag").updateOne({ _id: new ObjectId("627ec6ed5a98fc60f4f61b9a") },
            {
                $addToSet: {
                    "products":
                    {
                        product_id: "aaaaa",
                        quantity: 2
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