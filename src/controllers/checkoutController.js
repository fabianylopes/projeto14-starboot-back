import { ObjectId } from "mongodb";

import db from "../db.js";

export async function checkout(req, res){
    const bag = res.locals.bag;
    const products = bag.products;

    try {
        for(let product of products){
            const {product_id, requiredQuantity} = product;
            const _product = await db.collection("products").findOne({_id: new ObjectId(product_id)});
            const {quantity} = _product;
            await db.collection("products").updateOne({_id: new ObjectId(product_id)}, 
                {
                    $set: {quantity: quantity-requiredQuantity}
                })
        }
        const orderNumber = Math.floor(Math.random(10000, 99999) * 100000);
        res.status(200).send({"orderNumber":orderNumber});
    } 
    catch (error) {
        res.sendStatus(500)
        console.log("deu ruim para fechar a sacola", error);
    }
}