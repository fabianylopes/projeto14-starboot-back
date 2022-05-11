import db from "../db.js";

export async function getCoffees(req, res){
    /*
    [x] Buscar produtos no banco de dados 
    [x] Enviar resposta da requisição 
    */

    try {
        const coffeeCollection = await db.collection("products")
        const coffees = await coffeeCollection.find({}).toArray()
        res.status(200).send(coffees)
    } catch (error) {
        console.log("Deu ruim pra inserir o café no banco", error)
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