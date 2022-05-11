import express, { json } from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(json());

app.post('/coffees', async (req, res) =>{

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
})

app.get('/coffees', async(req, res)=>{
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
})


app.post('/suggestions', async(req, res)=>{
    /*
    [] Validar body da requisição 
    [] Inserir produto no banco de dados 
    [] Enviar resposta da requisição 
    */

    const suggestion = req.body
    
    try {
        const suggestionCollection = await db.collection("suggestions")
        suggestionCollection.insertOne(
            {
                description: suggestion.description, 
                product_id: suggestion.product_id, 
                date: Date.now()
            }
        )
        res.sendStatus(201)    
    } catch (error) {
        console.log("Deu ruim pra inserir a sugestão no banco", error)
    }
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(('Running on ' + port));
});

