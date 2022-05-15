import { ObjectId } from "mongodb";
import db from "../db.js";
import { v4 as uuid } from 'uuid';

export async function createBag(req, res){

    /*
    [x] inserir uma nova sacola ao banco de dados 
        com um tokend temporário vinculado 
    [x] obter o id da sacola criada através do
        do token temporário
    [x] criar uma sessão com o id da sacola e um token
    [x] remover o token temporário da sacola 
    [x] enviar o token da sessão  
    */

    const token = uuid()
    const temporaryToken = uuid()
try {
    await db.collection("bag").insertOne(
        {   
            customer_id: undefined, 
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
    [x] atualizar o array produtos, com o novo produto inserido
    [] se o porduto já existir no array, atualizar a quantidade
    */
   const {bag_token, product_id} = req.query
   const {requiredQuantity} = req.body

    try {
        const session = await db.collection("session").findOne({token: bag_token})
        console.log(session)
        const {bag_id} = session
        await db.collection("bag").updateOne({ _id: new ObjectId(bag_id.toString()) },
            {
                $addToSet: {
                    "products":
                    {
                        product_id,
                        requiredQuantity
                    }
                }, 
            }
        )
        
        return res.sendStatus(200)

    } catch (error) {
        console.log("Deu ruim pra atualizar a sacola", error)
        return res.sendStatus(500)
    }

}

export async function getBag(req, res) {
    const bag = res.locals.bag
    let bagProducts = []
    const produtcts = bag.products
    for (let product of produtcts){
        try {
            const item = await db.collection("products").findOne({_id: new ObjectId(product.product_id)})
            bagProducts.push(
                {
                    name: item.name, 
                    productImage: item.productImage,
                    price: item.price, 
                    requiredQuantity: product.requiredQuantity,
                }
            )
        } catch (error) {
            res.sendStatus(500)
        }
    }


    res.status(200).send({products: bagProducts, owner_id: bag.owner_id})
}