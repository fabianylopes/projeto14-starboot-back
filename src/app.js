import express, { json } from "express";
import cors from "cors";
import db from "./db.js";
import { ObjectId } from "mongodb";

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
    [x] Inserir produto no banco de dados 
    [x] Enviar resposta da requisição 
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

app.get('/suggestions', async(req, res)=>{
    /*
    [x] Obter sugestões do banco 
    [x] Obter o product_id da última sugestão inserida no banco
    [x] Buscar o produto através do product_id
    [x] Enviar produto com a resposta da requisição 
    */
   
    try {
        const suggestionCollection = await db.collection("suggestions")
        const suggestion = await suggestionCollection.find({}).sort({_id:-1}).limit(1).toArray()
        const coffee = await db.collection("products").findOne({_id: new ObjectId(suggestion[0].product_id)})

        const specialistSuggestion = 
        {
            image: coffee.productImage,
            description: suggestion[0].description, 
            product_id: suggestion[0].product_id
        }

        res.status(201).send(specialistSuggestion)    
    } catch (error) {
        console.log("Deu ruim pra achar a sugestão no banco", error)
    }
})

app.post('/articles', async (req,res)=>{
    /*
    [] Validar body da requisição 
    [x] Inserir artigo no banco de dados 
    [x] Enviar resposta da requisição 
    */

    const article = req.body

    try {
        const articleCollection = await db.collection("articles")
        articleCollection.insertOne(
            {
                title: article.title, 
                content: article.content,
                product_id: article.product_id, 
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

