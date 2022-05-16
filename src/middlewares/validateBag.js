import db from "../db.js"
import { ObjectId } from "mongodb";

async function setCustomerID(req, res, next) {
    /*
    [x] obter o id do usuário
    [x] obter a sacola 
    [x] verificar se costumer_id === undefined 
    [x] se falso, next
    [x] se verdadeiro, inserir o customer_id:= customer_id
    */

    const { newCustomer_id, bag_token } = req.body

    if (newCustomer_id && bag_token){
        try {
            const session = await db.collection("session").findOne({token: bag_token })
            const { bag_id, customer_id } = session
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
            res.sendStatus(500)
            console.log(error)
        }
    }

    next()

}

async function checkAvaliability(req, res, next) {
    /*
    [x] Verificar se o produto está disponível em estoque 
    [x] Se sim, next()
    [x] Se não, retornar código 403 (forbiden)
    [x] Se product_id e requiredQuantity não forem passados, retornar código 404 (not found)
    */

    const { product_id } = req.query
    const { requiredQuantity } = req.body

    if (!product_id || !requiredQuantity) return res.sendStatus(404)


    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(product_id) })
        const { quantity } = product
        if (quantity < requiredQuantity) return res.status(403).send('Estoque insuficiente')
        next()
    } catch (error) {
        console.log('Deu ruim pra consultar o estoque do produto', error)
    }
}


export { checkAvaliability, setCustomerID }