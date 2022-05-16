import { ObjectId } from "mongodb";

import db from "../db.js";

export async function getSuggestions(req, res){
    try {
        const suggestionCollection = await db.collection("suggestions");
        const suggestion = await suggestionCollection.find({}).sort({_id:-1}).limit(1).toArray(); //ordena por ordem decrescente de ids
        const coffee = await db.collection("products").findOne({_id: new ObjectId(suggestion[0].product_id)});

        const specialistSuggestion = 
        {
            image: coffee.productImage,
            description: suggestion[0].description, 
            product_id: suggestion[0].product_id
        }

        res.status(200).send(specialistSuggestion);    
    } catch (error) {
        console.log("Deu ruim pra achar a sugestão no banco", error);
    }
}

export async function setSuggestions(req, res){
    const suggestion = req.body;
    
    try {
        const suggestionCollection = await db.collection("suggestions");
        suggestionCollection.insertOne(
            {
                description: suggestion.description, 
                product_id: suggestion.product_id, 
                date: Date.now()
            }
        )
        res.sendStatus(201);
    } catch (error) {
        console.log("Deu ruim pra inserir a sugestão no banco", error);
    }
}