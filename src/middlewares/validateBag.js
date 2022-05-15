import db from "../db.js"
import { ObjectId } from "mongodb";

async function checkAvaliability(req, res, next){
    /*
    [x] Verificar se o produto está disponível em estoque 
    [x] Se sim, next()
    [x] Se não, retornar código 403 (forbiden)
    [x] Se product_id e requiredQuantity não forem passados, retornar código 404 (not found)
    */

    const {product_id} = req.query
    const {requiredQuantity} = req.body

    if(!product_id || !requiredQuantity) return res.sendStatus(404)

    
    try {
        const product = await db.collection("products").findOne({_id: new ObjectId(product_id)})
        const {quantity} = product
        if (quantity < requiredQuantity) return res.status(403).send('Estoque insuficiente')
        next()
    } catch (error){
        console.log('Deu ruim pra consultar o estoque do produto', error)
    }
}


export{checkAvaliability}