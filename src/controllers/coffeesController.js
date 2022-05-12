import db from "../db.js";
import { ObjectId } from "mongodb";

export async function getCoffees(req, res){
    /*
    [x] Obter id da requisição 
    [x] Buscar produto se id for não nulo. Buscar produtos, caso contrário 
    [x] Enviar resposta da requisição 
    */

    const {id} = req.query

    try {
        const coffeeCollection = await db.collection("products")
        if (id) {
            const coffee = await coffeeCollection.findOne({_id: new ObjectId(id)})
            return res.status(200).send(coffee)
        }
        const coffees = await coffeeCollection.find({}).toArray()
        res.status(200).send(coffees)
    } catch (error) {
        console.log("Deu ruim pra buscar o café no banco", error)
    }
}

export async function setCoffees(req, res){

    /*
    [] Validar body da requisição 
    [] Inserir produto no banco de dados 
    [] Enviar resposta da requisição 
    */

    const coffee = req.body
    try {
        const coffeeCollection = await db.collection("products")
        coffeeCollection.insertOne(coffee)
        res.sendStatus(201)
    } catch (error) {
        console.log("Deu ruim pra inserir o café no banco", error)
    }
}