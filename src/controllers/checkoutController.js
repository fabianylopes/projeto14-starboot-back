import { ObjectId } from "mongodb";
import db from "../db.js";


export async function checkout(req, res){

    /*
        [x] obter id da sacola
        [x] buscar a sacola no banco 
        [x] pegar os produtos da sacola (arry)
        [x] para cada produto fazer uma busca no banco de dados
        [x] diminuir o valor quantity de requiredQuantity
        [x] retornar sucesso (200) + número de compra
    */
    const bag = res.locals.bag
    const products = bag.products

    console.log(bag, products)
try {

    //const bag = await db.collection("bag").findOne({_id: new ObjectId(id)})
    //const products = bag.products

    for(let product of products){
        const {product_id, requiredQuantity} = product
        const _product = await db.collection("products").findOne({_id: new ObjectId(product_id)})
        const {quantity} = _product
        await db.collection("products").updateOne({_id: new ObjectId(product_id)}, 
            {
                $set: {quantity: quantity-requiredQuantity}
            })
    }
    const orderNumber = Math.floor(Math.random(10000, 99999) * 100000)
    res.status(200).send({"orderNumber":orderNumber})
    } 
 catch (error) {
    res.sendStatus(500)
    console.log("deu ruim para fechar a sacola", error)
    }
}